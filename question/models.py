from django.db import models
from datetime import datetime
from django.conf import settings
from register.models import Class_asso, Student

# Create your models here.

class Question(models.Model):
    question_text = models.TextField()
    classdata = models.ForeignKey(Class_asso, on_delete=models.CASCADE, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    asked_by = models.ForeignKey(Student, on_delete=models.CASCADE, blank=False)
    def __str__(self):
        return self.question_text

class Answer(models.Model):
    replied_by = models.ForeignKey(Student, on_delete=models.CASCADE, blank=False)
    answer_text = models.TextField()
    ans_of_ques = models.ForeignKey(Question, on_delete=models.CASCADE, null=False, blank=False)
    answered_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.answer_text

