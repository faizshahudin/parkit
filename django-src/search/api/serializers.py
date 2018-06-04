from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
    CharField
    )

from rent.models import ParkingForRent
from search.models import ParkingEnquiry

class SearchForParkingSerializer(ModelSerializer):
    class Meta:
        model = ParkingForRent
        fields = [
            'id',
            'user',
            #'slug',
            'db_property',
            'db_area',
            'db_type',
            'db_reserved',
            'db_period',
            'db_price',
            'db_status',
            'db_longitude',
            'db_latitude',
            'db_address',
            'image',
            'timestamp'
            
        ]

class ParkingEnquirySerializer(ModelSerializer):
    class Meta:
        model = ParkingEnquiry
        fields = [
            'id',
            'db_office',
            'db_period',
            'db_price',
            'db_status',
            'db_longitude',
            'db_latitude',
            'db_location'
        ]

     
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