from django.urls import path
from register import views
from .views import registration_view, getstudent, forgotpasswordemail
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path, include


app_name = 'register'

urlpatterns = [
    path('new_user', registration_view, name="register"),
    path('login', views.LoginView.as_view(), name="login"),
    path('first_password_change/<int:roll>', views.FirstPasswordChange.as_view()),
    path('password_reset', views.PasswordReset.as_view(), name='password_reset'),
    path('forgot_password/<int:roll_no>', forgotpasswordemail),
    path('student_info/<int:roll_no>', getstudent),
    path('classes', views.Class_assoList.as_view()),
    path('class/<int:pk>', views.Class_assoDetail.as_view()),
    path('userclasses', views.ClassDataList.as_view()),
    path('classdata/<int:pk>', views.ClassDataDetail.as_view()),

  ]