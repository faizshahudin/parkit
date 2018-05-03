from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
    CharField
    )

from rent.models import ParkingForRent

class SearchForParkingSerializer(ModelSerializer):
    class Meta:
        model = ParkingForRent
        fields = [
            #'id',
            # 'user',
            #'slug',
            'condo',
            'area',
            'new_area',
            'bay',
            'type_select',
            'dedicated',
            'time',
            'new_time',
            'price',
            'timestamp',
            'new_price'
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