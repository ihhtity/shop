from rest_framework import serializers
from .models import Cart
from apps.goods.models import Goods, Specification


class CartSerializer(serializers.ModelSerializer):
    goods_name = serializers.SerializerMethodField()
    goods_image = serializers.SerializerMethodField()
    spec_name = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    subtotal = serializers.SerializerMethodField()
    goods_id = serializers.IntegerField(source='goods.id', read_only=True)
    spec_id = serializers.IntegerField(source='spec.id', read_only=True, allow_null=True)

    class Meta:
        model = Cart
        fields = ['id', 'goods', 'goods_id', 'goods_name', 'goods_image', 'spec', 'spec_id', 'spec_name', 'price', 'quantity', 'subtotal']

    def get_goods_name(self, obj):
        return obj.goods.name

    def get_goods_image(self, obj):
        if obj.goods.images:
            return obj.goods.images[0]
        return ''

    def get_spec_name(self, obj):
        if obj.spec:
            return f'{obj.spec.name}: {obj.spec.value}'
        return ''

    def get_price(self, obj):
        price = float(obj.goods.price)
        if obj.spec:
            price += float(obj.spec.price_offset)
        return price

    def get_subtotal(self, obj):
        return self.get_price(obj) * obj.quantity


class CartCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['goods', 'spec', 'quantity']
        extra_kwargs = {'quantity': {'default': 1}}


class CartUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['quantity']