from django.conf.urls import url
from django.contrib import admin

from .views import (
    CarDatabaseAPI,
    )

app_name = 'vehicle'

urlpatterns = [
    url(r'^vehicle/$', CarDatabaseAPI.as_view(), name='vehicle'),

]