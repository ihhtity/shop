# 导入操作系统模块
import os
# 导入路径处理模块
from pathlib import Path

# 定义项目基础目录
BASE_DIR = Path(__file__).resolve().parent.parent

# 从环境变量获取密钥，使用默认值
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-@z8w5q#$%^&*()_+-=[]{}|;:\'",./<>?')

# 从环境变量获取调试模式，默认开启
DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'

# 从环境变量获取允许的主机列表
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*').split(',')

# 已安装的应用列表
INSTALLED_APPS = [
    # Django后台管理
    'django.contrib.admin',
    # Django认证系统
    'django.contrib.auth',
    # Django内容类型框架
    'django.contrib.contenttypes',
    # Django会话框架
    'django.contrib.sessions',
    # Django消息框架
    'django.contrib.messages',
    # Django静态文件处理
    'django.contrib.staticfiles',
    # Django REST框架
    'rest_framework',
    # JWT认证
    'rest_framework_simplejwt',
    # 跨域资源共享
    'corsheaders',
    # API文档生成
    'drf_yasg',
    # Celery定时任务
    'django_celery_beat',
    # 开发工具扩展
    'django_extensions',
    # 用户应用
    'apps.users',
    # 商品应用
    'apps.goods',
    # 订单应用
    'apps.orders',
    # 购物车应用
    'apps.cart',
    # 支付应用
    'apps.payment',
    # 地址应用
    'apps.addresses',
    # 优惠券应用
    'apps.coupons',
    # 统计应用
    'apps.statistics',
    # 任务应用
    'apps.tasks',
    # 文件上传应用
    'apps.upload',
]

# 中间件配置列表
MIDDLEWARE = [
    # 安全中间件
    'django.middleware.security.SecurityMiddleware',
    # 会话中间件
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 跨域中间件
    'corsheaders.middleware.CorsMiddleware',
    # 通用中间件
    'django.middleware.common.CommonMiddleware',
    # CSRF保护中间件
    'django.middleware.csrf.CsrfViewMiddleware',
    # 认证中间件
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 消息中间件
    'django.contrib.messages.middleware.MessageMiddleware',
    # 点击劫持保护中间件
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# 根URL配置
ROOT_URLCONF = 'config.urls'

# 模板配置
TEMPLATES = [
    {
        # 模板引擎后端
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # 模板目录
        'DIRS': [],
        # 启用应用目录查找
        'APP_DIRS': True,
        # 额外选项
        'OPTIONS': {
            # 上下文处理器列表
            'context_processors': [
                # 调试上下文处理器
                'django.template.context_processors.debug',
                # 请求上下文处理器
                'django.template.context_processors.request',
                # 认证上下文处理器
                'django.contrib.auth.context_processors.auth',
                # 消息上下文处理器
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI应用配置
WSGI_APPLICATION = 'config.wsgi.application'

# 数据库配置
DATABASES = {
    # 默认数据库
    'default': {
        # 数据库引擎
        'ENGINE': 'django.db.backends.sqlite3',
        # 数据库文件路径
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Redis连接地址
REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379/0')

# 缓存配置
CACHES = {
    # 默认缓存
    'default': {
        # 缓存后端
        'BACKEND': 'django_redis.cache.RedisCache',
        # 缓存位置
        'LOCATION': REDIS_URL,
        # 额外选项
        'OPTIONS': {
            # 客户端类
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# 会话存储引擎
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
# 会话缓存别名
SESSION_CACHE_ALIAS = 'default'

# 密码验证器列表
AUTH_PASSWORD_VALIDATORS = [
    {
        # 用户属性相似性验证器
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        # 最小长度验证器
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        # 常见密码验证器
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        # 纯数字密码验证器
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# 语言代码
LANGUAGE_CODE = 'zh-hans'

# 时区设置
TIME_ZONE = 'Asia/Shanghai'

# 启用国际化
USE_I18N = True

# 启用时区支持
USE_TZ = True

# 静态文件URL
STATIC_URL = '/static/'

# 媒体文件URL
MEDIA_URL = '/media/'
# 媒体文件存储路径
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# 默认自动字段类型
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# 自定义用户模型
AUTH_USER_MODEL = 'users.User'

# REST框架配置
REST_FRAMEWORK = {
    # 默认认证类
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # JWT认证
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # 默认权限类
    'DEFAULT_PERMISSION_CLASSES': (
        # 需要认证
        'rest_framework.permissions.IsAuthenticated',
    ),
    # 默认分页类
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    # 每页数量
    'PAGE_SIZE': 20,
    # 默认渲染器
    'DEFAULT_RENDERER_CLASSES': (
        # JSON渲染器
        'rest_framework.renderers.JSONRenderer',
    ),
}

# 导入时间差模块
from datetime import timedelta

# JWT配置
SIMPLE_JWT = {
    # 访问令牌有效期
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=2),
    # 刷新令牌有效期
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    # 是否轮换刷新令牌
    'ROTATE_REFRESH_TOKENS': False,
    # 轮换后是否加入黑名单
    'BLACKLIST_AFTER_ROTATION': False,
    # 是否更新最后登录时间
    'UPDATE_LAST_LOGIN': True,
}

# 允许所有跨域来源
CORS_ALLOW_ALL_ORIGINS = True

# 允许的HTTP方法
CORS_ALLOW_METHODS = [
    # 删除
    'DELETE',
    # 获取
    'GET',
    # 预检
    'OPTIONS',
    # 部分更新
    'PATCH',
    # 创建
    'POST',
    # 更新
    'PUT',
]

# 允许的请求头
CORS_ALLOW_HEADERS = [
    # 接受类型
    'accept',
    # 接受编码
    'accept-encoding',
    # 认证信息
    'authorization',
    # 内容类型
    'content-type',
    # 不追踪
    'dnt',
    # 来源
    'origin',
    # 用户代理
    'user-agent',
    # CSRF令牌
    'x-csrftoken',
    # 请求类型
    'x-requested-with',
]

# Swagger文档配置
SWAGGER_SETTINGS = {
    # 安全定义
    'SECURITY_DEFINITIONS': {
        # Bearer认证
        'Bearer': {
            # 类型为API密钥
            'type': 'apiKey',
            # 参数名
            'name': 'Authorization',
            # 位置在请求头
            'in': 'header',
        }
    },
    # 不使用会话认证
    'USE_SESSION_AUTH': False,
}

# Celery消息队列地址
CELERY_BROKER_URL = REDIS_URL
# Celery结果存储地址
CELERY_RESULT_BACKEND = REDIS_URL
# Celery时区设置
CELERY_TIMEZONE = TIME_ZONE
# Celery定时任务调度器
CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers:DatabaseScheduler'

# 开发环境配置
if DEBUG:
    INTERNAL_IPS = ['127.0.0.1']
    SHELL_PLUS = 'ipython'