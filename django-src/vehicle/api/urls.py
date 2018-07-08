from django.urls import path, re_path

from .views import (
    CarDatabaseAPI,
    UpdateCarDatabaseAPI,
    UserCarDatabaseAPI
)

app_name = 'vehicle'

urlpatterns = [
    path('vehicle/', CarDatabaseAPI.as_view(), name='vehicle'),
    path('vehicle/list/', UserCarDatabaseAPI.as_view(), name='vehicle_list'),   
    path('vehicle/update/<int:pk>/', UpdateCarDatabaseAPI.as_view(), name='update_vehicle'),
]