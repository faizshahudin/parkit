from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser

class User (AbstractUser):
    contact = models.CharField(max_length=30, blank=True)