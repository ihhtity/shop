from django.urls import path
from .views import *

urlpatterns = [
    path('', CouponListView.as_view(), name='coupon_list'),
    path('<int:pk>/', CouponDetailView.as_view(), name='coupon_detail'),
    path('<int:pk>/receive/', ReceiveCouponView.as_view(), name='receive_coupon'),
    path('my/', MyCouponListView.as_view(), name='my_coupon_list'),
    path('admin/coupons/', AdminCouponListView.as_view(), name='admin_coupon_list'),
    path('admin/coupons/create/', AdminCouponCreateView.as_view(), name='admin_coupon_create'),
    path('admin/coupons/<int:pk>/', AdminCouponUpdateView.as_view(), name='admin_coupon_update'),
    path('admin/coupons/<int:pk>/delete/', AdminCouponDeleteView.as_view(), name='admin_coupon_delete'),
]