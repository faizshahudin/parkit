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
    user          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    db_property   = models.CharField(max_length=100)
    list_area = (
        ('KL_Sentral' , 'KL Sentral'),
        ('Damansara'  , 'Damansara'),
        ('Other'      , 'Other'),
    )    
    sel_area = models.CharField(max_length=100, choices=list_area, default='Please Select Area')
    db_area  = models.CharField(max_length=200,blank=True)
    db_bay   = models.CharField(max_length=100,default='Insert Bay Info')
    list_type = (
        ('Condominium'   , 'Condominium'),
        ('Commercial'    , 'Commercial'),
        ('Landed'        , 'Landed'),
    )
   
    db_type = models.CharField(max_length=100,choices=list_type, default='Condominium')
  
    list_option = (
        ('yes', 'yes'),
        ('no' , 'no'),
    )
    db_reserved = models.CharField(max_length=100,choices=list_option,default='yes')
    list_period = (
        ('12' , '12 Months'),
        ('6'  , '6 Months'),
        ('3'  , '4 Months'),
        ('Any', 'Any'),
    )
    sel_period = models.CharField(max_length=100, choices=list_period, default=12)
    db_period = models.CharField(max_length=100,blank=True)
    list_price = (
        ('300', 'RM300'),
        ('250', 'RM250'),
        ('150', 'RM150'),
        ('Any', 'Any'),
    )

    sel_price = models.CharField(max_length=100, choices=list_price, default=300)
    db_price = models.CharField(max_length=100, blank=True)
    list_status = (
        ('Approved', 'Approved'),
        ('Occupied', 'Occupied'),
        ('Pending' , 'Pending'),
    )    
    db_status = models.CharField(max_length=100, choices=list_status, default='Pending')
    timestamp = models.DateTimeField(auto_now=False, auto_now_add=True)
    serial_no = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.db_property