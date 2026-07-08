# 导入Django后台管理模块
from django.contrib import admin
# 导入URL路由相关模块
from django.urls import path, include, re_path
# 导入Django配置模块
from django.conf import settings
# 导入静态文件服务模块
from django.conf.urls.static import static
# 导入drf-yasg的schema视图
from drf_yasg.views import get_schema_view
# 导入drf-yasg的openapi模块
from drf_yasg import openapi
# 导入DRF权限模块
from rest_framework import permissions

# 配置API文档schema视图
schema_view = get_schema_view(
    # 定义API文档基本信息
    openapi.Info(
        # API标题
        title="商城API",
        # 默认版本号
        default_version='v1',
        # API描述
        description="商城全栈项目API文档",
    ),
    # 公开访问
    public=True,
    # 允许任何权限
    permission_classes=(permissions.AllowAny,),
)

# 定义URL路由配置列表
urlpatterns = [
    # Django后台管理路由
    path('admin/', admin.site.urls),
    # Swagger JSON/YAML格式API文档路由
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # Swagger UI界面路由
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # ReDoc UI界面路由
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # 用户模块API路由
    path('api/users/', include('apps.users.urls')),
    # 商品模块API路由
    path('api/goods/', include('apps.goods.urls')),
    # 购物车模块API路由
    path('api/cart/', include('apps.cart.urls')),
    # 订单模块API路由
    path('api/orders/', include('apps.orders.urls')),
    # 支付模块API路由
    path('api/payment/', include('apps.payment.urls')),
    # 地址模块API路由
    path('api/addresses/', include('apps.addresses.urls')),
    # 优惠券模块API路由
    path('api/coupons/', include('apps.coupons.urls')),
    # 统计模块API路由
    path('api/statistics/', include('apps.statistics.urls')),
    # 文件上传模块API路由
    path('api/upload/', include('apps.upload.urls')),
    # 任务模块API路由
    path('api/tasks/', include('apps.tasks.urls')),
    # 收藏模块API路由
    path('api/favorites/', include('apps.favorites.urls')),
    # 通知模块API路由
    path('api/notifications/', include('apps.notifications.urls')),
]

# 400错误处理器
handler400 = 'utils.exception_handler.bad_request'
# 403错误处理器
handler403 = 'utils.exception_handler.permission_denied'
# 404错误处理器
handler404 = 'utils.exception_handler.not_found'
# 500错误处理器
handler500 = 'utils.exception_handler.server_error'

# 调试模式下添加媒体文件服务路由
if settings.DEBUG:
    # 将媒体文件URL添加到路由列表
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)