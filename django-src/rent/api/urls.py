from django.conf.urls import url
from django.contrib import admin

from .views import (
    ParkingForRentAPI,
    UpdateParkingForRentAPI
    )

app_name = 'rent'

urlpatterns = [
    url(r'^rent/$', ParkingForRentAPI.as_view(), name='rent'),
    url(r'^rent/update/(?P<pk>\d+)/$', UpdateParkingForRentAPI.as_view(), name='update_rent'),
]
