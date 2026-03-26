from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.
def makeUsername(name):
    username = ''
    for i in name:
        if i != '@':
            username+=i
        else:
            break
    return username


class UserManager(BaseUserManager):
    def create_user(self,email,name=None,password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        
        email = self.normalize_email(email)

        username = email.split('@')[0]
        extra_fields.pop('username', None)

        user = self.model(
            email=email,
            username=username,
            name=name,
            **extra_fields
            )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email,name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email,name, password, **extra_fields)

class User(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=100, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = UserManager()

    def __str__(self):
        return self.email
