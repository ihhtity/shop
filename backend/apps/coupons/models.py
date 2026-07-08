from django.db import models

class Coupon(models.Model):
    COUPON_TYPE_CHOICES = [
        (1, '满减'),
        (2, '折扣'),
        (3, '无门槛'),
    ]

    name = models.CharField(max_length=64, verbose_name='优惠券名称')
    coupon_type = models.SmallIntegerField(choices=COUPON_TYPE_CHOICES, verbose_name='优惠券类型')
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name='优惠金额')
    discount_rate = models.DecimalField(max_digits=4, decimal_places=2, default=1, verbose_name='折扣率')
    min_spend = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name='最低消费金额')
    total_count = models.IntegerField(verbose_name='总发放数量')
    used_count = models.IntegerField(default=0, verbose_name='已使用数量')
    per_user_limit = models.IntegerField(default=1, verbose_name='每人限领数量')
    start_time = models.DateTimeField(verbose_name='生效时间')
    end_time = models.DateTimeField(verbose_name='失效时间')
    status = models.SmallIntegerField(default=1, verbose_name='状态')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'shop_coupon'
        verbose_name = '优惠券'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

class UserCoupon(models.Model):
    STATUS_CHOICES = [
        (0, '未使用'),
        (1, '已使用'),
        (2, '已过期'),
    ]

    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='用户')
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE, verbose_name='优惠券')
    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, blank=True, null=True, verbose_name='使用订单')
    status = models.SmallIntegerField(default=0, choices=STATUS_CHOICES, verbose_name='状态')
    receive_time = models.DateTimeField(auto_now_add=True, verbose_name='领取时间')
    used_time = models.DateTimeField(blank=True, null=True, verbose_name='使用时间')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'shop_usercoupon'
        verbose_name = '用户优惠券'
        verbose_name_plural = verbose_name