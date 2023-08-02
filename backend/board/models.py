from django.db import models
from markdownx.models import MarkdownxField
from django.contrib.auth import get_user_model
from markdownx.models import MarkdownxField
from markdownx.utils import markdownify
from django.utils.safestring import mark_safe
from story.models import Story


User = get_user_model()


class Image(models.Model):
    file_id = models.CharField(max_length=100, primary_key=True)
    image = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_id


class Post(models.Model):
    title = models.CharField(max_length=200)
    body = MarkdownxField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    story = models.ForeignKey(Story, on_delete=models.CASCADE,null=True, blank=True)
    thumbnail = models.CharField(max_length=1024,null=True, blank=True)
    views = models.IntegerField(default=0)    
    updated_post = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='updated_posts')
    is_hidden = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"
    
    def get_markdown_body(self):
        return mark_safe(markdownify(self.body))
    

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField(max_length=256)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.CharField(max_length=1024,null=True, blank=True)
    updated_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='updated_comments')
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='child_comments')
    is_hidden = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.body}"


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} likes -> {self.post if self.post else ""}{self.comment if self.comment else ""}'
    
    
class Report(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField(max_length=64)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} report {self.post if self.post else ""}{self.comment if self.comment else ""} => {self.body}'


class Hashtag(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    name = models.CharField(max_length=12)

    def __str__(self):
        return self.name