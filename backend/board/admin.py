from django.contrib import admin
from .models import Post,Comment,Hashtag,Image,Like,Report


class LikeInline(admin.TabularInline):
    model = Like
    extra = 0
    readonly_fields = ['created_at']


class HashtagInline(admin.TabularInline):
    model = Hashtag
    extra = 1


class PostAdmin(admin.ModelAdmin):
    inlines = [LikeInline, HashtagInline]
    list_display = ['title', 'user']
    search_fields = ['title', 'user__email']
    
admin.site.register(Post, PostAdmin)
admin.site.register(Comment)
admin.site.register(Like)
