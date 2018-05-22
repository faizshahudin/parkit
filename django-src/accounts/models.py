from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser

class User (AbstractUser):
    contact = models.CharField(max_length=30, blank=True)
    re_type_password = models.CharField(max_length=50, blank=True, default='null')
    gender  = models.CharField(max_length=10, blank=True)
    dateofbirth = models.DateField(auto_now=False,auto_now_add=False,blank=True,null=True)
    workplace = models.CharField(max_length=100, blank=True)
    bank_acc_no = models.CharField(max_length=30, blank=True)
    bank_name = models.CharField(max_length=30, blank=True)
#    pending image upload