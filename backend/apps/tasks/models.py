from django.db import models


class Task(models.Model):
    STATUS_CHOICES = [
        (0, '待执行'),
        (1, '执行中'),
        (2, '已完成'),
        (3, '失败'),
    ]

    TYPE_CHOICES = [
        (1, '数据同步'),
        (2, '邮件发送'),
        (3, '报表生成'),
        (4, '图片处理'),
        (5, '系统备份'),
        (6, '其他'),
    ]

    title = models.CharField(max_length=128, verbose_name='任务标题')
    description = models.TextField(blank=True, null=True, verbose_name='任务描述')
    task_type = models.SmallIntegerField(choices=TYPE_CHOICES, default=6, verbose_name='任务类型')
    status = models.SmallIntegerField(default=0, choices=STATUS_CHOICES, verbose_name='任务状态')
    progress = models.IntegerField(default=0, verbose_name='进度(%)')
    priority = models.SmallIntegerField(default=2, verbose_name='优先级(1-5)')
    scheduled_time = models.DateTimeField(blank=True, null=True, verbose_name='计划执行时间')
    start_time = models.DateTimeField(blank=True, null=True, verbose_name='开始执行时间')
    end_time = models.DateTimeField(blank=True, null=True, verbose_name='结束时间')
    error_message = models.TextField(blank=True, null=True, verbose_name='错误信息')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'shop_task'
        verbose_name = '任务'
        verbose_name_plural = verbose_name
        ordering = ['-created_at']

    def __str__(self):
        return self.title