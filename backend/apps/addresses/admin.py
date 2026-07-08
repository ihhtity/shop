from django.contrib import admin
from .models import Address


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'name', 'phone', 'province', 'city', 'district', 'is_default', 'status']
    search_fields = ['user__username', 'name', 'phone']
    list_filter = ['is_default', 'status']
    list_per_page = 20