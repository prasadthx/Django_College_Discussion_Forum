from django.contrib.auth.models import BaseUserManager

class StudentManager(BaseUserManager):
    def create_user(self, roll_no, email, password):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            roll_no=roll_no
        )
        user.is_admin = False
        user.is_staff = False
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, roll_no, email, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            email=self.normalize_email(email),
            roll_no=roll_no
        )
        user.set_password(password)
        user.is_admin = True
        user.save(using=self._db)
        return user