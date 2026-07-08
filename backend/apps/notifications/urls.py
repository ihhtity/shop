from django.urls import path
from .views import NotificationListView, NotificationReadView, NotificationReadAllView, NotificationUnreadCountView, NotificationDestroyView

urlpatterns = [
    path('', NotificationListView.as_view(), name='notification_list'),
    path('<int:pk>/read/', NotificationReadView.as_view(), name='notification_read'),
    path('read_all/', NotificationReadAllView.as_view(), name='notification_read_all'),
    path('unread_count/', NotificationUnreadCountView.as_view(), name='notification_unread_count'),
    path('<int:pk>/', NotificationDestroyView.as_view(), name='notification_destroy'),
]
