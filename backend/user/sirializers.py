from rest_framework import serializers
from django.contrib.auth import get_user_model
from .utils.nickname import generate_random_sentence

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('kakao_name', 'kakao_uid', 'email', 'profile_image_url','nickname','access_token')

    def create(self, validated_data):
        
        def get_new_nickname():
            new_nickname = ''
            try:
                while True:
                    new_nickname = generate_random_sentence()
                    User.objects.get(nickname = new_nickname)
            except:
                return new_nickname
        
        user = User.objects.create_user(
            kakao_uid=validated_data['kakao_uid'],
            username=str(validated_data['kakao_uid']),
            kakao_name=validated_data.get('kakao_name', ''),
            email=validated_data.get('email', ''),
            profile_image_url=validated_data.get('profile_image_url', ''),
            access_token = validated_data.get('access_token'),
            nickname = get_new_nickname()
        )
        return user



class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('kakao_name', 'kakao_uid', 'email', 'profile_image_url','nickname','access_token')
    
    # def update(self, instance, validated_data):
    #     instance.email = validated_data.get('email', instance.email)
    #     instance.profile_image_url = validated_data.get('profile_image_url', instance.profile_image_url)
    #     instance.kakao_name = validated_data.get('kakao_name', instance.kakao_name)
    #     return instance
    

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('kakao_name', 'kakao_uid', 'email', 'profile_image_url','nickname')