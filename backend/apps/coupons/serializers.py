from rest_framework import serializers
from .models import Coupon, UserCoupon

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ['id', 'name', 'coupon_type', 'discount_amount', 'discount_rate', 'min_spend', 'total_count', 'used_count', 'per_user_limit', 'start_time', 'end_time', 'status']

class UserCouponSerializer(serializers.ModelSerializer):
    coupon = CouponSerializer(read_only=True)

    class Meta:
        model = UserCoupon
        fields = ['id', 'coupon', 'order', 'status', 'receive_time', 'used_time']

class ReceiveCouponSerializer(serializers.Serializer):
    coupon_id = serializers.IntegerField()