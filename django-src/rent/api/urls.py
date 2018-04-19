from django.conf.urls import url
from django.contrib import admin

from .views import (
    ParkingForRentAPI,
    )

app_name = 'rent'

urlpatterns = [
    url(r'^rent/$', ParkingForRentAPI.as_view(), name='rent'),

]
