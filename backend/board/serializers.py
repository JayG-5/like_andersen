from rest_framework import serializers
from .models import Post,Comment,Image,Like,Report
from django.contrib.auth import get_user_model
User = get_user_model()

class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'profile_image_url']

class PostListSerializer(serializers.ModelSerializer):
    user = PublicUserSerializer()
    like_set_length = serializers.SerializerMethodField()
    comment_set_length = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id','title','user','thumbnail','views','created_at','like_set_length','hashtag_set','comment_set_length']

    def get_like_set_length(self, obj):
        return obj.like_set.count()
    
    def get_comment_set_length(self, obj):
        return obj.comment_set.count()
    
class CommentViewSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('context').get('request')
        super(CommentViewSerializer, self).__init__(*args, **kwargs)
    user = PublicUserSerializer()
    child_comments = serializers.SerializerMethodField()
    like_set_length = serializers.SerializerMethodField()
    is_like = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id','body','user','image','child_comments','updated_at','created_at','like_set_length','is_like']
        
    def get_child_comments(self, obj):
        child_comments = obj.child_comments.filter(is_hidden = False)
        serializer = CommentViewSerializer(child_comments, many=True,context={'request': self.request})
        return serializer.data
    def get_like_set_length(self, obj):
        return obj.like_set.count()
    def get_is_like(self, obj):
        try:
            request_user = self.request.user
            return obj.like_set.filter(user=request_user).exists()
        except:
            return False

    
class PostViewSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('context').get('request')
        super(PostViewSerializer, self).__init__(*args, **kwargs)
    user = PublicUserSerializer()
    comment_set = serializers.SerializerMethodField()
    like_set_length = serializers.SerializerMethodField()
    is_like = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id','title','body','user','thumbnail','views','updated_at','created_at','hashtag_set','comment_set','updated_post','like_set_length','is_like']

            
    def get_comment_set(self, obj):
        comment_set = obj.comment_set.filter(is_hidden = False,parent_comment = None)
        # comment_set = obj.comment_set.all()
        serializer = CommentViewSerializer(comment_set, many=True,context={'request': self.request})
        return serializer.data
    
    def get_like_set_length(self, obj):
        return obj.like_set.count()
    
    def get_is_like(self, obj):
        try:
            request_user = self.request.user
            return obj.like_set.filter(user=request_user).exists()
        except:
            return False


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'

        
    def create(self, validated_data):
        post = Post.objects.create(
            title = validated_data['title'],
            body = validated_data['body'],
            user = validated_data['user'],
            thumbnail = validated_data['thumbnail'],
            updated_post = validated_data.get('updated_post'),
            is_hidden = True if validated_data.get('updated_post') else False,
        )
        return post


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        comment = Comment.objects.create(
            post = validated_data['post'],
            body = validated_data['body'],
            user = validated_data['user'],
            image = validated_data.get('image',''),
            parent_comment = validated_data.get('parent_comment'),
            updated_comment = validated_data.get('updated_comment'),
            is_hidden = True if validated_data.get('updated_comment') else False,
        )
        return comment
    
class ReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = '__all__'

    def create(self, validated_data):
        report = Report.objects.create(
            body = validated_data['body'],
            user = validated_data['user'],
            post = validated_data.get('post'),
            comment = validated_data.get('comment'),
        )
        return report
    
class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = '__all__'

    def create(self, validated_data):
        like = Like.objects.create(
            user = validated_data['user'],
            post = validated_data.get('post'),
            comment = validated_data.get('comment'),
        )
        return like