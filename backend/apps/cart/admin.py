from django.contrib import admin
from .models import Cart


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'goods', 'spec', 'quantity', 'status', 'created_at']
    search_fields = ['user__username', 'goods__name']
    list_filter = ['status']
    list_per_page = 20