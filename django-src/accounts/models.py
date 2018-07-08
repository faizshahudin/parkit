from __future__ import unicode_literals

import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

def upload_location (instance,filename):
    today = datetime.date.today()  # get today's date as a datetime type
    todaystr = today.isoformat() 
    return "%s/%s/%s/%s" % (todaystr,'profile',instance.user.id, filename)

class User (AbstractUser):
    contact = models.CharField(max_length=30, blank=True)
    gender  = models.CharField(max_length=10, blank=True)
    dateofbirth = models.DateField(auto_now=False,auto_now_add=False,blank=True,null=True)
    workplace = models.CharField(max_length=100, blank=True)
    bank_acc_no = models.CharField(max_length=30, blank=True)
    bank_name = models.CharField(max_length=30, blank=True)
    image = models.ImageField(upload_to=upload_location,null=True,blank=True)