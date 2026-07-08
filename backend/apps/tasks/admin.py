from django.contrib import admin
from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'task_type', 'status', 'progress', 'priority', 'scheduled_time', 'created_at']
    search_fields = ['title', 'description']
    list_filter = ['task_type', 'status', 'priority']
    list_per_page = 20
    readonly_fields = ['start_time', 'end_time', 'error_message', 'created_at', 'updated_at']
    fieldsets = (
        ('基本信息', {'fields': ('title', 'description', 'task_type')}),
        ('状态信息', {'fields': ('status', 'progress', 'priority')}),
        ('时间设置', {'fields': ('scheduled_time', 'start_time', 'end_time')}),
        ('错误信息', {'fields': ('error_message',)}),
        ('创建时间', {'fields': ('created_at', 'updated_at')}),
    )