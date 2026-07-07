from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from apps.orders.models import Order
from apps.goods.models import Goods, Specification

@shared_task
def cancel_timeout_order():
    timeout_time = timezone.now() - timedelta(minutes=30)
    orders = Order.objects.filter(status=0, pay_status=0, created_at__lte=timeout_time)
    for order in orders:
        order.status = 4
        order.cancel_time = timezone.now()
        order.save()
        for item in order.orderitem_set.all():
            goods = Goods.objects.filter(id=item.goods_id).first()
            if goods:
                goods.stock += item.quantity
                goods.sales -= item.quantity
                goods.save()
            if item.spec:
                spec = Specification.objects.filter(id=item.spec_id).first()
                if spec:
                    spec.stock += item.quantity
                    spec.save()

@shared_task
def sync_order_status():
    orders = Order.objects.filter(status__in=[0, 1], pay_status=0)
    for order in orders:
        pass

@shared_task
def generate_daily_report():
    today = timezone.now().date()
    orders = Order.objects.filter(created_at__date=today, pay_status=1)
    total_amount = orders.aggregate(total__sum=('pay_amount'))['total__sum'] or 0
    report_data = {
        'date': str(today),
        'order_count': orders.count(),
        'total_amount': float(total_amount)
    }

@shared_task
def send_order_notification(order_id):
    order = Order.objects.filter(id=order_id).first()
    if order:
        pass

@shared_task
def send_payment_notification(order_id):
    order = Order.objects.filter(id=order_id).first()
    if order:
        pass