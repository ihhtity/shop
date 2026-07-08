from django.db import models


class Cart(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='用户')
    goods = models.ForeignKey('goods.Goods', on_delete=models.CASCADE, verbose_name='商品')
    spec = models.ForeignKey('goods.Specification', on_delete=models.CASCADE, blank=True, null=True, verbose_name='规格')
    quantity = models.IntegerField(default=1, verbose_name='数量')
    status = models.SmallIntegerField(default=1, verbose_name='状态')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'shop_cart'
        verbose_name = '购物车'
        verbose_name_plural = verbose_name
        unique_together = ('user', 'goods', 'spec')

    def __str__(self):
        return f'{self.user.username} - {self.goods.name}'