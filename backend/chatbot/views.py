import os
import openai
import json
from dotenv import load_dotenv

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Conversation
from story.models import Story
from .serializers import StorySerializer

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

class ChatAPICall(APIView):

    # def get(self,request,pk):
    #     try:
    #         story = Story.objects.get(pk=pk)
    #         prompt = StorySerializer(story)
    #         return Response(prompt.data)
        
    #     except Story.DoesNotExist:
    #         return Response("스토리를 찾을 수 없습니다.", status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request, pk):
        try:
            story = Story.objects.get(pk=pk)
        except Story.DoesNotExist:
            return Response("스토리를 찾을 수 없습니다.", status=status.HTTP_404_NOT_FOUND)

        # 이전 대화 기록 가져오기

        serializer = StorySerializer(story)
        prompt_json = json.dumps(serializer.data, ensure_ascii=False)
        prompt = str(prompt_json).replace('"','')
        prompt_with_previous = f"User: {prompt} 정보를 이용해서 max_tokens을 모두 사용 하고, 어린 아이가 읽을 동화를 한글로 작성해줘.\nAI:"
        # OpenAI에 요청하여 응답 받기
        model_engine = "text-davinci-003"
        completions = openai.Completion.create(
            engine=model_engine,
            prompt=prompt_with_previous,
            max_tokens=3072,
            n=1,
            stop=None,
            temperature=1,
        )
        response = completions.choices[0].text.strip()

        prompt_with_previous = f"User: {response} 내용에서 핵심내용을 추려서 영어로 Dall-E에 요청 할 동화 표지 프롬프트를 출력해줘.\nAI:"
        completions = openai.Completion.create(
            engine=model_engine,
            prompt=prompt_with_previous,
            max_tokens=1024,
            n=1,
            stop=None,
            temperature=1,
        )
        img_prompt = completions.choices[0].text.strip()
        img_response = openai.Image.create(
        prompt=img_prompt,
        n=1,
        size="1024x1024"
        )
        image_url = img_response['data'][0]['url']

        conversation = Conversation(story=story, prompt=prompt_json, response=response)
        conversation.save()

        return Response({"response": response,"img_prompt":img_prompt,"img_url":image_url}, status=status.HTTP_201_CREATED)


