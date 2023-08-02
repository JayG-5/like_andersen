from django.urls import path
from .views import ChatAPICall

app_name = 'chatbot'

urlpatterns = [
    path('<int:pk>/', ChatAPICall.as_view(), name='chat'),
]