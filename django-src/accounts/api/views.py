from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework_jwt.utils import api_settings
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from accounts.api.custom_jwt  import custom_jwt_payload_handler
from .serializers import UserCreateSerializer

User = get_user_model()

jwt_payload_handler = custom_jwt_payload_handler
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        user = self.queryset.get(username=serializer.data['username'])
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        content = {'token':token , 'create_user':serializer.data}
        return Response(content,status=status.HTTP_201_CREATED, headers=headers)