from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="商城API",
        default_version='v1',
        description="商城全栈项目API文档",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('api/users/', include('apps.users.urls')),
    path('api/goods/', include('apps.goods.urls')),
    path('api/cart/', include('apps.cart.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/payment/', include('apps.payment.urls')),
    path('api/addresses/', include('apps.addresses.urls')),
    path('api/coupons/', include('apps.coupons.urls')),
    path('api/statistics/', include('apps.statistics.urls')),
    path('api/upload/', include('apps.upload.urls')),
]

handler400 = 'utils.exception_handler.bad_request'
handler403 = 'utils.exception_handler.permission_denied'
handler404 = 'utils.exception_handler.not_found'
handler500 = 'utils.exception_handler.server_error'

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)