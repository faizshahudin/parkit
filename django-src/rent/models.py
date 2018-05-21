from django.conf import settings
from django.db import models
from django.utils import timezone

# Create your models here.
class ParkingForRent (models.Model):
    user          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    db_property   = models.TextField(default="Property Name")
    db_address    = models.TextField(default="Address")
    db_longitude  = models.CharField(max_length=255, default="Longitude")
    db_latitude   = models.CharField(max_length=255, default="Latitude")
    db_area       = models.CharField(max_length=200,blank=True)
    db_bay        = models.CharField(max_length=100,default='Please Update Bay #')
    db_type       = models.CharField(max_length=100,default='Type of Building')
    db_reserved   = models.CharField(max_length=3,default='Yes')
    db_period     = models.CharField(max_length=100,blank=True)
    db_price      = models.CharField(max_length=100, blank=True)
    db_sale_price = models.CharField(max_length=100, blank=True)
    list_status   = (
        ('Approved', 'Approved'),
        ('Occupied', 'Occupied'),
        ('Pending' , 'Pending'),
    )    
    db_status     = models.CharField(max_length=100, choices=list_status, default='Pending')
    timestamp     = models.DateTimeField(auto_now=False, auto_now_add=True)
    serial_no     = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.db_property