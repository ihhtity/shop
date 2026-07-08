from django.db import models

class Order(models.Model):
    STATUS_CHOICES = [
        (0, '待付款'),
        (1, '待发货'),
        (2, '待收货'),
        (3, '已完成'),
        (4, '已取消'),
        (5, '退款中'),
    ]

    PAY_STATUS_CHOICES = [
        (0, '未支付'),
        (1, '已支付'),
        (2, '退款中'),
        (3, '已退款'),
    ]

    PAY_TYPE_CHOICES = [
        (1, '微信支付'),
        (2, '支付宝'),
    ]

    order_no = models.CharField(max_length=32, unique=True, verbose_name='订单编号')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name='用户')
    address = models.ForeignKey('addresses.Address', on_delete=models.CASCADE, blank=True, null=True, verbose_name='收货地址')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='订单总金额')
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name='优惠金额')
    pay_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='实付金额')
    status = models.SmallIntegerField(default=0, choices=STATUS_CHOICES, verbose_name='订单状态')
    pay_status = models.SmallIntegerField(default=0, choices=PAY_STATUS_CHOICES, verbose_name='支付状态')
    pay_type = models.SmallIntegerField(blank=True, null=True, choices=PAY_TYPE_CHOICES, verbose_name='支付方式')
    pay_time = models.DateTimeField(blank=True, null=True, verbose_name='支付时间')
    ship_time = models.DateTimeField(blank=True, null=True, verbose_name='发货时间')
    finish_time = models.DateTimeField(blank=True, null=True, verbose_name='完成时间')
    cancel_time = models.DateTimeField(blank=True, null=True, verbose_name='取消时间')
    remark = models.CharField(max_length=512, blank=True, null=True, verbose_name='用户备注')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'shop_order'
        verbose_name = '订单'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.order_no

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, verbose_name='订单')
    goods = models.ForeignKey('goods.Goods', on_delete=models.CASCADE, verbose_name='商品')
    goods_name = models.CharField(max_length=256, verbose_name='商品名称')
    goods_image = models.CharField(max_length=256, blank=True, null=True, verbose_name='商品图片')
    spec = models.ForeignKey('goods.Specification', on_delete=models.CASCADE, blank=True, null=True, verbose_name='规格')
    spec_name = models.CharField(max_length=256, blank=True, null=True, verbose_name='规格名称')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='单价')
    quantity = models.IntegerField(verbose_name='数量')
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='小计金额')

    class Meta:
        db_table = 'shop_orderitem'
        verbose_name = '订单商品'
        verbose_name_plural = verbose_name