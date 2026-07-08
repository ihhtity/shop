from django.urls import path
from .views import FavoriteListView, FavoriteCreateView, FavoriteDestroyView, FavoriteCheckView

urlpatterns = [
    path('', FavoriteListView.as_view(), name='favorite_list'),
    path('create/', FavoriteCreateView.as_view(), name='favorite_create'),
    path('<int:pk>/', FavoriteDestroyView.as_view(), name='favorite_destroy'),
    path('check/', FavoriteCheckView.as_view(), name='favorite_check'),
]