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

from django.contrib.sites.models import Site
from django.core.mail import EmailMessage, BadHeaderError
from django.template import Context
from django.template.loader import get_template
from django.conf import settings

from vehicle.models import CarDatabase
from rent.models import ParkingForRent


from accounts.models import User

from .serializers import (
    CarDatabaseSerializer,
    )

from rent.api.serializers import ParkingForRentSerializer

from django.core.mail import EmailMessage, send_mail
from django.template import Context
from django.template.loader import get_template

class CarDatabaseAPI(ListCreateAPIView):
    queryset = CarDatabase.objects.all()
    serializer_class = CarDatabaseSerializer
    serializer_class_rent = ParkingForRentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        user = self.request.user
        first_name = User.objects.get(username=user).first_name
        last_name = User.objects.get(username=user).last_name
        email = User.objects.get(username=user).email
        contact = User.objects.get(username=user).contact
        parked_at = serializer.data['parked_at']
        current_site = Site.objects.get_current()

        if parked_at:
            park_property = ParkingForRent.objects.get(pk=parked_at).db_property
            ParkingForRent.objects.filter(pk=parked_at).update(occupied_by=user)
            ParkingForRent.objects.filter(pk=parked_at).update(db_status='Enquiry')            
            template = get_template('vehicle.html')
            subject = 'Thank you ' + first_name + ' ' + last_name + ' for parking with ParkIt'
            context = ({'first_name': first_name, 'last_name':last_name, 'email':email, 'site_name':current_site})
            content = template.render(context)
            if not user.email:
                raise BadHeaderError('No email address given for {0}'.format(user))
            msg = EmailMessage(subject, content, settings.DEFAULT_FROM_EMAIL, to=[email,])
            msg.content_subtype = "html"
            msg.send()
            send_mail(
                'Alert! New parking match from ' + email,
                "======================================\nUser : " + email + "\nContact : " + contact + "\nLocation : " + park_property + "\n======================================",
                settings.DEFAULT_FROM_EMAIL,
                ['support@parkitmy.com'],
                fail_silently=False,
            )
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UpdateCarDatabaseAPI (RetrieveUpdateDestroyAPIView):
    queryset = CarDatabase.objects.all()
    lookup_field = 'pk'
    serializer_class = CarDatabaseSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete ()
        return Response(instance, status=status.HTTP_410_GONE)



class UserCarDatabaseAPI (ListAPIView):
    serializer_class = CarDatabaseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        user = self.request.user
        queryset_list = CarDatabase.objects.all().filter(user=user)
        return queryset_list



