from django.urls import path, re_path

from .views import (
    SearchForParkingAPI,
    ParkingEnquiryAPI
)

app_name = 'search'

urlpatterns = [
    path('search/', SearchForParkingAPI.as_view(), name='search'),
    path('enquiry/', ParkingEnquiryAPI.as_view(), name='enquiry'),
    re_path(r'^search/(?P<area>.+)/$', SearchForParkingAPI.as_view(), name='search'),
]