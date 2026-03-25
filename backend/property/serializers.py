from rest_framework import serializers
from .models import *

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImages
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = '__all__'

class PropertySerializers(serializers.ModelSerializer):
    location = LocationSerializer()
    images = PropertyImageSerializer(many=True)
    reviews = ReviewSerializer(many=True)

    class Meta:
        model = Property
        fields = '__all__'