from django.db.models import (
    Q
)


from rest_framework.filters import (
        SearchFilter,
        OrderingFilter,
    )

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    DestroyAPIView,
    ListAPIView, 
    UpdateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView
    )

from rest_framework.response import Response

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,

    )

from rent.models import (
    ParkingForRent,
)

from search.models import ParkingEnquiry

from .serializers import (
    SearchForParkingSerializer,
    ParkingEnquirySerializer
    )

class SearchForParkingAPI(ListAPIView):
    queryset = ParkingForRent.objects.all()
    serializer_class = SearchForParkingSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['db_area', 'db_status']

    def get_queryset(self, *args, **kwargs):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset_list = ParkingForRent.objects.all()
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.OrderingFilter(
                Q(db_area__icontains=query) | Q(status__icontains=query)
            ).distinct()
        return queryset_list

class ParkingEnquiryAPI(CreateAPIView):
    serializer_class = ParkingEnquirySerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)












