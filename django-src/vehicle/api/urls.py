from django.conf.urls import url
from django.contrib import admin

from .views import (
    CarDatabaseAPI,
    UpdateCarDatabaseAPI,
    )

app_name = 'vehicle'

urlpatterns = [
    url(r'^vehicle/$', CarDatabaseAPI.as_view(), name='vehicle'),
    url(r'^vehicle/update/(?P<pk>\d+)/$', UpdateCarDatabaseAPI.as_view(), name='update_vehicle'),
]