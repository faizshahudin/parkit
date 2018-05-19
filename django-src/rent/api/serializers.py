from django.utils.crypto import get_random_string

from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
    CharField
)

from rent.models import ParkingForRent

class ParkingForRentSerializer(ModelSerializer):
    class Meta:
        model = ParkingForRent
        fields = [
            'db_property',
            'db_area',
            'sel_area',
            'db_type',
            'db_reserved',
            'db_period',
            'sel_period',
            'db_price',
            'sel_price',
            'db_status',
            'timestamp',
            'serial_no',
        ]

    def validate(self,data):
        sel_area   = data.get('sel_area', None)
        db_area    = data.get('db_area', None)
        sel_period = data.get('sel_period', None)
        db_period  = data.get('db_period', None)
        sel_price  = data.get('sel_price', None)
        db_price   = data.get('db_price', None)
        serial_no  = data.get('serial_no', None)
        unique_id  = get_random_string(length=10)

        if sel_area is "Other" and db_area is "":
            raise ValidationError("User Input Required")     
        if sel_area is not "Other" and db_area is "":
            data["db_area"] = data["sel_area"]

        if sel_period is "Any" and db_period is "":
            raise ValidationError("User Input Required")     
        if sel_period is not "Any" and db_period is "":
            data["db_period"] = data["sel_period"]

        if sel_price is "Any" and db_price is "":
            raise ValidationError("User Input Required")     
        if sel_price is not "Any" and db_price is "":
            data["db_price"] = data["sel_price"]
        
        data["serial_no"] = serial_no + '#' + unique_id
        
        return data
            
""""
from posts.models import Post
from posts.api.serializers import PostDetailSerializer


data = {
    "title": "Yeahh buddy",
    "content": "New content",
    "publish": "2016-2-12",
    "slug": "yeah-buddy",
    
}

obj = Post.objects.get(id=2)
new_item = PostDetailSerializer(obj, data=data)
if new_item.is_valid():
    new_item.save()
else:
    print(new_item.errors)


"""