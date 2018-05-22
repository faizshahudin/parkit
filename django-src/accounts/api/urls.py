#from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from rest_framework.authtoken import views
from django.conf.urls import url

from .views import (
    UserCreateAPIView,
)

app_name = 'accounts'

urlpatterns = [
    path('register', UserCreateAPIView.as_view(), name='register'),
]
