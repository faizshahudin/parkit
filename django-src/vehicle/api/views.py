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
    RetrieveUpdateAPIView
    )

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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

#   def perform_create(self, serializer):
#       serializer.save(user=self.request.user)









