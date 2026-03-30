from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from property.serializers import PropertySerializers

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
    

        user = User.objects.create_user(**validated_data)

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
    
class UserProfileSerializer(serializers.ModelSerializer):
    properties = PropertySerializers(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username','email','properties']