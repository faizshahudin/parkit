from django.conf.urls import url
from django.contrib import admin

from .views import (
    ParkingForRentAPI,
    UpdateParkingForRentAPI,
#    EmailNotificationAPI
    )

app_name = 'rent'

urlpatterns = [
    url(r'^rent/$', ParkingForRentAPI.as_view(), name='rent'),
#    url(r'^rent/email/$', EmailNotificationAPI.as_view(), name='email'),
    url(r'^rent/update/(?P<pk>\d+)/$', UpdateParkingForRentAPI.as_view(), name='update_rent'),
]
