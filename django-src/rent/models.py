from django.conf import settings
from django.db import models
from django.utils import timezone
#from django.contrib.contenttypes.models import ContentType
#from django.db.models.signals import pre_save

#from django.utils.safestring import mark_safe
#from django.utils.text import slugify
#from markdown_deux import markdown

# Create your models here.
class ParkingForRent (models.Model):
    user  = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    condo = models.CharField(max_length=100)
    area_list = (
        ('KL_Sentral' , 'KL Sentral'),
        ('Damansara'  , 'Damansara'),
        ('Other'      , 'Other'),
    )    
    area  = models.CharField(max_length=100, choices=area_list, default='Please Select Area')
    new_area = models.CharField(max_length=200,blank=True)
    bay = models.CharField(max_length=100,default='Insert Bay Info')
    type_list = (
        ('Landed'   , 'Landed'),
        ('Apartment', 'Apartment'),
    )
    type_select = models.CharField(max_length=100,choices=type_list, default='Apartment')
    option = (
        ('yes', 'yes'),
        ('no' , 'no'),
    )
    dedicated = models.CharField(max_length=100,choices=option,default='yes')
    lease_period = (
        ('12' , '12 Months'),
        ('6'  , '6 Months'),
        ('3'  , '4 Months'),
        ('Any', 'Any'),
    )
    time = models.CharField(max_length=100, choices=lease_period, default=12)
    new_time = models.CharField(max_length=100,blank=True)
    price_list = (
        ('300', 'RM300'),
        ('250', 'RM250'),
        ('150', 'RM150'),
        ('Any', 'Any'),
    )

    price = models.CharField(max_length=100, choices=price_list, default=300)
    new_price = models.CharField(max_length=100, blank=True)
    status_list = (
        ('Approved', 'Approved'),
        ('Occupied', 'Occupied'),
        ('Pending' , 'Pending'),
    )    
    status = models.CharField(max_length=100, choices=status_list, default='Pending')
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)

    def __str__(self):
        return self.condo