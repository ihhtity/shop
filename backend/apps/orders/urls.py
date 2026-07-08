from django.urls import path
from .views import *

urlpatterns = [
    path('', OrderListView.as_view(), name='order_list'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order_detail'),
    path('create/', CreateOrderView.as_view(), name='create_order'),
    path('<int:pk>/cancel/', CancelOrderView.as_view(), name='cancel_order'),
    path('<int:pk>/confirm/', ConfirmOrderView.as_view(), name='confirm_order'),
    
    path('user/orders/', UserOrderListView.as_view(), name='user_order_list'),
    path('user/orders/create/', UserOrderCreateView.as_view(), name='user_order_create'),
    path('user/orders/<int:pk>/cancel/', UserCancelOrderView.as_view(), name='user_order_cancel'),
    path('user/orders/<int:pk>/confirm/', UserConfirmOrderView.as_view(), name='user_order_confirm'),
    
    path('admin/orders/', AdminOrderListView.as_view(), name='admin_order_list'),
    path('admin/orders/<int:pk>/', AdminOrderUpdateView.as_view(), name='admin_order_update'),
    path('admin/orders/<int:pk>/status/', AdminOrderStatusUpdateView.as_view(), name='admin_order_status'),
    path('admin/orders/<int:pk>/pay_status/', AdminOrderPayStatusUpdateView.as_view(), name='admin_order_pay_status'),
    path('admin/orders/<int:pk>/delete/', AdminOrderDeleteView.as_view(), name='admin_order_delete'),
]