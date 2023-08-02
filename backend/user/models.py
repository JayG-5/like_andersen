
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from .utils.nickname import generate_random_sentence

class UserManager(BaseUserManager):

    def create_user(self, kakao_uid, username, email, kakao_name, profile_image_url):

        def get_new_nickname():
            new_nickname = ''
            try:
                while True:
                    new_nickname = generate_random_sentence()
                    User.objects.get(nickname = new_nickname)
            except:
                return new_nickname
            
        if not kakao_uid:
            raise ValueError('Kakao user ID must be set')
        user = self.model(
            kakao_uid=kakao_uid,
            email=email,
            username = username,
            kakao_name=kakao_name,
            profile_image_url=profile_image_url,
            nickname=get_new_nickname()
        )
        user.save(using=self._db)
        return user


class User(AbstractUser):
    kakao_uid = models.CharField(max_length=20,unique=True, db_index=True)
    kakao_name = models.CharField(max_length=20,null=True,blank=True)
    email = models.EmailField(null=True, blank=True)
    profile_image_url = models.URLField(null=True, blank=True)
    nickname = models.CharField(max_length=20, null=True, blank=True)
    access_token = models.TextField()
    
    def __str__(self):
        return self.kakao_name if self.kakao_name else self.nickname
    

class Follow(models.Model):
    following_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')
    followed_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)

def __str__(self):
    return f'{self.following_user} follow -> {self.followed_user}'