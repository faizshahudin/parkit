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

        user_qs = User.objects.filter(email=email)
        if user_qs.exists():
            raise ValidationError("This user has already registered.")
        return value

    def create(self, validated_data):
        username   = validated_data['username']
        first_name = validated_data['first_name']
        last_name  = validated_data['last_name']
        email      = validated_data['email']
        password   = validated_data['password']
        contact = validated_data['contact']
        create_user = User(
                username = username,
                first_name = first_name,
                last_name = last_name,
                email = email,
                contact = contact,
            )
        create_user.set_password(password)
        create_user.save()
        # add in send welcome email
        return validated_data