from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Character(models.Model):
    name = models.CharField(max_length=20)
    age_range = models.CharField(max_length=10)
    is_male = models.BooleanField(default=None,null=True,blank=True)
    description = models.CharField(max_length=100, blank=True,default=None)
    description_img = models.URLField(null=True, blank=True, default=None)

    def __str__(self):
        return self.name


class Story(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    theme = models.CharField(max_length=10)
    characters = models.ManyToManyField(Character)
    background = models.TextField()
    plot = models.TextField()
    moral = models.TextField()
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user}: {self.theme}"