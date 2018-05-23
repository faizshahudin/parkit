from django.conf.urls import url
from django.contrib import admin

from .views import (
    ProfileQueryAPIView,
    ProfileUpdateAPI
    )

app_name = 'profile'

urlpatterns = [
    url(r'^profile/$', ProfileQueryAPIView.as_view(), name='profile'),
    url(r'^profile/update/(?P<pk>\d+)/$', ProfileUpdateAPI.as_view(), name='update_profile'),
]
