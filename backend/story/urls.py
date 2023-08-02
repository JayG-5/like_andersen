from django.urls import path
from .views import CharacterAPICall,StoryAPICall,StoryViewAPICall

app_name = 'story'

urlpatterns = [
    path('', StoryAPICall.as_view(), name='story'),
    path('<int:pk>/', StoryViewAPICall.as_view(), name='story_view'),
    path('character/', CharacterAPICall.as_view(), name='character'),
]