from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, DestroyAPIView
from .models import Notification
from .serializers import NotificationSerializer


class NotificationListView(ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user, status=1)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response({'code': 0, 'message': 'success', 'data': serializer.data})


class NotificationReadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        try:
            notification = Notification.objects.get(id=pk, user=request.user)
            notification.is_read = True
            notification.save()
            return Response({'code': 0, 'message': '已标记为已读', 'data': {}})
        except Notification.DoesNotExist:
            return Response({'code': 90001, 'message': '通知不存在', 'data': {}}, status=status.HTTP_404_NOT_FOUND)


class NotificationReadAllView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        Notification.objects.filter(user=request.user, is_read=False, status=1).update(is_read=True)
        return Response({'code': 0, 'message': '全部已读', 'data': {}})


class NotificationUnreadCountView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        count = Notification.objects.filter(user=request.user, is_read=False, status=1).count()
        return Response({'code': 0, 'message': 'success', 'data': {'count': count}})


class NotificationDestroyView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user, status=1)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.status = 0
        instance.save()
        return Response({'code': 0, 'message': '删除成功', 'data': {}})