from rest_framework import generics
from django_filters import rest_framework as filters
from myapp import Product


class ProductFilter(filters.FilterSet):
    min_price = filters.NumberFilter(name="price", lookup_expr='gte')
    max_price = filters.NumberFilter(name="price", lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['category', 'in_stock', 'min_price', 'max_price']