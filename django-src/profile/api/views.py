from drf_multiple_model.views import ObjectMultipleModelAPIView
from rent.api.serializers import ParkingForRentSerializer
from vehicle.api.serializers import CarDatabaseSerializer
from accounts.models import User
from django.contrib.auth import get_user_model
from rent.models import ParkingForRent
from vehicle.models import CarDatabase
from profile.api.serializers import UserQuerySerializer

from rest_framework.response import Response
from rest_framework import status

from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    DestroyAPIView,
    ListAPIView, 
    UpdateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    RetrieveUpdateDestroyAPIView,
    )

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,

    )

class ProfileQueryAPIView (ObjectMultipleModelAPIView):
    permission_classes = [IsAuthenticated]
    def get_querylist(self):
        user = self.request.user

        querylist = (
            {'queryset': ParkingForRent.objects.filter(user=user), 'serializer_class': ParkingForRentSerializer},
            {'queryset': CarDatabase.objects.filter(user=user), 'serializer_class': CarDatabaseSerializer},
            {'queryset': User.objects.filter(username=user), 'serializer_class': UserQuerySerializer},
        )
        return querylist

class ProfileUpdateAPI (RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(is_staff__icontains=False,is_superuser__icontains=False, is_active__icontains=True)
    lookup_field = 'pk'
    serializer_class = UserQuerySerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete ()
        return Response(instance, status=status.HTTP_410_GONE)