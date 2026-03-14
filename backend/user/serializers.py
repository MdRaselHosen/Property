from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from .models import User

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password','confirm_password']
        extra_kwargs = {
            'password': {'write_only':True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "password do not match"})
        
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        email = validated_data.get('email')

        # extract username from email
        username = email.split('@')[0]

        user = User.objects.create_user(
            username=username,
            **validated_data
        )

        return user