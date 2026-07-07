from django.contrib import admin
from .models import Category, Goods, Specification

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'parent', 'level', 'status']
    search_fields = ['name']
    list_filter = ['level', 'status']

class GoodsAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'sku', 'category', 'price', 'stock', 'sales', 'is_on_sale']
    search_fields = ['name', 'sku']
    list_filter = ['category', 'is_on_sale', 'is_hot', 'is_new']

class SpecificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'goods', 'name', 'value', 'price_offset', 'stock']
    search_fields = ['goods__name', 'name', 'value']

admin.site.register(Category, CategoryAdmin)
admin.site.register(Goods, GoodsAdmin)
admin.site.register(Specification, SpecificationAdmin)