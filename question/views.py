from rest_framework import status
from rest_framework.response import Response
from .models import Question, Answer
from register.models import Class_asso, ClassData
from .serializers import QuestionSerializer, AnswerSerializer
from rest_framework.views import APIView
from django.http import Http404
from django.views import View
from rest_framework.permissions import IsAuthenticated
from django.http import QueryDict


# Create your views here.

class AnswerList(APIView):

    permission_classes = [IsAuthenticated]

    def class_data(self, class_id):
        class_s = Class_asso.objects.get(pk=class_id)
        return class_s

    def part_of_class(self, user, class_s):
        if ClassData.objects.filter(class_associated=class_s, student_info=user).exists:
            return True
        else:
            return False

    def get(self, request, class_id, question_id, format=None):
        op = self.part_of_class(request.user, self.class_data(class_id))
        data = {}
        if op:
            answers = Answer.objects.filter(ans_of_ques=question_id)
            serializer = AnswerSerializer(answers, many=True)
            return Response(serializer.data)
        else:
            data["Error"] = "Not Authorized"
            return Response(data=data)

    def post(self, request, class_id, question_id, format=None):
        op = self.part_of_class(request.user, self.class_data(class_id))
        data = {}
        if op:
            user = request.user
            data = {}
            q_dict = QueryDict('', mutable=True)
            q_dict.update(request.data)
            if user:
                data['hi'] = "hi"
                q_dict.__setitem__('replied_by', user.roll_no)
                q_dict.__setitem__('ans_of_ques', question_id)
            else:
                data["Failure"] = "not found. Add the college first"
            serializer = AnswerSerializer(data=q_dict)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AnswerDetail(APIView):

    permission_classes = [IsAuthenticated]

    def class_data(self, class_id):
        class_s = Class_asso.objects.get(pk=class_id)
        return class_s

    def part_of_class(self, user, class_s):
        if ClassData.objects.filter(class_associated=class_s, student_info=user).exists:
            return True
        else:
            return False

    def get_object(self, answer_id):
        try:
            return Answer.objects.get(pk=answer_id)
        except Answer.DoesNotExist:
            raise Http404

    def owner(self, request, question_id, answer):
        user = request.user
        if user != answer.replied_by:
            return Response({'response' : "You don't have permissions for this operation."})
        else:
            data = {}
            q_dict = QueryDict('', mutable=True)
            q_dict.update(request.data)
            data['hi'] = "hi"
            q_dict.__setitem__('replied_by', user.roll_no)
            q_dict.__setitem__('ans_of_ques', question_id)
            return q_dict

    def get(self, request, class_id, question_id, answer_id, format=None):
        op = self.part_of_class(request.user, self.class_data(class_id))
        data = {}
        if op:
            answer = self.get_object(answer_id)
            serializer = AnswerSerializer(answer)
            return Response(serializer.data)
        else:
            data['Error'] = "Not Authorized."

    def put(self, request, class_id, question_id, answer_id, format=None):
        op = self.part_of_class(request.user, self.class_data(class_id))
        data = {}
        if op:
            answer = self.get_object(answer_id)
            a = self.owner(request, question_id, answer)
            serializer = AnswerSerializer(answer, data=a)
            if serializer.is_valid():
                serializer.save()
                data["success"]="Update successful"
                return Response(data=data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, class_id, question_id, answer_id, format=None):
        op = self.part_of_class(request.user, self.class_data(class_id))
        data = {}
        if op:
            answer = self.get_object(answer_id)
            self.owner(request, question_id, answer)
            operation = answer.delete()
            if operation:
                data["success"] = "Deleted successfully"
            else:
                data["failure"] = "Delete operation failed"
            return Response(status=status.HTTP_204_NO_CONTENT, data=data)
        else:
            data['Error'] = "Not Authorized."

class QuestionList(APIView):

    permission_classes = [IsAuthenticated]

    def class_data(self, class_id):
        class_s = Class_asso.objects.get(pk=class_id)
        return class_s

    def part_of_class(self, user, class_s):
        if ClassData.objects.filter(class_associated=class_s, student_info=user).exists:
            return True
        else:
            return False

    def get(self, request, class_id, format=None):
        op = self.part_of_class(request.user, self.class_data(class_id))
        data={}
        if op:
            questions = Question.objects.filter(classdata=self.class_data(class_id))
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data)
        else:
            data['Access Denied'] = "User not part of the class."


    def post(self, request, class_id, format=None):
        op = self.part_of_class(request.user, self.class_data(class_id))
        data = {}
        if op:
            q_dict = QueryDict('', mutable=True)
            q_dict.update(request.data)
            user = request.user
            if user:
                q_dict.__setitem__('asked_by', user.roll_no)
                q_dict.__setitem__('classdata', self.class_data(class_id).class_associated)
            else:
                data["Failure"] = "not found. Add the college first"
            serializer = QuestionSerializer(data=q_dict)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            data['Access Denied'] = "User not part of the class."


class QuestionDetail(APIView):

    permission_classes = [IsAuthenticated]

    def class_data(self, class_id):
        class_s = Class_asso.objects.get(pk=class_id)
        return class_s

    def part_of_class(self, user, class_s):
        if ClassData.objects.filter(class_associated=class_s, student_info=user).exists:
            return True
        else:
            return False

    def get_object(self, question_id):
        try:
            return Question.objects.get(pk=question_id)
        except Question.DoesNotExist:
            raise Http404

    def owner(self, request, class_id, question):
        user = request.user
        if user != question.asked_by:
            return Response({'response' : "You don't have permissions for this operation."})
        else:
            data = {}
            q_dict = QueryDict('', mutable=True)
            q_dict.update(request.data)
            data['hi'] = "hi"
            q_dict.__setitem__('asked_by', user.roll_no)
            q_dict.__setitem__('classdata', self.class_data(class_id).class_associated)
            return q_dict

    def get(self, request, class_id, question_id, format=None):
        op = self.part_of_class(request.user,  self.class_data(class_id))
        data={}
        if op:
            question = self.get_object(question_id)
            serializer = QuestionSerializer(question)
            return Response(serializer.data)
        else:
            data["Error"] = "Not authorized"
            return Response(data=data)

    def put(self, request, class_id, question_id, format=None):
        op = self.part_of_class(request.user, self.class_data(class_id))
        data = {}
        if op:
            question = self.get_object(question_id)
            a = self.owner(request, class_id, question)
            serializer = QuestionSerializer(question, data=a)
            if serializer.is_valid():
                 serializer.save()
                 data["success"]="Update successful"
                 return Response(data=data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            data["Error"] = "Not Authorized"

    def delete(self, request, class_id, question_id, format=None):
        op = self.part_of_class(request.user, self.class_data(class_id))
        data = {}
        if op:
            question = self.get_object(question_id)
            self.owner(request, class_id, question)
            operation = question.delete()
            data = {}
            if operation:
                data["success"] = "Deleted successfully"
            else:
                data["failure"] = "Delete operation failed"
            return Response(status=status.HTTP_204_NO_CONTENT, data=data)
        else:
            data['Error'] = "Not Authorized"