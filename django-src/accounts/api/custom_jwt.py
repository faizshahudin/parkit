from datetime import datetime
from calendar import timegm
from rest_framework_jwt.settings import api_settings

def custom_jwt_payload_handler (user):
    """ Custom payload handler
    Token encrypts the dictionary returned by this function, and can be decoded by rest_framework_jwt.utils.jwt_decode_handler
    """
    return {
        'pk': user.pk,
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'exp': datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA,
        'orig_iat': timegm ( datetime.utcnow().utctimetuple()
        )
    }