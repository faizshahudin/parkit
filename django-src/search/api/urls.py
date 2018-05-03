from django.conf.urls import url
from django.contrib import admin

from .views import (
    SearchForParkingAPI,
    )

app_name = 'search'

urlpatterns = [
    url(r'^search/$', SearchForParkingAPI.as_view(), name='search'),
    url(r'^search/(?P<area>.+)/$', SearchForParkingAPI.as_view(), name='search'),
    

]
