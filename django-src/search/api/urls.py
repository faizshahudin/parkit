from django.conf.urls import url
from django.contrib import admin

from .views import (
    SearchForParkingAPI,
    ParkingEnquiryAPI
    )

app_name = 'search'

urlpatterns = [
    url(r'^search/$', SearchForParkingAPI.as_view(), name='search'),
    url(r'^enquiry/$', ParkingEnquiryAPI.as_view(), name='enquiry'),
    url(r'^search/(?P<area>.+)/$', SearchForParkingAPI.as_view(), name='search'),
    

]
