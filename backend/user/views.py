from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import RegistrationSerializer, LoginSerializer
# Create your views here.

class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user= serializer.save()

            return Response(
                {
                    "message": "User registered success",
                    "user":{
                        "id": user.id,
                        "name": user.name,
                        "email":user.email
                    }
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    