from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'phone', 'nickname', 'is_admin', 'is_active']
    search_fields = ['username', 'phone', 'nickname']
    list_filter = ['is_admin', 'is_active']

admin.site.register(User, UserAdmin)