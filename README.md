
************************************************************************
========================COLLEGE DISCUSSION FORUM======================



LANGUAGE/S     :- PYTHON


FRAMEWORK/S :- DJANGO, DJANGO REST FRAMEWORK


DATABASE         :- SQLITE3


INTRODUCTION AND BASICS:-

1. The college discussion forum api allows users to register to their respective  
   college accounts and have a question-answer feed of their preference.

2. Any registered student can select his/her subjects/classes of choice to enroll
   for or create a new class. After joining the respective class they can post their
   question or answer any other student's question or just view the question-answer
   feed.

3. A student cannot edit a question which is not posted by him. A student can only edit  
   the questions asked by him and his/her answer to any question(by another student)
   answered by him.

4. A student can change the password if he has forgotten it or wishes to switch over to
   new password.


USAGE :-

@ REGISTRATION PART

1. The college discussion forum being college specific has to have pre-built data
   regarding the information of students.

2. If any student data is missing, new student data can be added at:-
   /register/new_user
   (Post method . Required data: Roll No and Email Id)

3. Students have to register/login on the discussion forum platform using their Roll No
   and password.

4. When logging in for the first time (i.e. registration) an email will be sent to the student's
   email address registered with the college, to change the password. Unless the password
   has been changed on first time login, no student is given access to the platform.

5. The platform has token based authentication system for handling security issues. Upon
   changing the password, the student is given access to the platform. If any student forgets
   his/her password, he/she may reset it with the forget password link.

6. For logging in for first time(i.e. registration) use (GET request):-
   /register/first_password_change/(student's roll_no)

   For any other logging attempt (POST request (roll no and password) ):-
   /register/login

7. The platform is smart enough to know whether any student is logging in for the first time or
   not. So, chances of spoofing into another student's account are highly reduced as long as any
   student keeps his email regarding the password change secure.

8. If any student forgets his/her password, the password can be reset by them through (GET):-
   /register/forgot_password/(student's roll_no)
   Link to reset password will be sent to the student's email address.
   Following the link to set up the new password:-
   /register/forgot_password/(student's roll_no)

9. On entering the platform, a student can choose among the discussion forums(classes/subjects)
   made available by the college or create one by himself(It is highly discouraged to do so.)

   For viewing the available classes or create a new one:-
   /register/classes
   (Get request => Get list of classes, POST request => Create new class)

10.For editing, deleting or viewing a discussion forum(class/subject), the logged in student should
be the creator of the class.
For editing, deleting or updating a discussion forum:-
www.juitpython.anywhere/register/class/(class id)
with PUT, DELETE, GET for respective uses.

11.For viewing the classes a student has enrolled in or wants to enroll in:-
/register/userclasses
(GET request to view the enrolled classes, POST to join a class)

12.For unenrolling from a class:-
/register/classdata/(class id)
(DELETE request)

13.To get the student data:
/register/student_info/(student_roll_no)
(GET request)

@ QUESTION-ANSWER PART

14.To get all the questions related to a class:-
/question/question/(class id)
(GET request ==> Get all questions, POST request ==> Add a new question)

15.For editing, deleting or viewing a question, the logged in student should be the student
who has asked the question.
/question/question/(class id)/(question id)
(GET, PUT, DELETE for viewing, modifying and deleting the question respectively.)

16.To view answers answered to a particular question:-
/question/answer/(class id)/(question id)
(GET request ==> Get all answers, POST request ==> Add a new answer)

17.For editing, deleting or viewing an answer, the logged in student should be the student
who has answered.
/question/question/(class id)/(question id)/(answer id)
(GET, PUT, DELETE for viewing, modifying and deleting the answer respectively.)


NOTE :- All the id fields are integers.


###########################################################
###########################################################
//////////////////////////////////////////////////          THANK YOU        \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

      

     


     
