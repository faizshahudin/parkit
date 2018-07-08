# from django.db.models import Q

from rest_framework.response import Response
from rest_framework import status
from django.core.mail import EmailMessage, BadHeaderError
from django.conf import settings

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
    
from profile.api.serializers import UserQuerySerializer

from django.contrib.sites.models import Site
from accounts.models import User
from django.core.mail import EmailMessage, send_mail
from django.template import Context
from django.template.loader import get_template

class ParkingForRentAPI(ListCreateAPIView):
    queryset = ParkingForRent.objects.all()
    serializer_class = ParkingForRentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        # add in send email function
        user = self.request.user
        first_name = User.objects.get(username=user).first_name
        last_name = User.objects.get(username=user).last_name
        email = User.objects.get(username=user).email
        contact = User.objects.get(username=user).contact
        current_site = Site.objects.get_current()
        
        area = serializer.data['db_area']
        timestamp = serializer.data['timestamp']
        price = serializer.data['db_price']
        period = serializer.data['db_period']
        template = get_template('success_rent_email.html')
        subject = 'Thank you ' + first_name + ' ' + last_name + ' for listing your carpark with ParkIt at ' + area
        context = ({'first_name': first_name, 'last_name':last_name, 'email':email, 'area':area, 'site_name':current_site})
        content = template.render(context)
        if not user.email:
            raise BadHeaderError('No email address given for {0}'.format(user))
        msg = EmailMessage(subject, content, settings.DEFAULT_FROM_EMAIL, to=[email,])
        msg.content_subtype = "html"
        msg.send()
        send_mail(
            'Alert! New listed parking from ' + email ,
            "======================================\nUser : " + email + "\nListed Parking : " + area + "\nContact        : " + contact + "\nRent Price : " + price + "\nRent Period : " + period + "\nListed on : " + timestamp + "\n======================================",
            settings.DEFAULT_FROM_EMAIL,
            ['support@parkitmy.com'],
            fail_silently=False,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateParkingForRentAPI (RetrieveUpdateDestroyAPIView):
    queryset = ParkingForRent.objects.all()
    lookup_field = 'pk'
    serializer_class = ParkingForRentSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        instance.delete ()
        return Response(instance, status=status.HTTP_410_GONE)






