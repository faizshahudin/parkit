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
#       user = self.request.user
#       print (user)
#       #email = self.request.email
#       info = 'dummy_info'
#       template = get_template('password_reset_email.html')
#       subject = 'test confimr rent'
#       context = Context([{'user': user, 'other_info': info}])
#       content = template.render(context)
#       if not user.email:
#           raise BadHeaderError('No email address given for {0}'.format(user))
#       msg = EmailMessage(subject, content, settings.DEFAULT_FROM_EMAIL, to=['support@parkitmy.com',])
#       msg.send()

#class EmailNotificationAPI(ListAPIView):
#    queryset = User.objects.all()
#    serializer_class = UserQuerySerializer
#    permission_classes = [AllowAny]
#    
#    def get_queryset(self):
#        user = User.objects.filter(username=self.request.user)
#        #email = self.request.email
#        
#        print (user)
#        #return queryset    

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






