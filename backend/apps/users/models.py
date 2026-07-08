from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    phone = models.CharField(max_length=11, unique=True, blank=True, null=True, verbose_name='手机号')
    email = models.EmailField(max_length=100, unique=True, blank=True, null=True, verbose_name='邮箱')
    nickname = models.CharField(max_length=64, blank=True, null=True, verbose_name='昵称')
    avatar = models.CharField(max_length=256, blank=True, null=True, verbose_name='头像')
    gender = models.SmallIntegerField(default=0, verbose_name='性别')
    birth_date = models.DateField(blank=True, null=True, verbose_name='出生日期')
    openid = models.CharField(max_length=64, unique=True, blank=True, null=True, verbose_name='微信OpenID')
    unionid = models.CharField(max_length=64, unique=True, blank=True, null=True, verbose_name='微信UnionID')

    class Meta:
        db_table = 'shop_user'
        verbose_name = '用户'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username


class AdminUser(models.Model):
    ROLE_CHOICES = [
        (1, '超级管理员'),
        (2, '管理员'),
        (3, '操作员'),
    ]

    username = models.CharField(max_length=150, unique=True, verbose_name='用户名')
    password = models.CharField(max_length=128, verbose_name='密码')
    email = models.EmailField(blank=True, null=True, verbose_name='邮箱')
    phone = models.CharField(max_length=11, blank=True, null=True, verbose_name='手机号')
    avatar = models.CharField(max_length=256, blank=True, null=True, verbose_name='头像')
    role = models.SmallIntegerField(default=2, choices=ROLE_CHOICES, verbose_name='角色')
    is_active = models.BooleanField(default=True, verbose_name='是否启用')
    last_login = models.DateTimeField(blank=True, null=True, verbose_name='最后登录时间')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'shop_admin'
        verbose_name = '管理员'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username

    def set_password(self, raw_password):
        from django.contrib.auth.hashers import make_password
        self.password = make_password(raw_password)
        self.save()

    def check_password(self, raw_password):
        from django.contrib.auth.hashers import check_password
        return check_password(raw_password, self.password)