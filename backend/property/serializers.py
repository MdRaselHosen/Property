from rest_framework import serializers
from .models import *

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['city','area']

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImages
        fields = ['id', 'image']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = ['id', 'rating', 'comment', 'created_at']
        read_only_fields = ['created_at']
    
    def to_representation(self, instance):
        """Override to include user info in response"""
        ret = super().to_representation(instance)
        ret['user'] = {
            'id': instance.user.id,
            'first_name': instance.user.first_name,
            'last_name': instance.user.last_name,
            'email': instance.user.email,
        }
        return ret

class PropertySerializers(serializers.ModelSerializer):
    location = LocationSerializer()
    images = PropertyImageSerializer(many=True,required=False)
    reviews = ReviewSerializer(many=True, required=False)

    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['owner']

    def create(self, validate_data):
        location_data = validate_data.pop('location')
        images_data = validate_data.pop('images',[])
        reviews_data = validate_data.pop('reviews',[])

        property_instance = Property.objects.create(**validate_data)

        Location.objects.create(property=property_instance, **location_data)

        for image in images_data:
            PropertyImages.objects.create(property=property_instance, **image)

        for review in reviews_data:
            Reviews.objects.create(property=property_instance, **review)


        return property_instance




    