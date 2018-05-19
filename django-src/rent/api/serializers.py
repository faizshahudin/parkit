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
            'property_name',
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
    def validate(self,data):
        area = data.get('area', None)
        new_area = data.get('new_area', None)
        time = data.get('time', None)
        new_time = data.get('new_time', None)
        price = data.get('price', None)
        new_price = data.get('new_price', None)

        if area is "Other" and new_area is "":
            raise ValidationError("User Input Required")     
        if area is not "Other" and new_area is "":
            data["new_area"] = data["area"]

        if time is "Any" and new_time is "":
            raise ValidationError("User Input Required")     
        if time is not "Any" and new_time is "":
            data["new_time"] = data["time"]

        if price is "Any" and new_price is "":
            raise ValidationError("User Input Required")     
        if price is not "Any" and new_price is "":
            data["new_price"] = data["price"]
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