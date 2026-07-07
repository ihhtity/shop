from django.contrib import admin
from .models import Order, OrderItem

class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'order_no', 'user', 'total_amount', 'pay_amount', 'status', 'pay_status', 'created_at']
    search_fields = ['order_no', 'user__username', 'user__phone']
    list_filter = ['status', 'pay_status', 'pay_type']

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'goods', 'goods_name', 'price', 'quantity', 'subtotal']
    search_fields = ['order__order_no', 'goods__name']

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)