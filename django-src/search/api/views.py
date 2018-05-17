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

from .serializers import (
    SearchForParkingSerializer, 
    )

class SearchForParkingAPI(ListAPIView):
    queryset = ParkingForRent.objects.all()
    serializer_class = SearchForParkingSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['new_area', 'status']

    def get_queryset(self, *args, **kwargs):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset_list = ParkingForRent.objects.all()
        query = self.request.GET.get("q")
        if query:
            queryset_list = queryset_list.filter(
                Q(new_area__icontains=query) | Q(status__icontains=query)
            ).distinct()

        return queryset_list













