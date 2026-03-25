from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import PropertySerializers
from rest_framework.filters import SearchFilter
# Create your views here.

class PropertyViewSet(ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializers
    filter_backends = [SearchFilter]
    search_fields = ['title', 'description','price']

