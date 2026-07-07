from django.contrib import admin
from .models import Address

class AddressAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'name', 'phone', 'province', 'city', 'district', 'is_default']
    search_fields = ['user__username', 'name', 'phone']

admin.site.register(Address, AddressAdmin)