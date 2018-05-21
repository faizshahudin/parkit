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

class UserCreateSerializer(ModelSerializer):
    email = EmailField(label='Email Address')
    class Meta:
        model = User
        abstract = True
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'contact',
            'password',
        ]
        extra_kwargs = {"password":
                            {"write_only": True}
                            }
    def validate(self, data):
        # email = data['email']
        # user_qs = User.objects.filter(email=email)
        # if user_qs.exists():
        #     raise ValidationError("This user has already registered.")
        return data

    def validate_email(self, value):
        data = self.get_initial()
        email = data.get("email")

        user_qs = User.objects.filter(email=email)
        if user_qs.exists():
            raise ValidationError("This user has already registered.")
        return value

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        password = validated_data['password']
        contact = validated_data['contact']
        user_obj = User(
                username = username,
                email = email,
                contact = contact,
            )
        
        user_obj.set_password(password)
        user_obj.save()
        return validated_data



#lass UserLoginSerializer(ModelSerializer):
#    username = CharField()
#   token = CharField(allow_blank=True, read_only=True)
#   email = EmailField(required=False, allow_blank=True)
#   #username = CharField(required=False, allow_blank=True)
#   class Meta:
#       model = User
#       fields = [
#           #'username',
#           'email',
#           'password',
#           'token',     
#       ]
#       extra_kwargs = {"password":
#                           {"write_only": True}
#                           }
#   def validate(self, data):
#       email = data.get('email', None)
#       username = data.get('username', None)
#       password = data["password"]
#       if not email and not username:
#           raise ValidationError("Please Fill In Email")
#       user = User.objects.filter(
#           Q(email=email)|
#           Q(username=username)
#       ).distinct()
#       if user.exists() and user.count() == 1:
#           user_field = user.first()
#       else:
#           raise ValidationError("This email is not valid")
#       
#       if user_field:
#           if not user_field.check_password(password):
#               raise ValidationError("Incorrect Credentials")
#
#       # data["token"] = "RANDOM TOKEN"
#       #email = data['email']
#       #user_qs = User.objects.filter(email=email)
#       # if user_qs.exists():
#       #     raise ValidationError("This user has already registered.")
#       return data
