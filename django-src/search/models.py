from django.conf import settings
from django.db import models
from django.utils import timezone
#from django.contrib.contenttypes.models import ContentType
#from django.db.models.signals import pre_save

#from django.utils.safestring import mark_safe
#from django.utils.text import slugify
#from markdown_deux import markdown

from rent.models import (
    ParkingForRent,
)

# Create your models here.
class Vehicle (models.Model):
    parked_condo = models.ForeignKey(ParkingForRent,on_delete=models.CASCADE, related_name='condo_vehicle',null=True)
    parked_bay = models.ForeignKey(ParkingForRent,on_delete=models.CASCADE,to_field='bay',related_name='bay_vehicle')
    car_model = models.CharField(max_length=100,default='None')
    car_registery = models.CharField(max_length=100,default='ABC1234')