from rest_framework import serializers
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'task_type', 'status', 'progress', 'priority', 'scheduled_time', 'start_time', 'end_time', 'error_message', 'created_at', 'updated_at']
        read_only_fields = ['id', 'status', 'progress', 'start_time', 'end_time', 'error_message', 'created_at', 'updated_at']


class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'task_type', 'priority', 'scheduled_time']