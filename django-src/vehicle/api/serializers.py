from rest_framework.serializers import (
    HyperlinkedIdentityField,
    ModelSerializer,
    SerializerMethodField,
    ValidationError,
    CharField
    )

from django.conf import settings

from vehicle.models import CarDatabase

class CarDatabaseSerializer(ModelSerializer):

    class Meta:
        model = CarDatabase
        fields = [
            'id',
            #'slug',
            'user',
            'car_model',
            'car_registery',
            'occupied_by',
        ]

#    def validate(self,data):
#        pass
            
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