from django.urls import path

from .views import (
    ProfileQueryAPIView,
    ProfileUpdateAPI
)

app_name = 'profile'

urlpatterns = [
    path('profile/', ProfileQueryAPIView.as_view(),name='profile'),
    path('profile/update/<int:pk>/', ProfileUpdateAPI.as_view(), name='update_profile'),
]
