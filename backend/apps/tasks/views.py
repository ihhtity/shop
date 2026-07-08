from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from .models import Task
from .serializers import TaskSerializer, TaskUpdateSerializer


class TaskListView(ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskCreateView(CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskUpdateView(UpdateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Task.objects.all()
    serializer_class = TaskUpdateSerializer


class TaskDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = Task.objects.all()


class TaskExecuteView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, pk):
        task = Task.objects.filter(id=pk).first()
        if not task:
            return Response({'code': 90003, 'message': '任务不存在', 'data': {}}, status=status.HTTP_400_BAD_REQUEST)
        task.status = 1
        task.progress = 0
        task.start_time = None
        task.save()
        return Response({'code': 0, 'message': '任务已启动', 'data': {}})