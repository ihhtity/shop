from django.urls import path
from .views import CartView, CartItemUpdateView, CartItemDeleteView, CartClearView, UserCartView, UserCartItemUpdateView, UserCartItemDeleteView, UserCartClearView, AdminCartListView, AdminCartDetailView

urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('<int:pk>/', CartItemUpdateView.as_view(), name='cart_item_update'),
    path('<int:pk>/delete/', CartItemDeleteView.as_view(), name='cart_item_delete'),
    path('clear/', CartClearView.as_view(), name='cart_clear'),
    
    path('user/cart/', UserCartView.as_view(), name='user_cart'),
    path('user/cart/<int:pk>/', UserCartItemUpdateView.as_view(), name='user_cart_item_update'),
    path('user/cart/<int:pk>/delete/', UserCartItemDeleteView.as_view(), name='user_cart_item_delete'),
    path('user/cart/clear/', UserCartClearView.as_view(), name='user_cart_clear'),
    
    path('admin/cart/', AdminCartListView.as_view(), name='admin_cart_list'),
    path('admin/cart/<int:pk>/', AdminCartDetailView.as_view(), name='admin_cart_detail'),
]