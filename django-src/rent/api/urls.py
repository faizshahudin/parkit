from django.conf.urls import url
from django.urls import path, re_path

from .views import (
    ParkingForRentAPI,
    UpdateParkingForRentAPI,
)

app_name = 'rent'

urlpatterns = [
    path('rent/', ParkingForRentAPI.as_view(), name='rent'),
    path('rent/update/<int:pk>/', UpdateParkingForRentAPI.as_view(), name='update_rent'),
]
