from django.contrib.contenttypes.models import ContentType
from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractUser

from rest_framework.serializers import (
    CharField,
    EmailField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError
    )
    
User = get_user_model()


class UserQuerySerializer(ModelSerializer):
    class Meta:
        model = User
        abstract = True
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'image',
            'contact',
        ]