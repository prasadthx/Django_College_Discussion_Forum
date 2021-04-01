from django.urls import path
from question import views


app_name = 'question'

urlpatterns = [
    path('question/<int:class_id>', views.QuestionList.as_view()),
    path('question/<int:class_id>/<int:question_id>', views.QuestionDetail.as_view()),
    path('answer/<int:class_id>/<int:question_id>', views.AnswerList.as_view()),
    path('answer/<int:class_id>/<int:question_id>/<int:answer_id>', views.AnswerDetail.as_view()),
]