from django.contrib import admin
from .models import User, AdminUser


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'nickname', 'phone', 'email', 'is_active', 'date_joined']
    search_fields = ['username', 'nickname', 'phone', 'email']
    list_filter = ['is_active', 'is_staff', 'date_joined']
    list_per_page = 20
    readonly_fields = ['date_joined', 'last_login']
    fieldsets = (
        ('基本信息', {'fields': ('username', 'password', 'nickname', 'phone', 'email', 'avatar')}),
        ('个人资料', {'fields': ('gender', 'birth_date')}),
        ('权限设置', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('时间信息', {'fields': ('date_joined', 'last_login')}),
    )


@admin.register(AdminUser)
class AdminUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'phone', 'role', 'is_active', 'last_login', 'created_at']
    search_fields = ['username', 'email', 'phone']
    list_filter = ['role', 'is_active']
    list_per_page = 20
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('基本信息', {'fields': ('username', 'password', 'email', 'phone', 'avatar')}),
        ('角色权限', {'fields': ('role', 'is_active')}),
        ('时间信息', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )

    def save_model(self, request, obj, form, change):
        if form.cleaned_data.get('password') and not form.cleaned_data['password'].startswith('pbkdf2'):
            obj.set_password(form.cleaned_data['password'])
        else:
            if change:
                obj.password = AdminUser.objects.get(id=obj.id).password
        super().save_model(request, obj, form, change)