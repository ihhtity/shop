from django.urls import path
from .views import DashboardView, SalesStatView, UserStatView, GoodsStatView

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('sales/', SalesStatView.as_view(), name='sales_stat'),
    path('users/', UserStatView.as_view(), name='user_stat'),
    path('goods/', GoodsStatView.as_view(), name='goods_stat'),
]