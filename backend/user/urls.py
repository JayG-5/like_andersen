from django.urls import path
from .views import KakaoLoginView,KakaoLogoutView,KakaoCallbackView,UpdateProfileAPICall,MyInfoAPICall

app_name = 'user'

urlpatterns = [
    path('my_info/', MyInfoAPICall.as_view(), name='my_info'),
    path('oauth/kakao/login/', KakaoLoginView.as_view(), name='kakao_login'),
    path('oauth/kakao/logout/', KakaoLogoutView.as_view(), name='kakao_logout'),
    path('oauth/kakao/callback/', KakaoCallbackView.as_view(), name='kakao_login'),
    path('update/',UpdateProfileAPICall.as_view(),name='update'),
]