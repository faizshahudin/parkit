from django.conf import settings

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import AbstractUser

from django.contrib.sites.models import Site

from django.core.mail import EmailMessage, BadHeaderError, send_mail
from django.db.models import Q
from django.template import Context
from django.template.loader import get_template

from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from rest_framework.serializers import (
    EmailField,
    ModelSerializer,
    ValidationError,
    Serializer
)
######################################################################

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
        contact    = validated_data['contact']
        username   = email
        create_user = User(
                username = username,
                first_name = first_name,
                last_name = last_name,
                email = email,
                contact = contact,
            )
        create_user.set_password(password)
        create_user.save()
        template = get_template('register.html')
        subject = 'Hey ' + first_name + ' ' + last_name + ' ! Welcome to ParkIt!'
        context = ({'first_name': first_name, 'last_name':last_name,'email':email})
        content = template.render(context)
        msg = EmailMessage(subject, content, settings.DEFAULT_FROM_EMAIL, to=[email,])
        msg.content_subtype = "html"
        msg.send()
        send_mail(
            'Alert! New User Registered ' + first_name + last_name ,
            "======================================\nUser : " + email + "\nFirst Name : " + first_name + "\nLast Name : " + last_name + "\nContact : " + contact + "\n======================================",
            settings.DEFAULT_FROM_EMAIL,
            ['support@parkitmy.com'],
            fail_silently=False,
          )
        return validated_data

class PasswordResetSerializer(Serializer):
    """
    Serializer for requesting a password reset e-mail.
    """
    email = EmailField()

    def get_users(self, email):
            """Given an email, return matching user(s) who should receive a reset.

            This allows subclasses to more easily customize the default policies
            that prevent inactive users and users with unusable passwords from
            resetting their password.

            """
            active_users = get_user_model()._default_manager.filter(
                email__iexact=email, is_active=True)
            return (u for u in active_users if u.has_usable_password())

    def validate_email(self, value):
        data = self.get_initial()
        email = data.get("email")
        user_qs = User.objects.filter(email__iexact=email,is_active=True)
        if not user_qs.exists():
            raise ValidationError("Invalid email address! Does not exis")
        return value

    def save(self,token_generator=default_token_generator,):
        data = self.get_initial()
        email = data.get("email")

        for user in self.get_users(email):
            current_site = Site.objects.get_current()
            template = get_template('reset_password.html')
            subject  = 'Forgot Password Request from ' + email
            context  = {
                'user'      : user,
                'email'     : user.email,
                'first_name': user.first_name,
                'last_name' : user.last_name,
                'site_name' : current_site,
                'uid'       : urlsafe_base64_encode(force_bytes(user.pk)),
                'token'     : token_generator.make_token(user),
            }
            content = template.render(context)
            msg = EmailMessage(subject, content, settings.DEFAULT_FROM_EMAIL, to=[email,])
            msg.content_subtype = "html"
            msg.send()
