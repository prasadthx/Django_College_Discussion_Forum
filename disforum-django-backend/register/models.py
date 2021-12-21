from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .manager import StudentManager
from datetime import datetime
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.db.models.signals import post_save


# Create your models here.

class Student(AbstractBaseUser):
    roll_no = models.PositiveIntegerField(blank=False, null=False, unique=True)
    first_name = models.CharField(blank=False, max_length= 15 , null=False)
    last_name = models.CharField(blank=False, max_length=15 , null=False)
    email = models.EmailField(null=False, blank=False, unique=True, verbose_name='email address')
    classes = models.ManyToManyField('Class_asso', through='ClassData')
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    login_count = models.PositiveIntegerField(blank=False, default=0, null=False)
    objects = StudentManager()

    USERNAME_FIELD = 'roll_no'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


    class Meta:
        db_table = 'Student'

class Class_asso(models.Model):
    class_associated = models.CharField(max_length=10, default="ss", unique=True)
    students = models.ManyToManyField('Student', through='ClassData', default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.class_associated


class ClassData(models.Model):
    student_info = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    class_associated = models.ForeignKey(Class_asso, on_delete=models.CASCADE)
    date_joined = models.DateField(auto_now_add=True)
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['student_info', 'class_associated'], name='unique')
        ]


@receiver(post_save, sender = settings.AUTH_USER_MODEL)

def create_auth_token(sender, instance = None , created = False , **kwargs):
    if created:
        Token.objects.create(user = instance)


