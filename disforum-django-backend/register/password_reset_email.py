from django.core.mail import EmailMultiAlternatives
from rest_framework import request
from django.urls import reverse
from rest_framework.authtoken.models import Token
import register.urls




def password_change_email(student):
    create_auth_token(student)
    user = student
    token = Token.objects.get(user=student).key
    subject = 'Password Reset for your account'
    from_email = 'prasadzore31@gmail.com'
    to = user.email
    text_content = 'Click below to change your account password.\n {}?pz={}'.format('password_reset', token)

    html_content = '<p>Click below to change your account password.</p><br>{}?pz={}'.format('password_reset', token)
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()



def create_auth_token(student):
    token = Token.objects.get(user=student)
    token.delete()
    Token.objects.create(user=student)



