from django.urls import path
from .views import CartView, CartItemDeleteView, CartClearView

urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('<int:pk>/', CartItemDeleteView.as_view(), name='cart_item_delete'),
    path('clear/', CartClearView.as_view(), name='cart_clear'),
]