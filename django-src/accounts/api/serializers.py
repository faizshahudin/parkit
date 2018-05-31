from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.response import Response
from django.contrib.auth.models import AbstractUser
from rest_framework.serializers import (
    CharField,
    EmailField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError
    )

from django.core.mail import EmailMessage, BadHeaderError
from django.template import Context
from django.template.loader import get_template
from django.conf import settings
######################################################################

#from django.contrib.auth import authenticate, get_user_model
#from django.contrib.auth.password_validation import validate_password
#from django.core import exceptions as django_exceptions
#from django.db import IntegrityError, transaction
#
#from accounts.api.custom_jwt  import custom_jwt_payload_handler
#from rest_framework_jwt.utils import api_settings
#
#jwt_payload_handler = custom_jwt_payload_handler
#jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


User = get_user_model()

class UserCreateSerializer(ModelSerializer):
    email = EmailField(label='Email Address')
    class Meta:
        model = User
        abstract = True
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
            'contact',
            'password',
        )
        extra_kwargs = {"password":
                            {"write_only": True}
                            }

    def validate_email(self, value):
        data = self.get_initial()
        email = data.get("email")
        username = data.get("username")

        if username != email:
            raise ValidationError("Username & email have to match")

        user_qs = User.objects.filter(email=email)
        if user_qs.exists():
            raise ValidationError("This user has already registered.")
        return value

    def create(self, validated_data):
        first_name = validated_data['first_name']
        last_name  = validated_data['last_name']
        email      = validated_data['email']
        password   = validated_data['password']
        contact = validated_data['contact']
        username = email
        create_user = User(
                username = username,
                first_name = first_name,
                last_name = last_name,
                email = email,
                contact = contact,
            )
        create_user.set_password(password)
        create_user.save()
        #email = self.request.email
        info = 'dummy_info'
        template = get_template('register.html')
        subject = 'Thank you ' + email + ' for registering with ParkIt'
        context = ({'first_name': first_name, 'last_name':last_name, 'other_info': info,'email':email})
        content = template.render(context)
        print (email)
        msg = EmailMessage(subject, content, settings.DEFAULT_FROM_EMAIL, to=[email,])
        msg.send()
        
        return validated_data