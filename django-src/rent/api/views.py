# from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status

from rest_framework.filters import (
        SearchFilter,
        OrderingFilter,
    )
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    DestroyAPIView,
    ListAPIView, 
    UpdateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    RetrieveUpdateDestroyAPIView
    )

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,

    )

from rent.models import ParkingForRent

from .serializers import (
    ParkingForRentSerializer, 
    )

from accounts.models import User

from djoser.compat import get_user_email, get_user_email_field_name
from djoser.conf import settings
from django.conf import settings


class ParkingForRentAPI(ListCreateAPIView):
    queryset = ParkingForRent.objects.all()
    serializer_class = ParkingForRentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # add in send email function
        serializer.save(user=self.request.user)
        # check if bank details exist.

class UpdateParkingForRentAPI (RetrieveUpdateDestroyAPIView):
    queryset = ParkingForRent.objects.all()
    lookup_field = 'pk'
    serializer_class = ParkingForRentSerializer
    permission_classes = [AllowAny]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete ()
        return instance






