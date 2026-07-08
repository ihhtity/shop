from django.contrib import admin
from .models import Category, Goods, Specification


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'parent', 'level', 'sort_order', 'status']
    search_fields = ['name']
    list_filter = ['level', 'status']
    list_per_page = 20
    ordering = ['level', 'sort_order']
    fieldsets = (
        ('基本信息', {'fields': ('name', 'parent', 'icon')}),
        ('设置', {'fields': ('level', 'sort_order', 'status')}),
    )


@admin.register(Goods)
class GoodsAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'sku', 'price', 'stock', 'sales', 'is_on_sale', 'is_hot', 'is_new']
    search_fields = ['name', 'sku']
    list_filter = ['category', 'is_on_sale', 'is_hot', 'is_new']
    list_per_page = 20
    list_editable = ['is_on_sale', 'is_hot', 'is_new']
    fieldsets = (
        ('基本信息', {'fields': ('category', 'name', 'sku', 'description')}),
        ('图片', {'fields': ('images',)}),
        ('价格库存', {'fields': ('price', 'original_price', 'stock', 'sales')}),
        ('状态设置', {'fields': ('is_on_sale', 'is_hot', 'is_new', 'sort_order')}),
    )


@admin.register(Specification)
class SpecificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'goods', 'name', 'value', 'price_offset', 'stock']
    search_fields = ['goods__name', 'name', 'value']
    list_filter = ['goods']
    list_per_page = 20