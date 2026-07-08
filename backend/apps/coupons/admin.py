from django.contrib import admin
from .models import Coupon, UserCoupon


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'coupon_type', 'discount_amount', 'discount_rate', 'min_spend', 'total_count', 'used_count', 'status']
    search_fields = ['name']
    list_filter = ['coupon_type', 'status']
    list_per_page = 20
    fieldsets = (
        ('基本信息', {'fields': ('name', 'coupon_type')}),
        ('优惠设置', {'fields': ('discount_amount', 'discount_rate', 'min_spend')}),
        ('发放设置', {'fields': ('total_count', 'used_count', 'per_user_limit')}),
        ('时间设置', {'fields': ('start_time', 'end_time')}),
        ('状态', {'fields': ('status',)}),
    )


@admin.register(UserCoupon)
class UserCouponAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'coupon', 'order', 'status', 'receive_time', 'used_time']
    search_fields = ['user__username', 'coupon__name']
    list_filter = ['status']
    list_per_page = 20