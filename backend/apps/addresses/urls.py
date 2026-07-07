from django.urls import path
from .views import *

urlpatterns = [
    path('', AddressListView.as_view(), name='address_list'),
    path('<int:pk>/', AddressDetailView.as_view(), name='address_detail'),
    path('create/', AddressCreateView.as_view(), name='create_address'),
    path('<int:pk>/update/', AddressUpdateView.as_view(), name='update_address'),
    path('<int:pk>/delete/', AddressDeleteView.as_view(), name='delete_address'),
    path('<int:pk>/default/', SetDefaultAddressView.as_view(), name='set_default_address'),
]