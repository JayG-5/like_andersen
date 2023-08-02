from django.urls import path
from .views import PostListAPICall,PostViewAPICall,CommentAPICall,ReportAPICall,LikeAPICall

app_name = 'board'

urlpatterns = [
    path('', PostListAPICall.as_view(), name='list'),
    path('like/',LikeAPICall.as_view(),name='like'),
    path('report/',ReportAPICall.as_view(),name='report'),
    path('<int:pk>/', PostViewAPICall.as_view(), name='post'),
    path('comment/<int:pk>/', CommentAPICall.as_view(), name='commnet'),
]