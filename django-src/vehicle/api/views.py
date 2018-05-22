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
    RetrieveUpdateDestroyAPIView,
    )

from rest_framework.mixins import DestroyModelMixin, UpdateModelMixin

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,

    )

from vehicle.models import CarDatabase

from .serializers import (
    CarDatabaseSerializer, 
    )

class CarDatabaseAPI(ListCreateAPIView):
    queryset = CarDatabase.objects.all()
    serializer_class = CarDatabaseSerializer
    permission_classes = [AllowAny]

#   def form_valid(self, form):
#       if self.request.user.is_authenticated():
#           form.instance.user = self.request.user

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

#   def perform_create(self, serializer):
#       serializer.save(user=self.request.user)

class UpdateCarDatabaseAPI (RetrieveUpdateDestroyAPIView):
    queryset = CarDatabase.objects.all()
    lookup_field = 'pk'
    serializer_class = CarDatabaseSerializer
    permission_classes = [AllowAny]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete ()
        return instance

#    def put(self, request, *args, **kwargs):
#        return self.update(request, *args, **kwargs)
#
#    def delete(self, request, *args, **kwargs):
#        return self.destroy(request, *args, **kwargs)

#   def perform_create(self, serializer):
#       serializer.save(user=self.request.user)







