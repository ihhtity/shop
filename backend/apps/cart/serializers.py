from rest_framework import serializers

class CartItemSerializer(serializers.Serializer):
    goods_id = serializers.IntegerField()
    spec_id = serializers.IntegerField(allow_null=True)
    quantity = serializers.IntegerField()

class CartSerializer(serializers.Serializer):
    items = CartItemSerializer(many=True)

class UpdateCartSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    quantity = serializers.IntegerField()