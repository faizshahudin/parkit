from django.db.models import (
    Q
)


from rest_framework.filters import (
        SearchFilter,
        OrderingFilter,
    )

from django_filters.rest_framework import DjangoFilterBackend

from django.core.mail import EmailMessage, BadHeaderError
from django.conf import settings

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


from django.core.mail import EmailMessage, send_mail
from django.template import Context
from django.template.loader import get_template
from rest_framework import status

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


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        email = serializer.data['db_email']
        contact = serializer.data['db_contact']
        office = serializer.data['db_office']
        location = serializer.data['db_location']
        first_name = serializer.data['first_name']
        last_name = serializer.data['last_name']

        #email = self.request.email
        template = get_template('enquiry.html')
        subject = 'Thank you for your enquiry with ParkIt!'
        context = ({'location': location, 'first_name':first_name, 'last_name':last_name})
        content = template.render(context)
        msg = EmailMessage(subject, content, settings.DEFAULT_FROM_EMAIL, to=[email,])
        msg.content_subtype = "html"
        msg.send()
        send_mail(
            'Alert! New parking enquiry from ' + email ,
            "======================================\nUser : " + email + "\nContact : " + contact + "\nOffice : " + office + "\nLocation : " + location + "\n======================================",
            settings.DEFAULT_FROM_EMAIL,
            ['support@parkitmy.com'],
            fail_silently=False,
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

#    def perform_create(self, serializer):
#        serializer.save(user=self.request.user)









