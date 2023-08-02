from rest_framework import serializers
from .models import Story,Character

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = '__all__'
        
    def create(self, validated_data):
        character = Character.objects.create(**validated_data)
        return character

class StorySerializer(serializers.ModelSerializer):
    characters = CharacterSerializer(many = True)
    class Meta:
        model = Story
        fields = '__all__'
    
    def create(self, validated_data):
        characters = validated_data.pop("characters")
        story = Story.objects.create(**validated_data)
        char_model = [Character.objects.create(
            name = i['name'],
            age_range = i['age_range'],
            is_male = i['is_male'],
            description = i['description'],
            description_img = i['description_img'],
        ) for i in characters]
        story.characters.set(char_model)
        return story
