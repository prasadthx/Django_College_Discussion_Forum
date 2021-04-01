from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Student, ClassData, Class_asso
from register.serializers import RegistrationSerializer, ClassDataSerializer, PasswordChangeSerializer, Class_assoSerializer
from rest_framework.views import APIView
from django.http import Http404
from django.views import View
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.http import QueryDict
from django.contrib.auth.signals import user_logged_in
from rest_framework.authtoken.views import ObtainAuthToken
from register.password_reset_email import create_auth_token, password_change_email

# Create your views here.


@api_view(['POST'])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            student = serializer.save()
            data['response'] = 'Successfully registered user'
            data['roll_no'] = student.roll_no
            data['email'] = student.email
            token = Token.objects.get(user=student).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)


class LoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user=serializer.validated_data['user']
        data = {}
        if user.login_count==0:
            data['Error'] = "Register yourself first"
            return Response(data=data)
        else:
            user.login_count = user.login_count + 1
        token = Token.objects.get(user=user).key
        data['token']=token
        return Response(data=data)


class FirstPasswordChange(APIView):

    def login_check(self, roll):
        student = getUser(roll)
        if not student.login_count==0:
            return False
        else:
            student.login_count = student.login_count+1
            return True

    def get(self, request, roll):
        if self.login_check(roll):
            data={}
            student = Student.objects.get(roll_no=roll)
            password_change_email(student)
            data['success'] = "Email to change password sent successfully."
            return Response(data=data)
        else:
            data = {}
            data['Error'] = "Already registered. Proceed to login."
            return Response(data=data)


class PasswordReset(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = PasswordChangeSerializer(request.user, request.data)
        data = {}
        if serializer.is_valid():
            serializer.update(request.user, request.data)
            data['success'] = "Password changed successfully"
            create_auth_token(request.user)
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def getUser(roll):
    student = Student.objects.get(roll_no=roll)
    return student


@api_view(['GET'])
def forgotpasswordemail(request, roll_no):
    student = getUser(roll_no)
    data = {}
    password_change_email(student)
    data['success'] = "Email to change password sent successfully."
    return Response(data=data)


@api_view(['GET'])
def getstudent(request, roll_no):
    student = Student.objects.get(roll_no=roll_no)
    data={}
    data['Roll no'] = student.roll_no
    data['First Name'] = student.first_name
    data['Last Name'] = student.last_name
    data['Email'] = student.email
    return Response(data=data)


class Class_assoList(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        classes = Class_asso.objects.all()
        serializer = Class_assoSerializer(classes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        data = {}
        serializer = Class_assoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Class_assoDetail(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Class_asso.objects.get(pk=pk)
        except Class_asso.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        class_asso = self.get_object(pk)
        serializer = Class_assoSerializer(class_asso)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        class_asso = self.get_object(pk)
        serializer = Class_assoSerializer(class_asso, data=request.data)
        info = {}
        if serializer.is_valid():
            serializer.save()
            info["success"] = "Update successful"
            return Response(data=info)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        class_asso = self.get_object(pk)
        operation = class_asso.delete()
        data = {}
        if operation:
            data["success"] = "Deleted successfully"
        else:
            data["failure"] = "Delete operation failed"
        return Response(status=status.HTTP_204_NO_CONTENT, data=data)

class ClassDataList(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        classes = ClassData.objects.filter(student_info=request.user)
        serializer = ClassDataSerializer(classes, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        user = request.user
        data = {}
        q_dict = QueryDict('', mutable=True)
        q_dict.update(request.data)
        if user:
            data['hi'] = "hi"
            q_dict.__setitem__('student_info', user.id)
        else:
            data["Failure"] = "Failed to add"
        serializer = ClassDataSerializer(data=q_dict)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClassDataDetail(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return ClassData.objects.get(pk=pk)
        except ClassData.DoesNotExist:
            raise Http404

    def owner(self, request, var):
        user = request.user
        if user != var.student_info:
            return Response({'response' : "You don't have permissions for this operation."})
        else:
            data = {}
            q_dict = QueryDict('', mutable=True)
            q_dict.update(request.data)
            data['hi'] = "hi"
            q_dict.__setitem__('student_info', user.id)
            return q_dict

    def get(self, request, pk, format=None):
        class_data = self.get_object(pk)
        serializer = ClassDataSerializer(class_data)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        class_data = self.get_object(pk)
        a = self.owner(request, class_data)
        serializer = ClassDataSerializer(class_data, data=a)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data["success"] = "Update successful"
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        class_data = self.get_object(pk)
        self.owner(request, class_data)
        operation = class_data.delete()
        data = {}
        if operation:
            data["success"] = "Deleted successfully"
        else:
            data["failure"] = "Delete operation failed"
        return Response(status=status.HTTP_204_NO_CONTENT, data=data)


def login_increment(sender, request, user, **kwargs):
    user.login_count = user.login_count + 1
    user.save()



user_logged_in.connect(login_increment)







