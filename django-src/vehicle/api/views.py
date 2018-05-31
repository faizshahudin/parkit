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

from django.core.mail import EmailMessage, BadHeaderError
from django.template import Context
from django.template.loader import get_template
from django.conf import settings

from vehicle.models import CarDatabase

from accounts.models import User

from .serializers import (
    CarDatabaseSerializer, 
    )

from django.core.mail import EmailMessage
from django.template import Context
from django.template.loader import get_template

class CarDatabaseAPI(ListCreateAPIView):
    queryset = CarDatabase.objects.all()
    serializer_class = CarDatabaseSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        user = self.request.user
        first_name = User.objects.get(username=user).first_name
        last_name = User.objects.get(username=user).last_name
        email = User.objects.get(username=user).email
        info = 'dummy_info'
        template = get_template('vehicle.html')
        subject = 'Thank you ' + email + ' for parking with ParkIt'
        context = ({'first_name': first_name, 'last_name':last_name, 'other_info': info, 'email':email})
        content = template.render(context)
        if not user.email:
            raise BadHeaderError('No email address given for {0}'.format(user))
        msg = EmailMessage(subject, content, settings.DEFAULT_FROM_EMAIL, to=[email,])
        msg.send()

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







