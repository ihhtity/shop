from django.contrib import admin
from .models import PaymentRecord


@admin.register(PaymentRecord)
class PaymentRecordAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'transaction_no', 'pay_type', 'amount', 'status', 'pay_time']
    search_fields = ['order__order_no', 'transaction_no']
    list_filter = ['status', 'pay_type']
    list_per_page = 20