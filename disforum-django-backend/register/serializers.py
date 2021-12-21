from rest_framework import serializers
from .models import Student, ClassData, Class_asso
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator

class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model = Student
        fields = ['roll_no', 'email', 'password', 'password2', 'login_count']
        extra_kwargs = {
            'password' : {'write_only':True}
        }
    def save(self):
        student = Student(
                    email = self.validated_data['email'],
                    roll_no = self.validated_data['roll_no'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password2 != password:
            raise serializers.ValidationError({'password':'Passwords must match'})
        student.set_password(password)
        student.login_count = 2
        student.save()
        return student


class ClassDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassData
        fields = ['id', 'student_info', 'class_associated', 'date_joined']
        depth = 1
        validators = [
            UniqueTogetherValidator(
                queryset=ClassData.objects.all(),
                fields=['student_info', 'class_associated']
            )
        ]

class RegisterClassDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassData
        fields = ['student_info', 'class_associated']
        validators = [
            UniqueTogetherValidator(
                queryset=ClassData.objects.all(),
                fields=['student_info', 'class_associated']
            )
        ]        


class PasswordChangeSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model = Student
        fields = ['password', 'password2']
        extra_kwargs = {
            'password' : {'write_only':True}
        }
    def update(self, instance, validated_data):
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password2 != password:
            raise serializers.ValidationError({'password':'Passwords must match'})
        instance.set_password(password)
        instance.login_count += 1
        instance.save()
        return instance

class Class_assoSerializer(serializers.ModelSerializer):
    students = serializers.SlugRelatedField(many=True, slug_field='roll_no', queryset=Student.objects.all())
    class Meta:
        model = Class_asso
        fields = ['id', 'class_associated', 'students', 'created_at']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['email']
    



    
