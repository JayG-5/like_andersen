import os,requests

from django.shortcuts import redirect
from django.http import JsonResponse
from .models import User
from .sirializers import UserRegistrationSerializer,UserProfileUpdateSerializer,UserSerializer
from django.contrib.auth import login,logout
from django.contrib.sessions.models import Session


from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class KakaoLoginView(APIView):
    def get(self, request):
  
        REST_API_KEY = os.getenv('KAKAO_REST_API_KEY')
        REDIRECT_URI = os.getenv('KAKAO_REDIRECT_URI')

        return redirect(f"https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}")
    

class KakaoLogoutView(APIView):
    def get(self, request):
  
        token_headers = {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            "Authorization": f"Bearer {request.user.access_token}",
        }
        response = requests.post('https://kapi.kakao.com/v1/user/logout', headers=token_headers)
        logout(request)
        return Response(response.json(),status=response.status_code)
    

class KakaoCallbackView(APIView):

    def get(self, request):
        code = request.GET.get('code')
        if not code:
            return redirect('https://jayg-5.github.io/like_andersen/frontend/')
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST)

        request_data = {
            'grant_type': 'authorization_code',
            'client_id': os.getenv('KAKAO_REST_API_KEY'),
            'redirect_uri': os.getenv('KAKAO_REDIRECT_URI'),
            'client_secret': os.getenv('KAKAO_CLIENT_SECRET_KEY'),
            'code': code,
        }
        token_headers = {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
        token_res = requests.post('https://kauth.kakao.com/oauth/token', data=request_data, headers=token_headers)
        access_token = token_res.json().get('access_token')
        if not access_token:
            return redirect('https://jayg-5.github.io/like_andersen/frontend/')
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST)

        auth_headers = {
            "Authorization": f"Bearer {access_token}",
        }
        user_info_res = requests.get('https://kapi.kakao.com/v2/user/me', headers={**auth_headers,**token_headers})
        user_info = user_info_res.json()


        if not user_info.get('kakao_account'):
            return redirect('https://jayg-5.github.io/like_andersen/frontend/')
            return JsonResponse(status=status.HTTP_400_BAD_REQUEST)
        
        profile = user_info['kakao_account']['profile']
        profile['kakao_uid'] = user_info['id'] 
        profile['kakao_name'] = profile.pop('nickname')
        profile['access_token'] = access_token
        if user_info.get('email'):
            profile['email'] = user_info['email']
        try:
            try:
                user = User.objects.get(kakao_uid=profile['kakao_uid'])
                user = UserProfileUpdateSerializer(user, data=profile, partial=True)
                
            except:
                user = UserRegistrationSerializer(data=profile)
            if user.is_valid():
                user = user.save()
            login(request, user)
            serializer = UserSerializer(user)
            return redirect('https://jayg-5.github.io/like_andersen/frontend/')
            return JsonResponse(serializer.data, status=status.HTTP_200_OK,)
        except:
            return redirect('https://jayg-5.github.io/like_andersen/frontend/')
            return JsonResponse(status = status.HTTP_400_BAD_REQUEST)


class UpdateProfileAPICall(APIView):
    
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # 사용자의 프로필 정보 가져오기
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        serializer = UserProfileUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=400)
    
class MyInfoAPICall(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)