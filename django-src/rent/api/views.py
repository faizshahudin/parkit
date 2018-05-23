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

from django.core.mail import EmailMessage
from django.template import Context
from django.template.loader import get_template


class ParkingForRentAPI(ListCreateAPIView):
    queryset = ParkingForRent.objects.all()
    serializer_class = ParkingForRentSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        # add in send email function
        #user = self.request.user
        #email = self.request.email
        #template = get_template('myapp/email.html')
        #context = Context({'user': user, 'other_info': info})
        #content = template.render(context)
        #if not user.email:
        #    raise BadHeaderError('No email address given for {0}'.format(user))
        #msg = EmailMessage(subject, content, settings.DEFAULT_FROM_EMAIL, to=[email,])
        #msg.send()

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






