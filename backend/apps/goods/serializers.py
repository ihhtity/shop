from rest_framework import serializers
from .models import Category, Goods, Specification

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'parent', 'level', 'sort_order', 'icon', 'status', 'children']

    def get_children(self, obj):
        children = Category.objects.filter(parent=obj, status=1)
        return CategorySerializer(children, many=True).data

class SpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specification
        fields = ['id', 'name', 'value', 'price_offset', 'stock', 'image']

class GoodsSerializer(serializers.ModelSerializer):
    specifications = serializers.SerializerMethodField()

    class Meta:
        model = Goods
        fields = ['id', 'category', 'name', 'sku', 'description', 'images', 'price', 'original_price', 'stock', 'sales', 'is_on_sale', 'is_hot', 'is_new', 'sort_order', 'specifications']

    def get_specifications(self, obj):
        specs = Specification.objects.filter(goods=obj)
        return SpecificationSerializer(specs, many=True).data

class GoodsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goods
        fields = ['id', 'name', 'images', 'price', 'original_price', 'sales']