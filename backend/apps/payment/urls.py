from django.urls import path
from .views import PrepayView, WechatNotifyView, AlipayNotifyView, PaymentStatusView

urlpatterns = [
    path('prepay/', PrepayView.as_view(), name='prepay'),
    path('notify/wechat/', WechatNotifyView.as_view(), name='wechat_notify'),
    path('notify/alipay/', AlipayNotifyView.as_view(), name='alipay_notify'),
    path('status/<int:order_id>/', PaymentStatusView.as_view(), name='payment_status'),
]