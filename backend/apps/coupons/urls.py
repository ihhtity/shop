from django.urls import path
from .views import *

urlpatterns = [
    path('', CouponListView.as_view(), name='coupon_list'),
    path('<int:pk>/', CouponDetailView.as_view(), name='coupon_detail'),
    path('<int:pk>/receive/', ReceiveCouponView.as_view(), name='receive_coupon'),
    path('my/', MyCouponListView.as_view(), name='my_coupon_list'),
    
    path('user/coupons/', UserCouponListView.as_view(), name='user_coupon_list'),
    path('user/coupons/<int:pk>/receive/', UserReceiveCouponView.as_view(), name='user_receive_coupon'),
    
    path('admin/coupons/', AdminCouponListView.as_view(), name='admin_coupon_list'),
    path('admin/coupons/<int:pk>/', AdminCouponDetailView.as_view(), name='admin_coupon_detail'),
]