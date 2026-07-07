from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('wechat/login/', WechatLoginView.as_view(), name='wechat_login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('info/', UserInfoView.as_view(), name='user_info'),
    path('password/', ChangePasswordView.as_view(), name='change_password'),
    path('admin/users/', UserListView.as_view(), name='admin_user_list'),
    path('admin/users/<int:pk>/', UserDetailView.as_view(), name='admin_user_detail'),
    path('admin/users/<int:pk>/update/', UserUpdateView.as_view(), name='admin_user_update'),
    path('admin/users/<int:pk>/delete/', UserDeleteView.as_view(), name='admin_user_delete'),
]