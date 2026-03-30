from django.db import models
from user.models import User

# Create your models here.
class Property(models.Model):
    class PropertyType(models.TextChoices):
        HOUSE = 'house', 'House'
        APARTMENT = 'apartment', 'Apartment'
        LAND = 'land', 'Land'

    class Status(models.TextChoices):
        SALE = 'sale', 'For Sale'
        RENT = 'rent', 'For Rent'

    title = models.CharField(max_length=250)
    description = models.TextField()
    price = models.DecimalField(max_digits=12,decimal_places=2, blank=False, null=False)
    property_type = models.CharField(max_length=20, choices=PropertyType.choices)
    status = models.CharField(max_length=20, choices=Status.choices)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    

    def __str__(self):
        return self.title

class Location(models.Model):
    property = models.OneToOneField(Property, on_delete=models.CASCADE)
    city = models.CharField(max_length=200)
    area = models.CharField(max_length=200)

    def __str__(self):
        return self.city

class PropertyImages(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='property_images/', null=True, blank=True)

class Reviews(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1, null=True, blank=True)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)

