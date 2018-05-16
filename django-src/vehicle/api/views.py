# from django.db.models import Q


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
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)













