from django.contrib import admin
from .models import Order, OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'order_no', 'user', 'total_amount', 'pay_amount', 'status', 'pay_status', 'created_at']
    search_fields = ['order_no', 'user__username']
    list_filter = ['status', 'pay_status', 'pay_type', 'created_at']
    list_per_page = 20
    readonly_fields = ['order_no', 'created_at', 'updated_at']
    fieldsets = (
        ('基本信息', {'fields': ('order_no', 'user', 'address')}),
        ('金额信息', {'fields': ('total_amount', 'discount_amount', 'pay_amount')}),
        ('状态信息', {'fields': ('status', 'pay_status', 'pay_type')}),
        ('时间信息', {'fields': ('pay_time', 'ship_time', 'finish_time', 'cancel_time')}),
        ('其他', {'fields': ('remark',)}),
    )


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'goods', 'goods_name', 'price', 'quantity', 'subtotal']
    search_fields = ['order__order_no', 'goods__name', 'goods_name']
    list_filter = ['order']
    list_per_page = 20