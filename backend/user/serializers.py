from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken


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

        username = email.split('@')[0]

        user = User.objects.create_user(
            username=username,
            **validated_data
        )

        return user
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password")
        
        refresh = RefreshToken.for_user(user)

        return {
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email,
            },
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }