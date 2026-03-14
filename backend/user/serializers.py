from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'confirmPassword']
        extra_kwargs = {
            'password': {'write_only':True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirmPassword']:
            raise serializers.ValidationError({"password": "password do not match"})
        
        raise attrs
    
    def create(self, validate_data):
        validated_data.pop('confirmPassword')
        user = User.objects.create_user(**validate_data)
        return user