import datetime
from django.conf import settings
from django.db import models
from django.utils import timezone
from accounts.models import User

def current_user(request):
    return request.user.id

def upload_location (instance,filename):
    today = datetime.date.today()  # get today's date as a datetime type
    todaystr = today.isoformat() 
    return "%s/%s/%s/%s" % (todaystr,'parking', instance.user.id , filename)

# Create your models here.
class ParkingForRent (models.Model):
    user          = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="owner")
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
        ('Pending' , 'Pending'),
        ('Enquiry' , 'Enquiry'),     
        ('Approved', 'Approved'),
        ('Occupied', 'Occupied'),
    )
    db_level      = models.CharField(max_length=100, blank=True)
    db_status     = models.CharField(max_length=100, choices=list_status, default='Pending')
    timestamp     = models.DateTimeField(auto_now=False, auto_now_add=True)
    serial_no     = models.CharField(max_length=15, blank=True)
    occupied_by   = models.OneToOneField(User, on_delete=models.CASCADE, related_name="parker",null=True)
    image         = models.ImageField(upload_to=upload_location,null=True,blank=True)


    def __str__(self):
        return self.db_property