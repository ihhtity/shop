from django.contrib import admin
from .models import Coupon, UserCoupon

class CouponAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'coupon_type', 'discount_amount', 'min_spend', 'total_count', 'used_count', 'status']
    search_fields = ['name']
    list_filter = ['coupon_type', 'status']

class UserCouponAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'coupon', 'order', 'status', 'receive_time']
    search_fields = ['user__username', 'coupon__name']
    list_filter = ['status']

admin.site.register(Coupon, CouponAdmin)
admin.site.register(UserCoupon, UserCouponAdmin)