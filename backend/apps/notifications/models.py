from django.db import models
from apps.users.models import User


class Notification(models.Model):
    NOTIFY_TYPE_CHOICES = [
        (1, '系统通知'),
        (2, '订单通知'),
        (3, '优惠活动'),
        (4, '物流通知'),
        (5, '消息提醒'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True, verbose_name='用户')
    title = models.CharField(max_length=128, verbose_name='标题')
    content = models.TextField(verbose_name='内容')
    notify_type = models.SmallIntegerField(default=1, choices=NOTIFY_TYPE_CHOICES, verbose_name='通知类型')
    is_read = models.BooleanField(default=False, verbose_name='是否已读')
    status = models.SmallIntegerField(default=1, verbose_name='状态')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')

    class Meta:
        db_table = 'shop_notification'
        verbose_name = '通知'
        verbose_name_plural = verbose_name
        ordering = ['-created_at']

    def __str__(self):
        return self.title
