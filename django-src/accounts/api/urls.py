from django.conf.urls import url
from django.contrib import admin
from rest_framework.authtoken import views

from .views import (
    UserCreateAPIView,
    UserLoginAPIView,
    )

app_name = 'accounts'

urlpatterns = [
    url(r'^login/$', UserLoginAPIView.as_view(), name='login'),
    url(r'^register/$', UserCreateAPIView.as_view(), name='register'),
    
]
