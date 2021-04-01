from rest_framework import serializers
from .models import Answer, Question
from register.models import Student, Class_asso

class QuestionSerializer(serializers.ModelSerializer):
    asked_by = serializers.SlugRelatedField(slug_field='roll_no', queryset=Student.objects.all())
    classdata = serializers.SlugRelatedField(slug_field='class_associated', queryset=Class_asso.objects.all())
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'asked_by', 'classdata']

class AnswerSerializer(serializers.ModelSerializer):
    replied_by = serializers.SlugRelatedField(slug_field='roll_no', queryset=Student.objects.all())
#    ans_of_ques = serializers.SlugRelatedField(slug_field='class_associated', queryset=Question.objects.all())
    class Meta:
        model = Answer
        fields = ['id', 'answer_text', 'replied_by', 'ans_of_ques']