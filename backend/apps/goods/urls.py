from django.urls import path
from .views import *

urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category_list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category_detail'),
    path('', GoodsListView.as_view(), name='goods_list'),
    path('<int:pk>/', GoodsDetailView.as_view(), name='goods_detail'),
    path('hot/', HotGoodsView.as_view(), name='hot_goods'),
    path('new/', NewGoodsView.as_view(), name='new_goods'),
    path('admin/goods/', AdminGoodsCreateView.as_view(), name='admin_goods_create'),
    path('admin/goods/<int:pk>/', AdminGoodsUpdateView.as_view(), name='admin_goods_update'),
    path('admin/goods/<int:pk>/delete/', AdminGoodsDeleteView.as_view(), name='admin_goods_delete'),
]