from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    goods_id = serializers.IntegerField(source='goods.id', read_only=True)
    spec_id = serializers.IntegerField(source='spec.id', read_only=True, allow_null=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'goods_id', 'goods', 'goods_name', 'goods_image', 'spec_id', 'spec', 'spec_name', 'price', 'quantity', 'subtotal']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'order_no', 'user', 'address', 'total_amount', 'discount_amount', 'pay_amount', 'status', 'pay_status', 'pay_type', 'pay_time', 'ship_time', 'finish_time', 'cancel_time', 'remark', 'items']

class CreateOrderSerializer(serializers.Serializer):
    address_id = serializers.IntegerField()
    items = serializers.ListField(child=serializers.DictField())
    remark = serializers.CharField(allow_blank=True, required=False)
    coupon_id = serializers.IntegerField(allow_null=True, required=False)