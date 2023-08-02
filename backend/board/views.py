from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.utils import json
from .models import Post,Comment,Like
from django.contrib.auth import get_user_model
from .serializers import PostListSerializer,PostSerializer,CommentSerializer,PostViewSerializer,ReportSerializer,LikeSerializer

User = get_user_model()

class PostListAPICall(APIView):
    def get(self, request):
        posts = Post.objects.filter(is_hidden = False)
        serialized_posts = PostListSerializer(posts, many=True)
        return Response(serialized_posts.data)
        
    def post(self, request):
        try:
            post_data = request.data.copy()
            post_data['user'] = request.user.pk
            print(post_data)
            post = PostSerializer(data=post_data)
            if post.is_valid():
                post.save()
                return Response({'request':post.data['id']},status=status.HTTP_201_CREATED)
            print(post.errors)
            return Response(post.errors, status=400)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_404_NOT_FOUND)
    

class PostViewAPICall(APIView):

    def get(self, request,pk):
        try:
            post = Post.objects.get(pk = pk)
            post.views += 1
            post.save()
            serialized_posts = PostViewSerializer(post,context={'request': request})
            return Response(serialized_posts.data)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request,pk):
        try:
            comment_data = request.data.copy()
            comment_data['post'] = pk
            comment_data['user'] = request.user.pk
            comment = CommentSerializer(data=comment_data)
            if comment.is_valid():
                comment.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(comment.errors, status=400)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request,pk):
        try:
            post = Post.objects.get(pk = pk)
            if post.user == request.user.pk:
                updated_post_data = PostSerializer(post).data
                updated_post_data['updated_post'] = pk
                updated_post_data['user'] = post.user.pk
                updated_post = PostSerializer(data=updated_post_data)
                if updated_post.is_valid():
                    updated_post.save()
                serializer = PostSerializer(post, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data,status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=400)
            return Response('포스트 != 유저',status=400)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request,pk):
        try:
            post = Post.objects.get(pk = pk)
            if post.user == request.user.pk:
                post.delete()
                return Response('삭제 완료',status=status.HTTP_204_NO_CONTENT)
            
            return Response('포스트 != 유저',status=400)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class CommentAPICall(APIView):

    def post(self, request,pk):
        try:
            comment_data = request.data.copy()
            parent_comment = Comment.objects.get(pk = pk)
            comment_data['post'] = parent_comment.post.pk
            comment_data['user'] = request.user.pk
            comment_data['parent_comment'] = pk
            comment = CommentSerializer(data=comment_data)
            if comment.is_valid():
                comment.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(comment.errors, status=400)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request,pk):
        try:
            comment = Comment.objects.get(pk = pk)
            if comment.user == request.user.pk:
                updated_comment_data = CommentSerializer(comment).data
                updated_comment_data['updated_comment'] = pk
                updated_comment_data['user'] = comment.user.pk
                updated_post = CommentSerializer(data=updated_comment_data)
                if updated_post.is_valid():
                    updated_post.save()
                serializer = CommentSerializer(comment, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data,status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=400)
            return Response('댓글 != 유저',status=400)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request,pk):
        try:
            comment = Comment.objects.get(pk = pk)
            if comment.user == request.user.pk:
                comment.delete()
                return Response('삭제 완료',status=status.HTTP_204_NO_CONTENT)
            
            return Response('댓글 != 유저',status=400)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class ReportAPICall(APIView):

    def post(self, request):
        report_data = request.data.copy()
        report_data['user'] = request.user.pk
        try:
            report = ReportSerializer(data=report_data)
            if report.is_valid():
                report.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(report.errors, status=400)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        

class LikeAPICall(APIView):

    def post(self, request):
        like_data = request.data.copy()
        like_data['user'] = request.user.pk
        comment = request.data.get('comment')
        post = request.data.get('post')
        try:
            like = Like.objects.get(
                user=request.user.pk, 
                comment=comment, 
                post=post
                )
            like.delete()
            return Response('좋아요 취소',status=status.HTTP_204_NO_CONTENT)
        except:
            try:
                like = LikeSerializer(data=like_data)
                if like.is_valid():
                    like.save()
                    return Response('좋아요',status=status.HTTP_201_CREATED)
                return Response(like.errors, status=400)
            except Exception as e:
                return Response(e,status=status.HTTP_404_NOT_FOUND)
            
            
        
    def delete(self, request):
        request.data.copy()
        comment = request.data.get('comment')
        post = request.data.get('post')
        try:
            like = Like.objects.filter(
                user=request.user.pk, 
                comment=comment, 
                post=post
                )
            like.delete()
            return Response('좋아요 취소',status=status.HTTP_204_NO_CONTENT)
        except :
            return Response('좋아요',status=status.HTTP_404_NOT_FOUND)
        
        