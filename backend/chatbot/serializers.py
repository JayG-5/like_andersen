# serializers.py
from rest_framework import serializers
from story.models import Character, Story

class CharacterSerializer(serializers.ModelSerializer):
    is_male = serializers.SerializerMethodField()

    def get_is_male(self, character):
        return '남' if character.is_male == True else '여' if character.is_male == False else '알 수 없음'

    class Meta:
        model = Character
        fields = ['name', 'age_range', 'is_male','description']

class StorySerializer(serializers.ModelSerializer):
    characters = CharacterSerializer(many=True)

    class Meta:
        model = Story
        fields = ['theme','characters','background','plot','moral']

