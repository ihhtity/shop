from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=64, verbose_name='分类名称')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, verbose_name='父分类')
    level = models.SmallIntegerField(default=1, verbose_name='分类级别')
    sort_order = models.IntegerField(default=0, verbose_name='排序号')
    icon = models.CharField(max_length=256, blank=True, null=True, verbose_name='分类图标')
    status = models.SmallIntegerField(default=1, verbose_name='状态')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'goods_category'
        verbose_name = '商品分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

class Goods(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name='分类')
    name = models.CharField(max_length=256, verbose_name='商品名称')
    sku = models.CharField(max_length=64, unique=True, verbose_name='SKU编码')
    description = models.TextField(blank=True, null=True, verbose_name='商品描述')
    images = models.JSONField(blank=True, null=True, verbose_name='商品图片')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='售价')
    original_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name='原价')
    stock = models.IntegerField(default=0, verbose_name='库存')
    sales = models.IntegerField(default=0, verbose_name='销量')
    is_on_sale = models.BooleanField(default=True, verbose_name='是否上架')
    is_hot = models.BooleanField(default=False, verbose_name='是否热门')
    is_new = models.BooleanField(default=False, verbose_name='是否新品')
    sort_order = models.IntegerField(default=0, verbose_name='排序号')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'goods_goods'
        verbose_name = '商品'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

class Specification(models.Model):
    goods = models.ForeignKey(Goods, on_delete=models.CASCADE, verbose_name='商品')
    name = models.CharField(max_length=64, verbose_name='规格名称')
    value = models.CharField(max_length=128, verbose_name='规格值')
    price_offset = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name='价格偏移')
    stock = models.IntegerField(default=0, verbose_name='规格库存')
    image = models.CharField(max_length=256, blank=True, null=True, verbose_name='规格图片')

    class Meta:
        db_table = 'goods_specification'
        verbose_name = '商品规格'
        verbose_name_plural = verbose_name

    def __str__(self):
        return f'{self.name}: {self.value}'