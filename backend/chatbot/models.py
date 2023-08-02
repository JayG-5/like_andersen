from django.db import models
from story.models import Story


class Conversation(models.Model):
    story = models.ForeignKey(Story, on_delete=models.CASCADE, null=True, blank=True)
    prompt = models.TextField()
    response = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.story}: {self.created_at}"