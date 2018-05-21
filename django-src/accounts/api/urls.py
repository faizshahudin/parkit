#from django.conf.urls import url
from django.urls import path
from django.contrib import admin
from rest_framework.authtoken import views
from django.conf.urls import url

from .views import (
    UserCreateAPIView,
#    UserLoginAPIView,
    )

app_name = 'accounts'

urlpatterns = [
#   url(r'^login/$', UserLoginAPIView.as_view(), name='login'),
#   url(r'^register/$', UserCreateAPIView.as_view(), name='register'),
    path('register', UserCreateAPIView.as_view(), name='register'),
]
