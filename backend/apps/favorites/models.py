from django.db import models
from apps.users.models import User
from apps.goods.models import Goods


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='用户')
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, verbose_name='商品')
    status = models.SmallIntegerField(default=1, verbose_name='状态')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')

    class Meta:
        db_table = 'shop_favorite'
        verbose_name = '收藏'
        verbose_name_plural = verbose_name
        unique_together = ['user', 'goods']

    def __str__(self):
        return f'{self.user.username} - {self.goods.name}'
