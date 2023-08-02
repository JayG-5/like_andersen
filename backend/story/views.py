from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from .models import Story,Character
from .serializers import StorySerializer,CharacterSerializer
from rest_framework.permissions import IsAuthenticated

class StoryViewAPICall(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request,pk):
        story = Story.objects.get(pk = pk)
        serializer = StorySerializer(story)
        return Response(serializer.data)
        

class StoryAPICall(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stories = Story.objects.filter(user = request.user)
        serializer = StorySerializer(stories,many=True)
        return Response(serializer.data)
        
    def post(self, request):
        try:
            today = timezone.now().date()
            existing_story = Story.objects.filter(user=request.user, created_at__date=today).first()

            if existing_story:
                return Response("일일 할당량 초과", status=status.HTTP_400_BAD_REQUEST)

            data = request.data.copy()
            data['user'] = request.user.pk
            serializer = StorySerializer(data=data)
            if serializer.is_valid():
                story = serializer.save()
                return Response({'result':story.pk}, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_408_REQUEST_TIMEOUT)
        except Exception as e:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def put(self, request):
        data = request.data
        story = Story.objects.filter(pk=data.get('id'), user=request.user).first()

        if not story:
            return Response("해당 인덱스 찾지못함",status=status.HTTP_404_NOT_FOUND)

        serializer = StorySerializer(story, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        try:
            data = request.data
            story = Story.objects.get(pk=data.get('id'), user=request.user)
        except:
            return Response("해당 인덱스 찾지못함",status=status.HTTP_404_NOT_FOUND)

        story.delete()
        return Response('삭제 완료', status=status.HTTP_204_NO_CONTENT)
    

class CharacterAPICall(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        characters = Character.objects.all()
        serializer = CharacterSerializer(characters, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CharacterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(editor=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        data = request.data
        character = Character.objects.filter(pk=data.get('id'), editor=request.user).first()

        if not character:
            return Response("해당 캐릭터 찾지못함",status=status.HTTP_404_NOT_FOUND)

        serializer = CharacterSerializer(character, data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        try:
            data = request.data
            character = Character.objects.get(pk=data.get('id'), editor=request.user)
        except:
            return Response("해당 캐릭터 찾지못함",status=status.HTTP_404_NOT_FOUND)

        character.delete()
        return Response('삭제 완료', status=status.HTTP_204_NO_CONTENT)


