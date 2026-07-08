from django.urls import path
from .views import *

urlpatterns = [
    path('user/register/', UserRegisterView.as_view(), name='user_register'),
    path('user/login/', UserLoginView.as_view(), name='user_login'),
    path('user/wechat/login/', WechatLoginView.as_view(), name='user_wechat_login'),
    path('user/logout/', UserLogoutView.as_view(), name='user_logout'),
    path('user/info/', UserInfoView.as_view(), name='user_info'),
    path('user/password/', UserChangePasswordView.as_view(), name='user_change_password'),
    path('user/bind/phone/', BindPhoneView.as_view(), name='user_bind_phone'),
    path('user/unbind/phone/', UnbindPhoneView.as_view(), name='user_unbind_phone'),
    path('user/change/phone/', ChangePhoneView.as_view(), name='user_change_phone'),
    path('user/send/email/code/', SendEmailCodeView.as_view(), name='user_send_email_code'),
    path('user/bind/email/', BindEmailView.as_view(), name='user_bind_email'),
    path('user/unbind/email/', UnbindEmailView.as_view(), name='user_unbind_email'),
    path('user/change/email/', ChangeEmailView.as_view(), name='user_change_email'),

    path('admin/register/', AdminRegisterView.as_view(), name='admin_register'),
    path('admin/login/', AdminLoginView.as_view(), name='admin_login'),
    path('admin/logout/', AdminLogoutView.as_view(), name='admin_logout'),
    path('admin/info/', AdminInfoView.as_view(), name='admin_info'),
    path('admin/password/', AdminChangePasswordView.as_view(), name='admin_change_password'),

    path('admin/users/', UserListView.as_view(), name='admin_user_list'),
    path('admin/users/<int:pk>/', UserDetailView.as_view(), name='admin_user_detail'),
    path('admin/users/<int:pk>/update/', UserUpdateView.as_view(), name='admin_user_update'),
    path('admin/users/<int:pk>/delete/', UserDeleteView.as_view(), name='admin_user_delete'),

    path('admin/admins/', AdminListView.as_view(), name='admin_admin_list'),
    path('admin/admins/<int:pk>/', AdminDetailView.as_view(), name='admin_admin_detail'),
    path('admin/admins/<int:pk>/update/', AdminUpdateView.as_view(), name='admin_admin_update'),
    path('admin/admins/<int:pk>/delete/', AdminDeleteView.as_view(), name='admin_admin_delete'),
]