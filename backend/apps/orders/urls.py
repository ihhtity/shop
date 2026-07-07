from django.urls import path
from .views import *

urlpatterns = [
    path('', OrderListView.as_view(), name='order_list'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order_detail'),
    path('create/', CreateOrderView.as_view(), name='create_order'),
    path('<int:pk>/cancel/', CancelOrderView.as_view(), name='cancel_order'),
    path('<int:pk>/confirm/', ConfirmOrderView.as_view(), name='confirm_order'),
    path('admin/orders/', AdminOrderListView.as_view(), name='admin_order_list'),
    path('admin/orders/<int:pk>/', AdminOrderUpdateView.as_view(), name='admin_order_update'),
]