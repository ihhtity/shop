from django.urls import path
from .views import *

urlpatterns = [
    path('', AddressListView.as_view(), name='address_list'),
    path('<int:pk>/', AddressDetailView.as_view(), name='address_detail'),
    path('create/', AddressCreateView.as_view(), name='create_address'),
    path('<int:pk>/update/', AddressUpdateView.as_view(), name='update_address'),
    path('<int:pk>/delete/', AddressDeleteView.as_view(), name='delete_address'),
    path('<int:pk>/default/', SetDefaultAddressView.as_view(), name='set_default_address'),
    
    path('user/addresses/', UserAddressListView.as_view(), name='user_address_list'),
    path('user/addresses/create/', UserAddressCreateView.as_view(), name='user_address_create'),
    path('user/addresses/<int:pk>/', UserAddressUpdateView.as_view(), name='user_address_update'),
    path('user/addresses/<int:pk>/delete/', UserAddressDeleteView.as_view(), name='user_address_delete'),
    path('user/addresses/<int:pk>/default/', UserSetDefaultAddressView.as_view(), name='user_set_default_address'),
    
    path('admin/addresses/', AdminAddressListView.as_view(), name='admin_address_list'),
    path('admin/addresses/<int:pk>/', AdminAddressDetailView.as_view(), name='admin_address_detail'),
]