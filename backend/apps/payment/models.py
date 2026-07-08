from django.db import models

class PaymentRecord(models.Model):
    PAY_TYPE_CHOICES = [
        (1, '微信支付'),
        (2, '支付宝'),
    ]

    STATUS_CHOICES = [
        (0, '未支付'),
        (1, '已支付'),
        (2, '退款中'),
        (3, '已退款'),
    ]

    order = models.ForeignKey('orders.Order', on_delete=models.CASCADE, verbose_name='订单')
    transaction_no = models.CharField(max_length=64, blank=True, null=True, verbose_name='第三方交易号')
    pay_type = models.SmallIntegerField(choices=PAY_TYPE_CHOICES, verbose_name='支付方式')
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='支付金额')
    status = models.SmallIntegerField(default=0, choices=STATUS_CHOICES, verbose_name='支付状态')
    pay_time = models.DateTimeField(blank=True, null=True, verbose_name='支付时间')
    refund_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name='退款金额')
    refund_time = models.DateTimeField(blank=True, null=True, verbose_name='退款时间')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'shop_paymentrecord'
        verbose_name = '支付记录'
        verbose_name_plural = verbose_name