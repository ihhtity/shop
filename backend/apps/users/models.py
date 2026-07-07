from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=11, unique=True, blank=True, null=True, verbose_name='手机号')
    nickname = models.CharField(max_length=64, blank=True, null=True, verbose_name='昵称')
    avatar = models.CharField(max_length=256, blank=True, null=True, verbose_name='头像')
    gender = models.SmallIntegerField(default=0, verbose_name='性别')
    birth_date = models.DateField(blank=True, null=True, verbose_name='出生日期')
    openid = models.CharField(max_length=64, unique=True, blank=True, null=True, verbose_name='微信OpenID')
    unionid = models.CharField(max_length=64, unique=True, blank=True, null=True, verbose_name='微信UnionID')
    is_admin = models.BooleanField(default=False, verbose_name='是否管理员')

    class Meta:
        db_table = 'users_user'
        verbose_name = '用户'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username