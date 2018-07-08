from rest_framework.serializers import (
    ModelSerializer,
    ValidationError,
)

from django.conf import settings

from vehicle.models import CarDatabase

class CarDatabaseSerializer(ModelSerializer):

    class Meta:
        model = CarDatabase
        fields = [
            'id',
            'user',
            'car_model',
            'car_registery',
            'parked_at',
            'start_date'
        ]

    """ Car Registration validation
    Checks to see if vehicle has been registered, error out if it has
    """
    def validate(self, value):
        data = self.get_initial()
        car_regsiter = data.get("car_registery")
        user_qs = CarDatabase.objects.filter(car_registery__iexact=car_regsiter)
        if user_qs.exists():
            raise ValidationError("Vehicle Has Already been registered")
        return value
            
