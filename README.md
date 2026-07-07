# 全栈商城项目引用文档

## 1. 项目概述

本项目是一个基于前后端分离架构的全栈商城系统，包含PC管理端和移动端（微信小程序、微信H5、普通H5）。

### 1.1 项目目标

- 提供完整的电商业务能力：商品管理、订单管理、购物车、支付、用户管理
- 支持多端访问：PC管理后台 + 移动端用户端（微信小程序、微信H5、普通H5）
- 高性能架构：Redis缓存、数据库索引优化、接口限流
- 安全可靠：JWT认证、权限控制、数据加密、SQL注入防护

### 1.2 技术栈选型

| 层次 | 技术 | 版本 | 选型理由 |
|------|------|------|----------|
| 后端框架 | Django | 5.x | 成熟稳定，ORM强大，社区活跃，适合快速开发企业级应用 |
| 后端API | Django REST Framework | 3.x | 专业REST API框架，支持序列化、认证、权限、分页 |
| 数据库 | MySQL | 8.x | 成熟稳定，性能优异，电商场景首选关系型数据库 |
| 缓存 | Redis | 7.x | 高性能内存数据库，支持缓存、会话、消息队列、分布式锁 |
| 前端PC框架 | React | 18.x | 组件化开发，生态成熟，TypeScript支持好 |
| 前端PC构建 | Vite | 6.x | 极速开发构建工具，HMR热更新，原生ESM支持 |
| 前端PC语言 | TypeScript | 5.x | 类型安全，减少运行时错误，大型项目必备 |
| 前端PC UI | Ant Design | 5.x | 企业级UI组件库，设计规范统一，组件丰富 |
| 前端PC状态管理 | Zustand | 4.x | 轻量级状态管理，API简洁，学习成本低 |
| 前端移动端框架 | Taro | 3.x | 多端统一开发框架，支持微信小程序、H5等 |
| 前端移动端UI | Taro UI | 3.x | Taro官方UI组件库，适配多端 |
| API文档 | Swagger/DRF-YASG | 最新 | 自动生成API文档，便于前后端协作 |
| 认证方案 | JWT | - | 无状态认证，适合分布式系统，移动端友好 |
| 支付集成 | 微信支付、支付宝 | - | 主流支付渠道，电商必备 |
| 异步任务 | Celery | 5.x | 分布式任务队列，处理异步操作 |
| 文件存储 | 阿里云OSS | - | 对象存储服务，存储图片和文件 |

### 1.3 系统架构

```
┌─────────────────────────────────────────────────────────────────────┐
│                        用户访问层                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ 微信小程序│  │  微信H5  │  │  普通H5  │  │   PC管理后台     │    │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘    │
└───────┼─────────────┼─────────────┼─────────────────┼───────────────┘
        │             │             │                 │
        ▼             ▼             ▼                 ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Nginx反向代理层                               │
│                    负载均衡 | SSL | 静态资源                          │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Django应用层                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│  │ 用户认证 │  │ 商品管理 │  │ 订单管理 │  │ 购物车 | 支付 |   │    │
│  │  JWT     │  │  模块    │  │  模块    │  │  收货地址 | 统计  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────────────────────────┘
        │             │             │                 │
        ▼             ▼             ▼                 ▼
┌─────────────────────┐  ┌─────────────────────────────────────┐
│        Redis        │  │               MySQL                 │
│  ┌───────────────┐  │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌────┐ │
│  │缓存|会话|限流  │  │  │  │ 用户 │ │ 商品 │ │ 订单 │ │支付│ │
│  └───────────────┘  │  │  └──────┘ └──────┘ └──────┘ └────┘ │
└─────────────────────┘  └─────────────────────────────────────┘
```

### 1.4 通信协议规范

| 项目 | 规范 |
|------|------|
| 协议 | HTTP/HTTPS |
| 请求方式 | RESTful风格（GET/POST/PUT/DELETE） |
| 数据格式 | JSON |
| 字符编码 | UTF-8 |
| 时间格式 | ISO 8601（YYYY-MM-DDTHH:mm:ssZ） |
| 认证方式 | JWT Token（Bearer Token） |
| 跨域处理 | CORS |

### 1.5 响应格式规范

```json
{
  "code": 0,
  "message": "success",
  "data": {},
  "timestamp": 1704067200
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| code | int | 0表示成功，非0表示错误码 |
| message | string | 提示信息 |
| data | object/array | 业务数据 |
| timestamp | int | 响应时间戳（秒） |

## 2. 快速开始

### 2.1 环境要求

| 依赖 | 版本要求 | 说明 |
|------|----------|------|
| Python | 3.10+ | 后端运行环境 |
| Node.js | 18+ | 前端运行环境 |
| Redis | 7.0+ | 缓存和消息队列（可选） |

### 2.2 项目克隆

```bash
git clone <repository-url>
cd shop
```

### 2.3 后端启动

```bash
# 进入后端目录
cd backend

# 安装依赖
pip install -r requirements.txt

# 数据库迁移（SQLite3）
python manage.py migrate

# 创建超级管理员
python manage.py createsuperuser --username admin --email admin@example.com --noinput

# 启动开发服务器
python manage.py runserver 0.0.0.0:8000
```

**后端访问地址：** http://localhost:8000/

**Django Admin后台：** http://localhost:8000/admin/

**API文档（Swagger）：** http://localhost:8000/swagger/

### 2.4 PC管理端启动

```bash
# 进入PC管理端目录
cd frontend/admin

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

**PC管理端访问地址：** http://localhost:5173/

### 2.5 移动端H5启动

```bash
# 进入移动端目录
cd frontend/mobile

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

**移动端H5访问地址：** http://localhost:10086/

### 2.6 服务地址汇总

| 服务 | 地址 | 端口 |
|------|------|------|
| 后端API | http://localhost:8000/ | 8000 |
| Django Admin | http://localhost:8000/admin/ | 8000 |
| Swagger文档 | http://localhost:8000/swagger/ | 8000 |
| PC管理端 | http://localhost:5173/ | 5173 |
| 移动端H5 | http://localhost:10086/ | 10086 |

### 2.7 配置说明

- 默认使用SQLite3数据库，无需额外配置
- 如果需要使用MySQL，请修改 `backend/config/settings.py` 中的数据库配置
- Redis用于缓存和Celery消息队列，可选配置

## 3. 后端设计文档

### 3.1 Django项目结构

```
backend/
├── manage.py                     # Django管理脚本
├── requirements.txt              # Python依赖
├── config/                       # 项目配置
│   ├── __init__.py               # 项目配置模块
│   ├── settings.py               # 全局配置
│   ├── urls.py                   # 根路由
│   └── wsgi.py                   # WSGI入口
├── apps/                         # 应用模块
│   ├── __init__.py               # 应用模块模块初始化
│   ├── users/                    # 用户模块
│   │   ├── __init__.py           # 用户模块模块初始化
│   │   ├── admin.py             # 用户模块管理员接口
│   │   ├── apps.py              # 用户模块应用配置
│   │   ├── models.py            # 用户模块模型
│   │   ├── serializers.py       # 用户模块序列化器
│   │   ├── views.py             # 用户模块视图
│   │   └── urls.py              # 用户模块路由
│   ├── goods/                    # 商品模块
│   │   ├── __init__.py           # 商品模块模块初始化
│   │   ├── admin.py             # 商品模块管理员接口
│   │   ├── apps.py              # 商品模块应用配置
│   │   ├── models.py            # 商品模块模型
│   │   ├── serializers.py       # 商品模块序列化器
│   │   ├── views.py             # 商品模块视图
│   │   └── urls.py              # 商品模块路由
│   ├── orders/                   # 订单模块
│   │   ├── __init__.py           # 订单模块模块初始化
│   │   ├── admin.py             # 订单模块管理员接口
│   │   ├── apps.py              # 订单模块应用配置
│   │   ├── models.py            # 订单模块模型
│   │   ├── serializers.py       # 订单模块序列化器
│   │   ├── views.py             # 订单模块视图
│   │   └── urls.py              # 订单模块路由
│   ├── cart/                     # 购物车模块
│   │   ├── __init__.py           # 购物车模块模块初始化
│   │   ├── apps.py              # 购物车模块应用配置
│   │   ├── serializers.py       # 购物车模块序列化器
│   │   ├── views.py             # 购物车模块视图
│   │   └── urls.py              # 购物车模块路由
│   ├── payment/                  # 支付模块
│   │   ├── __init__.py           # 支付模块模块初始化
│   │   ├── apps.py              # 支付模块应用配置
│   │   ├── serializers.py       # 支付模块序列化器
│   │   ├── views.py             # 支付模块视图
│   │   └── urls.py              # 支付模块路由
│   ├── addresses/                # 收货地址模块
│   │   ├── __init__.py           # 收货地址模块模块初始化
│   │   ├── apps.py              # 收货地址模块应用配置
│   │   ├── models.py            # 收货地址模块模型
│   │   ├── serializers.py       # 收货地址模块序列化器
│   │   ├── views.py             # 收货地址模块视图
│   │   └── urls.py              # 收货地址模块路由
│   └── statistics/               # 统计模块
│       ├── __init__.py           # 统计模块模块初始化
│       ├── apps.py              # 统计模块应用配置
│       ├── serializers.py       # 统计模块序列化器
│       ├── views.py             # 统计模块视图
│       └── urls.py              # 统计模块路由
├── utils/                        # 工具函数
│   ├── __init__.py               # 工具函数模块初始化
│   ├── jwt.py                    # JWT工具
│   ├── redis.py                  # Redis工具
│   ├── payment.py                # 支付工具
│   ├── sms.py                    # 短信工具
│   └── logger.py                 # 日志工具
└── middleware/                   # 中间件
    ├── __init__.py               # 中间件模块初始化
    ├── cors.py                   # CORS中间件
    ├── auth.py                   # 认证中间件
    └── rate_limit.py             # 限流中间件
```

### 3.2 MySQL数据库表设计

#### 3.2.1 用户表（users_user）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | 用户ID |
| username | varchar(64) | UNIQUE, NOT NULL | 用户名 |
| password | varchar(256) | NOT NULL | 密码（bcrypt加密） |
| nickname | varchar(64) | - | 昵称 |
| phone | varchar(11) | UNIQUE | 手机号 |
| email | varchar(128) | UNIQUE | 邮箱 |
| avatar | varchar(256) | - | 头像URL |
| gender | tinyint | DEFAULT 0 | 性别（0未知/1男/2女） |
| birth_date | date | - | 出生日期 |
| openid | varchar(64) | UNIQUE | 微信OpenID |
| unionid | varchar(64) | UNIQUE | 微信UnionID |
| status | tinyint | DEFAULT 1 | 状态（0禁用/1启用） |
| is_admin | tinyint | DEFAULT 0 | 是否管理员 |
| created_at | datetime | NOT NULL, DEFAULT CURRENT_TIMESTAMP | 创建时间 |
| updated_at | datetime | NOT NULL, DEFAULT CURRENT_TIMESTAMP ON UPDATE | 更新时间 |

#### 3.2.2 商品分类表（goods_category）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | 分类ID |
| name | varchar(64) | NOT NULL | 分类名称 |
| parent_id | int | FOREIGN KEY | 父分类ID（0为顶级） |
| level | tinyint | NOT NULL, DEFAULT 1 | 分类级别 |
| sort_order | int | DEFAULT 0 | 排序号 |
| icon | varchar(256) | - | 分类图标 |
| status | tinyint | DEFAULT 1 | 状态（0禁用/1启用） |
| created_at | datetime | NOT NULL | 创建时间 |
| updated_at | datetime | NOT NULL | 更新时间 |

#### 3.2.3 商品表（goods_goods）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | 商品ID |
| category_id | int | FOREIGN KEY, NOT NULL | 分类ID |
| name | varchar(256) | NOT NULL | 商品名称 |
| sku | varchar(64) | UNIQUE | SKU编码 |
| description | text | - | 商品描述 |
| images | json | - | 商品图片列表 |
| price | decimal(10,2) | NOT NULL | 售价 |
| original_price | decimal(10,2) | - | 原价 |
| stock | int | NOT NULL, DEFAULT 0 | 库存 |
| sales | int | DEFAULT 0 | 销量 |
| is_on_sale | tinyint | DEFAULT 1 | 是否上架 |
| is_hot | tinyint | DEFAULT 0 | 是否热门 |
| is_new | tinyint | DEFAULT 0 | 是否新品 |
| sort_order | int | DEFAULT 0 | 排序号 |
| created_at | datetime | NOT NULL | 创建时间 |
| updated_at | datetime | NOT NULL | 更新时间 |

#### 3.2.4 商品规格表（goods_specification）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | 规格ID |
| goods_id | int | FOREIGN KEY, NOT NULL | 商品ID |
| name | varchar(64) | NOT NULL | 规格名称（如颜色、尺码） |
| value | varchar(128) | NOT NULL | 规格值 |
| price_offset | decimal(10,2) | DEFAULT 0 | 价格偏移 |
| stock | int | DEFAULT 0 | 规格库存 |
| image | varchar(256) | - | 规格图片 |

#### 3.2.5 订单表（orders_order）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | 订单ID |
| order_no | varchar(32) | UNIQUE, NOT NULL | 订单编号 |
| user_id | int | FOREIGN KEY, NOT NULL | 用户ID |
| address_id | int | FOREIGN KEY | 收货地址ID |
| total_amount | decimal(10,2) | NOT NULL | 订单总金额 |
| discount_amount | decimal(10,2) | DEFAULT 0 | 优惠金额 |
| pay_amount | decimal(10,2) | NOT NULL | 实付金额 |
| status | tinyint | DEFAULT 0 | 订单状态 |
| pay_status | tinyint | DEFAULT 0 | 支付状态 |
| pay_type | tinyint | - | 支付方式 |
| pay_time | datetime | - | 支付时间 |
| ship_time | datetime | - | 发货时间 |
| finish_time | datetime | - | 完成时间 |
| cancel_time | datetime | - | 取消时间 |
| remark | varchar(512) | - | 用户备注 |
| created_at | datetime | NOT NULL | 创建时间 |
| updated_at | datetime | NOT NULL | 更新时间 |

**订单状态枚举：**
- 0: 待付款
- 1: 待发货
- 2: 待收货
- 3: 已完成
- 4: 已取消
- 5: 退款中

**支付状态枚举：**
- 0: 未支付
- 1: 已支付
- 2: 退款中
- 3: 已退款

**支付方式枚举：**
- 1: 微信支付
- 2: 支付宝

#### 3.2.6 订单商品表（orders_orderitem）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | ID |
| order_id | int | FOREIGN KEY, NOT NULL | 订单ID |
| goods_id | int | FOREIGN KEY, NOT NULL | 商品ID |
| goods_name | varchar(256) | NOT NULL | 商品名称 |
| goods_image | varchar(256) | - | 商品图片 |
| spec_id | int | FOREIGN KEY | 规格ID |
| spec_name | varchar(256) | - | 规格名称 |
| price | decimal(10,2) | NOT NULL | 单价 |
| quantity | int | NOT NULL | 数量 |
| subtotal | decimal(10,2) | NOT NULL | 小计金额 |

#### 3.2.7 收货地址表（addresses_address）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | 地址ID |
| user_id | int | FOREIGN KEY, NOT NULL | 用户ID |
| name | varchar(32) | NOT NULL | 收货人姓名 |
| phone | varchar(11) | NOT NULL | 手机号 |
| province | varchar(32) | NOT NULL | 省 |
| city | varchar(32) | NOT NULL | 市 |
| district | varchar(32) | NOT NULL | 区 |
| detail | varchar(256) | NOT NULL | 详细地址 |
| is_default | tinyint | DEFAULT 0 | 是否默认地址 |
| status | tinyint | DEFAULT 1 | 状态（0禁用/1启用） |
| created_at | datetime | NOT NULL | 创建时间 |
| updated_at | datetime | NOT NULL | 更新时间 |

#### 3.2.8 支付记录表（payment_paymentrecord）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | ID |
| order_id | int | FOREIGN KEY, NOT NULL | 订单ID |
| transaction_no | varchar(64) | UNIQUE | 第三方交易号 |
| pay_type | tinyint | NOT NULL | 支付方式 |
| amount | decimal(10,2) | NOT NULL | 支付金额 |
| status | tinyint | DEFAULT 0 | 支付状态 |
| pay_time | datetime | - | 支付时间 |
| refund_amount | decimal(10,2) | DEFAULT 0 | 退款金额 |
| refund_time | datetime | - | 退款时间 |
| created_at | datetime | NOT NULL | 创建时间 |
| updated_at | datetime | NOT NULL | 更新时间 |

### 3.3 Redis缓存策略

| 缓存键 | 过期时间 | 存储内容 | 说明 |
|--------|----------|----------|------|
| user:{user_id} | 1小时 | 用户信息 | 减少数据库查询 |
| token:{token} | JWT过期时间 | 用户ID | 快速验证Token |
| goods:{goods_id} | 30分钟 | 商品详情 | 热点商品缓存 |
| goods_list:{category_id} | 10分钟 | 商品列表 | 分类商品列表 |
| hot_goods | 10分钟 | 热门商品 | 首页热门推荐 |
| new_goods | 10分钟 | 新品列表 | 首页新品推荐 |
| cart:{user_id} | 7天 | 购物车数据 | 购物车持久化 |
| order:{order_id} | 1小时 | 订单详情 | 订单查询缓存 |
| rate_limit:{ip}:{path} | 1分钟 | 请求计数 | 接口限流 |
| sms_code:{phone} | 5分钟 | 短信验证码 | 验证码存储 |

### 3.4 RESTful API接口清单

#### 3.4.1 用户认证模块

| API路径 | HTTP方法 | Controller | 功能描述 | 是否需要认证 |
|---------|----------|------------|----------|--------------|
| /api/users/register/ | POST | users/views.py | 用户注册 | 否 |
| /api/users/login/ | POST | users/views.py | 账号密码登录 | 否 |
| /api/users/wechat/login/ | POST | users/views.py | 微信登录 | 否 |
| /api/users/logout/ | POST | users/views.py | 退出登录 | 是 |
| /api/users/info/ | GET | users/views.py | 获取用户信息 | 是 |
| /api/users/info/ | PUT | users/views.py | 更新用户信息 | 是 |
| /api/users/password/ | PUT | users/views.py | 修改密码 | 是 |
| /api/users/sms/code/ | POST | users/views.py | 发送短信验证码 | 否 |
| /api/admin/users/ | GET | users/views.py | 管理员获取用户列表 | 管理员 |
| /api/admin/users/{id}/ | GET | users/views.py | 管理员获取用户详情 | 管理员 |
| /api/admin/users/{id}/ | PUT | users/views.py | 管理员更新用户 | 管理员 |
| /api/admin/users/{id}/ | DELETE | users/views.py | 管理员删除用户 | 管理员 |

**用户注册请求体：**
```json
{
  "username": "string",
  "password": "string",
  "phone": "string",
  "code": "string"
}
```

**用户登录请求体：**
```json
{
  "username": "string",
  "password": "string"
}
```

**微信登录请求体：**
```json
{
  "code": "string"
}
```

**登录成功响应体：**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "token": "string",
    "user": {
      "id": 1,
      "username": "string",
      "nickname": "string",
      "avatar": "string",
      "phone": "string"
    }
  }
}
```

#### 3.4.2 商品模块

| API路径 | HTTP方法 | Controller | 功能描述 | 是否需要认证 |
|---------|----------|------------|----------|--------------|
| /api/goods/categories/ | GET | goods/views.py | 获取分类列表 | 否 |
| /api/goods/categories/{id}/ | GET | goods/views.py | 获取分类详情 | 否 |
| /api/goods/ | GET | goods/views.py | 获取商品列表 | 否 |
| /api/goods/{id}/ | GET | goods/views.py | 获取商品详情 | 否 |
| /api/goods/hot/ | GET | goods/views.py | 获取热门商品 | 否 |
| /api/goods/new/ | GET | goods/views.py | 获取新品列表 | 否 |
| /api/admin/goods/ | POST | goods/views.py | 管理员添加商品 | 管理员 |
| /api/admin/goods/{id}/ | PUT | goods/views.py | 管理员更新商品 | 管理员 |
| /api/admin/goods/{id}/ | DELETE | goods/views.py | 管理员删除商品 | 管理员 |

**商品列表请求参数：**
| 参数 | 类型 | 说明 |
|------|------|------|
| category_id | int | 分类ID |
| keyword | string | 搜索关键词 |
| page | int | 页码 |
| page_size | int | 每页数量 |

**商品列表响应体：**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "list": [...],
    "total": 100,
    "page": 1,
    "page_size": 20
  }
}
```

**商品详情响应体：**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "name": "string",
    "price": 99.99,
    "original_price": 199.99,
    "stock": 100,
    "sales": 50,
    "images": [],
    "description": "string",
    "specifications": []
  }
}
```

#### 3.4.3 购物车模块

| API路径 | HTTP方法 | Controller | 功能描述 | 是否需要认证 |
|---------|----------|------------|----------|--------------|
| /api/cart/ | GET | cart/views.py | 获取购物车 | 是 |
| /api/cart/ | POST | cart/views.py | 添加商品到购物车 | 是 |
| /api/cart/ | PUT | cart/views.py | 更新购物车商品数量 | 是 |
| /api/cart/{id}/ | DELETE | cart/views.py | 删除购物车商品 | 是 |
| /api/cart/clear/ | POST | cart/views.py | 清空购物车 | 是 |

**添加购物车请求体：**
```json
{
  "goods_id": 1,
  "spec_id": 1,
  "quantity": 1
}
```

**购物车响应体：**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "items": [...],
    "total_price": 199.98,
    "total_count": 2
  }
}
```

#### 3.4.4 订单模块

| API路径 | HTTP方法 | Controller | 功能描述 | 是否需要认证 |
|---------|----------|------------|----------|--------------|
| /api/orders/ | GET | orders/views.py | 获取订单列表 | 是 |
| /api/orders/{id}/ | GET | orders/views.py | 获取订单详情 | 是 |
| /api/orders/ | POST | orders/views.py | 创建订单 | 是 |
| /api/orders/{id}/cancel/ | POST | orders/views.py | 取消订单 | 是 |
| /api/orders/{id}/confirm/ | POST | orders/views.py | 确认收货 | 是 |
| /api/admin/orders/ | GET | orders/views.py | 管理员获取订单列表 | 管理员 |
| /api/admin/orders/{id}/ | PUT | orders/views.py | 管理员更新订单状态 | 管理员 |

**创建订单请求体：**
```json
{
  "address_id": 1,
  "items": [
    {
      "goods_id": 1,
      "spec_id": 1,
      "quantity": 1
    }
  ],
  "remark": "string"
}
```

#### 3.4.5 支付模块

| API路径 | HTTP方法 | Controller | 功能描述 | 是否需要认证 |
|---------|----------|------------|----------|--------------|
| /api/payment/prepay/ | POST | payment/views.py | 预支付（获取支付参数） | 是 |
| /api/payment/notify/wechat/ | POST | payment/views.py | 微信支付回调 | 否 |
| /api/payment/notify/alipay/ | POST | payment/views.py | 支付宝回调 | 否 |
| /api/payment/status/{order_id}/ | GET | payment/views.py | 查询支付状态 | 是 |

**预支付请求体：**
```json
{
  "order_id": 1,
  "pay_type": 1
}
```

**预支付响应体：**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "order_no": "string",
    "pay_params": {}
  }
}
```

#### 3.4.6 收货地址模块

| API路径 | HTTP方法 | Controller | 功能描述 | 是否需要认证 |
|---------|----------|------------|----------|--------------|
| /api/addresses/ | GET | addresses/views.py | 获取地址列表 | 是 |
| /api/addresses/{id}/ | GET | addresses/views.py | 获取地址详情 | 是 |
| /api/addresses/ | POST | addresses/views.py | 添加地址 | 是 |
| /api/addresses/{id}/ | PUT | addresses/views.py | 更新地址 | 是 |
| /api/addresses/{id}/ | DELETE | addresses/views.py | 删除地址 | 是 |
| /api/addresses/{id}/default/ | POST | addresses/views.py | 设置默认地址 | 是 |

**添加地址请求体：**
```json
{
  "name": "string",
  "phone": "string",
  "province": "string",
  "city": "string",
  "district": "string",
  "detail": "string",
  "is_default": false
}
```

#### 3.4.7 统计模块

| API路径 | HTTP方法 | Controller | 功能描述 | 是否需要认证 |
|---------|----------|------------|----------|--------------|
| /api/statistics/dashboard/ | GET | statistics/views.py | 获取仪表盘数据 | 管理员 |
| /api/statistics/sales/ | GET | statistics/views.py | 获取销售统计 | 管理员 |
| /api/statistics/users/ | GET | statistics/views.py | 获取用户统计 | 管理员 |
| /api/statistics/goods/ | GET | statistics/views.py | 获取商品统计 | 管理员 |

**仪表盘响应体：**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total_users": 1000,
    "total_goods": 500,
    "total_orders": 5000,
    "total_sales": 100000,
    "today_users": 50,
    "today_orders": 100,
    "today_sales": 2000
  }
}
```

### 3.5 第三方集成

#### 3.5.1 微信登录流程

```
1. 前端获取code（小程序调用wx.login，H5跳转微信授权页面）
2. 前端将code发送给后端
3. 后端使用code调用微信接口获取openid和session_key
4. 后端根据openid查找或创建用户
5. 后端生成JWT token返回给前端
6. 前端保存token，后续请求携带token
```

#### 3.5.2 微信支付流程

```
1. 用户提交订单
2. 前端调用预支付接口
3. 后端生成订单，调用微信统一下单接口
4. 后端返回支付参数给前端
5. 前端调用微信支付SDK完成支付
6. 微信服务器回调后端支付结果
7. 后端更新订单状态
8. 前端轮询或WebSocket获取支付结果
```

#### 3.5.3 短信服务

- 使用阿里云短信或腾讯云短信
- 短信验证码有效期5分钟
- 同一手机号1分钟内只能发送一次
- 每日每个手机号最多发送5次

### 3.6 Celery异步任务设计

#### 3.6.1 技术选型

| 技术 | 版本 | 用途 |
|------|------|------|
| Celery | 5.x | 分布式任务队列 |
| Redis | 7.x | Celery消息代理(Broker) |
| Celery Beat | - | 定时任务调度 |

#### 3.6.2 任务模块结构

```
backend/
└── apps/
    └── tasks/                  # 任务模块
        ├── __init__.py
        ├── apps.py
        ├── celery.py           # Celery配置
        ├── tasks.py            # 任务定义
        └── schedules.py        # 定时任务配置
```

#### 3.6.3 核心异步任务

| 任务名称 | 触发方式 | 功能描述 |
|----------|----------|----------|
| cancel_timeout_order | Celery Beat定时 | 取消超时未支付订单（30分钟） |
| process_payment_callback | 支付回调触发 | 处理支付回调，更新订单状态 |
| deduct_inventory | 支付成功触发 | 扣减商品库存 |
| send_order_notification | 订单状态变更触发 | 发送订单通知（短信/微信消息） |
| send_payment_notification | 支付成功触发 | 发送支付成功通知 |
| sync_order_status | Celery Beat定时 | 同步第三方支付订单状态 |
| generate_daily_report | Celery Beat定时 | 生成每日销售报表 |

#### 3.6.4 定时任务配置

```python
# schedules.py
from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    'cancel_timeout_order': {
        'task': 'apps.tasks.tasks.cancel_timeout_order',
        'schedule': 300,
    },
    'sync_order_status': {
        'task': 'apps.tasks.tasks.sync_order_status',
        'schedule': 60,
    },
    'generate_daily_report': {
        'task': 'apps.tasks.tasks.generate_daily_report',
        'schedule': crontab(hour=2, minute=0),
    },
}
```

#### 3.6.5 任务设计示例

```python
# tasks.py
from celery import shared_task
from apps.orders.models import Order

@shared_task
def cancel_timeout_order():
    orders = Order.objects.filter(
        status=0,
        pay_status=0
    ).filter(
        created_at__lte=datetime.now() - timedelta(minutes=30)
    )
    for order in orders:
        order.status = 4
        order.cancel_time = datetime.now()
        order.save()
        restore_inventory(order)
```

### 3.7 优惠券/促销模块

#### 3.7.1 优惠券表（coupons_coupon）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | 优惠券ID |
| name | varchar(64) | NOT NULL | 优惠券名称 |
| coupon_type | tinyint | NOT NULL | 优惠券类型（1满减/2折扣/3无门槛） |
| discount_amount | decimal(10,2) | DEFAULT 0 | 优惠金额（满减/无门槛） |
| discount_rate | decimal(4,2) | DEFAULT 1 | 折扣率（0.8表示8折） |
| min_spend | decimal(10,2) | DEFAULT 0 | 最低消费金额 |
| total_count | int | NOT NULL | 总发放数量 |
| used_count | int | DEFAULT 0 | 已使用数量 |
| per_user_limit | int | DEFAULT 1 | 每人限领数量 |
| start_time | datetime | NOT NULL | 生效时间 |
| end_time | datetime | NOT NULL | 失效时间 |
| status | tinyint | DEFAULT 1 | 状态（0禁用/1启用） |
| created_at | datetime | NOT NULL | 创建时间 |
| updated_at | datetime | NOT NULL | 更新时间 |

#### 3.7.2 用户优惠券表（coupons_usercoupon）

| 字段名 | 类型 | 约束 | 说明 |
|--------|------|------|------|
| id | int | PRIMARY KEY, AUTO_INCREMENT | ID |
| user_id | int | FOREIGN KEY, NOT NULL | 用户ID |
| coupon_id | int | FOREIGN KEY, NOT NULL | 优惠券ID |
| order_id | int | FOREIGN KEY | 使用订单ID（未使用为NULL） |
| status | tinyint | DEFAULT 0 | 状态（0未使用/1已使用/2已过期） |
| receive_time | datetime | NOT NULL | 领取时间 |
| used_time | datetime | - | 使用时间 |
| created_at | datetime | NOT NULL | 创建时间 |
| updated_at | datetime | NOT NULL | 更新时间 |

#### 3.7.3 优惠券API接口

| API路径 | HTTP方法 | Controller | 功能描述 | 是否需要认证 |
|---------|----------|------------|----------|--------------|
| /api/coupons/ | GET | coupons/views.py | 获取可用优惠券列表 | 是 |
| /api/coupons/{id}/ | GET | coupons/views.py | 获取优惠券详情 | 是 |
| /api/coupons/{id}/receive/ | POST | coupons/views.py | 领取优惠券 | 是 |
| /api/coupons/my/ | GET | coupons/views.py | 获取我的优惠券 | 是 |
| /api/admin/coupons/ | GET | coupons/views.py | 管理员获取优惠券列表 | 管理员 |
| /api/admin/coupons/ | POST | coupons/views.py | 管理员添加优惠券 | 管理员 |
| /api/admin/coupons/{id}/ | PUT | coupons/views.py | 管理员更新优惠券 | 管理员 |
| /api/admin/coupons/{id}/ | DELETE | coupons/views.py | 管理员删除优惠券 | 管理员 |

**创建优惠券请求体：**
```json
{
  "name": "string",
  "coupon_type": 1,
  "discount_amount": 10,
  "discount_rate": 1,
  "min_spend": 100,
  "total_count": 1000,
  "per_user_limit": 1,
  "start_time": "2026-01-01 00:00:00",
  "end_time": "2026-01-31 23:59:59"
}
```

**领取优惠券响应体：**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "coupon_id": 1,
    "name": "string",
    "discount_amount": 10,
    "min_spend": 100,
    "end_time": "2026-01-31 23:59:59"
  }
}
```

### 3.8 文件存储服务设计

#### 3.8.1 技术选型

| 技术 | 用途 |
|------|------|
| 阿里云OSS | 文件存储服务 |
| 阿里云CDN | 静态资源加速 |
| Pillow | 图片处理（压缩、裁剪） |

#### 3.8.2 架构设计

```
┌─────────────┐     ┌───────────┐     ┌──────────────┐
│  前端上传   │ ──→ │ Django API│ ──→ │ 阿里云OSS    │
└─────────────┘     └───────────┘     └──────────────┘
                                          │
                                          ▼
                                    ┌──────────────┐
                                    │   阿里云CDN  │
                                    └──────────────┘
                                          │
                                          ▼
                                    ┌──────────────┐
                                    │   用户访问    │
                                    └──────────────┘
```

#### 3.8.3 上传流程

```
1. 前端调用上传API，携带文件
2. 后端验证文件类型和大小
3. 后端压缩图片（如果是图片）
4. 后端生成唯一文件名（时间戳+随机串）
5. 后端上传文件到阿里云OSS
6. 后端返回文件URL（CDN加速地址）
```

#### 3.8.4 文件上传API

| API路径 | HTTP方法 | Controller | 功能描述 | 是否需要认证 |
|---------|----------|------------|----------|--------------|
| /api/upload/image/ | POST | upload/views.py | 上传图片 | 是 |
| /api/upload/file/ | POST | upload/views.py | 上传文件 | 管理员 |

**上传图片请求体：**
| 参数 | 类型 | 说明 |
|------|------|------|
| file | File | 图片文件 |
| type | string | 图片类型（goods/avatar/category） |

**上传图片响应体：**
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "url": "https://cdn.example.com/images/goods/20260101120000_abc.jpg",
    "width": 800,
    "height": 800,
    "size": 102400
  }
}
```

#### 3.8.5 文件处理配置

| 配置项 | 值 | 说明 |
|--------|------|------|
| 允许文件类型 | jpg, jpeg, png, gif, webp | 图片类型 |
| 最大文件大小 | 10MB | 单文件限制 |
| 商品图片尺寸 | 800x800 | 商品主图尺寸 |
| 缩略图尺寸 | 200x200 | 缩略图尺寸 |
| 头像尺寸 | 200x200 | 用户头像尺寸 |

### 3.9 错误码定义表

#### 3.9.1 用户模块（10xxx）

| 错误码 | 错误信息 | 说明 |
|--------|----------|------|
| 10001 | 用户不存在 | 用户名/手机号不存在 |
| 10002 | 密码错误 | 登录密码不正确 |
| 10003 | 用户已存在 | 用户名/手机号已注册 |
| 10004 | 用户已禁用 | 用户账号被禁用 |
| 10005 | 验证码错误 | 短信验证码不正确 |
| 10006 | 验证码已过期 | 短信验证码超过有效期 |
| 10007 | 验证码发送频繁 | 短信发送过于频繁 |
| 10008 | 请先登录 | 用户未登录 |
| 10009 | 登录已过期 | Token已过期 |
| 10010 | 权限不足 | 用户权限不够 |

#### 3.9.2 商品模块（20xxx）

| 错误码 | 错误信息 | 说明 |
|--------|----------|------|
| 20001 | 商品不存在 | 商品ID不存在 |
| 20002 | 商品已下架 | 商品未上架 |
| 20003 | 库存不足 | 商品库存不够 |
| 20004 | 分类不存在 | 分类ID不存在 |
| 20005 | 规格不存在 | 规格ID不存在 |
| 20006 | SKU已存在 | 商品SKU已被占用 |

#### 3.9.3 订单模块（30xxx）

| 错误码 | 错误信息 | 说明 |
|--------|----------|------|
| 30001 | 订单不存在 | 订单ID不存在 |
| 30002 | 订单状态错误 | 当前状态无法执行该操作 |
| 30003 | 订单已取消 | 订单已被取消 |
| 30004 | 订单已完成 | 订单已完成 |
| 30005 | 商品价格变动 | 创建订单时商品价格发生变化 |
| 30006 | 收货地址不存在 | 地址ID不存在 |
| 30007 | 订单商品为空 | 创建订单时商品列表为空 |

#### 3.9.4 支付模块（40xxx）

| 错误码 | 错误信息 | 说明 |
|--------|----------|------|
| 40001 | 支付方式不支持 | 选择的支付方式不支持 |
| 40002 | 订单未支付 | 订单尚未支付 |
| 40003 | 订单已支付 | 订单已完成支付 |
| 40004 | 支付失败 | 第三方支付失败 |
| 40005 | 支付金额错误 | 支付金额与订单金额不符 |
| 40006 | 退款失败 | 退款操作失败 |
| 40007 | 退款金额错误 | 退款金额超出限制 |

#### 3.9.5 优惠券模块（50xxx）

| 错误码 | 错误信息 | 说明 |
|--------|----------|------|
| 50001 | 优惠券不存在 | 优惠券ID不存在 |
| 50002 | 优惠券已过期 | 优惠券已超过有效期 |
| 50003 | 优惠券已领完 | 优惠券发放数量已用完 |
| 50004 | 已达到领取上限 | 已达到每人限领数量 |
| 50005 | 优惠券不可用 | 优惠券状态为禁用 |
| 50006 | 未满足使用条件 | 未达到最低消费金额 |
| 50007 | 优惠券已使用 | 该优惠券已被使用 |

#### 3.9.6 系统模块（90xxx）

| 错误码 | 错误信息 | 说明 |
|--------|----------|------|
| 90001 | 系统错误 | 服务器内部错误 |
| 90002 | 请求参数错误 | 请求参数格式不正确 |
| 90003 | 请求过于频繁 | 接口调用过于频繁 |
| 90004 | 文件上传失败 | 文件上传操作失败 |
| 90005 | 文件类型不支持 | 上传文件类型不允许 |
| 90006 | 文件大小超限 | 上传文件超过大小限制 |
| 90007 | 数据库操作失败 | 数据库操作出错 |

## 4. 前端PC管理端文档

### 4.1 技术栈细化

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.x | UI框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 6.x | 构建工具 |
| Ant Design | 5.x | UI组件库 |
| Zustand | 4.x | 状态管理 |
| React Router | 6.x | 路由管理 |
| Axios | 1.x | HTTP请求 |
| ECharts | 5.x | 数据可视化 |
| Day.js | 1.x | 日期处理 |

### 4.2 路由设计

```
/
├── /dashboard              # 仪表盘
├── /goods                  # 商品管理
│   ├── /goods/list         # 商品列表
│   ├── /goods/add          # 添加商品
│   └── /goods/edit/:id     # 编辑商品
├── /categories             # 分类管理
│   ├── /categories/list    # 分类列表
│   └── /categories/add     # 添加分类
├── /orders                 # 订单管理
│   ├── /orders/list        # 订单列表
│   └── /orders/detail/:id  # 订单详情
├── /users                  # 用户管理
│   ├── /users/list         # 用户列表
│   └── /users/detail/:id   # 用户详情
├── /statistics             # 数据统计
│   ├── /statistics/sales   # 销售统计
│   ├── /statistics/users   # 用户统计
│   └── /statistics/goods   # 商品统计
├── /settings               # 系统设置
│   ├── /settings/profile   # 个人设置
│   └── /settings/system    # 系统设置
└── /login                  # 登录页
```

### 4.3 页面清单

#### 4.3.1 登录页（/login）

**功能：**
- 账号密码登录
- 记住我功能
- 密码重置链接

**组件：**
- LoginForm
- Logo

#### 4.3.2 仪表盘（/dashboard）

**功能：**
- 数据概览卡片（用户数、商品数、订单数、销售额）
- 今日数据统计
- 销售趋势图表（近7天）
- 订单状态分布
- 热门商品排行

**组件：**
- StatCard
- SalesChart
- OrderStatusChart
- HotGoodsList

#### 4.3.3 商品管理

**商品列表（/goods/list）：**
- 商品表格展示
- 搜索、筛选（分类、上架状态）
- 分页
- 批量操作（上架、下架、删除）
- 添加商品、编辑商品入口

**添加/编辑商品（/goods/add /goods/edit/:id）：**
- 商品基本信息表单
- 商品图片上传
- 规格管理（动态添加规格）
- 富文本编辑器（商品描述）
- 表单验证

#### 4.3.4 分类管理

**分类列表（/categories/list）：**
- 树形结构展示分类
- 搜索
- 添加、编辑、删除分类
- 排序

**添加分类（/categories/add）：**
- 分类名称
- 父分类选择
- 图标上传
- 排序号

#### 4.3.5 订单管理

**订单列表（/orders/list）：**
- 订单表格展示
- 搜索（订单号、用户名、手机号）
- 筛选（订单状态、支付状态、时间范围）
- 分页
- 导出订单

**订单详情（/orders/detail/:id）：**
- 订单基本信息
- 商品列表
- 收货地址
- 支付信息
- 操作记录（修改状态、发货）

#### 4.3.6 用户管理

**用户列表（/users/list）：**
- 用户表格展示
- 搜索（用户名、手机号）
- 筛选（状态）
- 分页
- 批量操作（启用、禁用）

**用户详情（/users/detail/:id）：**
- 用户基本信息
- 订单记录
- 收藏记录

#### 4.3.7 数据统计

**销售统计（/statistics/sales）：**
- 销售趋势图表（日/周/月）
- 销售排行（商品、分类）
- 支付方式分布

**用户统计（/statistics/users）：**
- 用户增长趋势
- 用户地域分布
- 用户性别分布

**商品统计（/statistics/goods）：**
- 商品销售排行
- 库存预警
- 分类商品数量

#### 4.3.8 系统设置

**个人设置（/settings/profile）：**
- 修改密码
- 修改头像
- 修改个人信息

**系统设置（/settings/system）：**
- 网站配置
- 支付配置
- 短信配置

### 4.4 项目结构

```
frontend/admin/
├── index.html                 # 入口文件
├── package.json               # 项目依赖配置
├── vite.config.ts             # Vite配置文件
├── tsconfig.json              # TypeScript配置文件
├── src/
│   ├── main.tsx                 # 入口文件
│   ├── App.tsx                 # 根组件
│   ├── routes/                 # 路由配置
│   │   └── index.tsx           # 路由配置文件
│   ├── pages/                  # 页面组件
│   │   ├── Login/              # 登录页
│   │   ├── Dashboard/          # 仪表盘
│   │   ├── Goods/              # 商品管理
│   │   ├── Categories/         # 分类管理
│   │   ├── Orders/             # 订单管理
│   │   ├── Users/              # 用户管理
│   │   ├── Statistics/         # 数据统计
│   │   └── Settings/           # 系统设置
│   ├── components/             # 公共组件
│   │   ├── Layout/             # 布局组件
│   │   ├── Sidebar/            # 侧边栏
│   │   ├── Header/             # 头部
│   │   ├── StatCard/           # 统计卡片
│   │   └── ...
│   ├── store/                  # Zustand状态管理
│   │   ├── auth.ts             # 认证状态
│   │   └── index.ts            # 状态管理模块初始化
│   ├── api/                    # API请求
│   │   ├── users.ts            # 用户模块API
│   │   ├── goods.ts            # 商品模块API
│   │   ├── orders.ts           # 订单模块API
│   │   └── ...
│   ├── utils/                  # 工具函数
│   │   ├── request.ts          # Axios封装
│   │   ├── storage.ts          # 本地存储
│   │   └── index.ts            # 工具函数模块初始化
│   ├── types/                  # TypeScript类型定义
│   │   ├── users.ts            # 用户模块类型
│   │   ├── goods.ts            # 商品模块类型
│   │   ├── orders.ts           # 订单模块类型
│   │   └── index.ts            # 类型定义模块初始化
│   └── styles/                 # 全局样式
│       └── index.css           # 全局样式文件
```

### 4.5 状态管理设计

```typescript
// store/auth.ts
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}
```

### 4.6 API封装设计

```typescript
// api/request.ts
const request = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

## 5. 前端移动用户端文档

### 5.1 技术方案

#### 5.1.1 微信小程序

| 技术 | 版本 | 用途 |
|------|------|------|
| Taro | 3.x | 多端开发框架 |
| Taro UI | 3.x | UI组件库 |
| TypeScript | 5.x | 类型安全 |
| Zustand | 4.x | 状态管理 |

#### 5.1.2 H5端

- 复用Taro代码，构建H5版本
- 响应式设计适配不同屏幕尺寸
- 微信H5使用微信JS-SDK实现微信登录和支付

### 5.2 页面清单

#### 5.2.1 用户端页面

| 页面路径 | 功能描述 |
|----------|----------|
| /pages/index/index | 首页（轮播图、分类导航、热门商品、新品推荐） |
| /pages/category/index | 分类页（分类列表、商品瀑布流） |
| /pages/goods/detail | 商品详情页（商品信息、规格选择、加入购物车、立即购买） |
| /pages/cart/index | 购物车页（商品列表、数量修改、删除、结算） |
| /pages/order/list | 订单列表页（订单状态筛选、订单卡片） |
| /pages/order/detail | 订单详情页（订单信息、商品列表、确认收货、申请退款） |
| /pages/order/create | 创建订单页（地址选择、商品列表、支付方式） |
| /pages/user/index | 个人中心页（头像、昵称、订单入口、地址管理、设置） |
| /pages/user/address | 地址管理页（地址列表、添加/编辑地址） |
| /pages/user/settings | 设置页（修改密码、关于我们） |
| /pages/search/index | 搜索页（搜索历史、热门搜索、搜索结果） |

#### 5.2.2 页面流程图

```
首页 → 分类页 → 商品列表 → 商品详情 → 加入购物车/立即购买
                                    ↓
                               创建订单 → 选择地址 → 确认支付
                                    ↓
                               订单列表 → 订单详情 → 确认收货/申请退款

首页 → 购物车 → 结算 → 创建订单

首页 → 个人中心 → 订单管理/地址管理/设置
```

### 5.3 微信登录流程（小程序）

```
1. 用户进入小程序
2. 调用 wx.login() 获取 code
3. 将 code 发送给后端 API /api/users/wechat/login/
4. 后端使用 code 调用微信接口获取 openid
5. 后端根据 openid 查找或创建用户，生成 JWT token
6. 前端保存 token，后续请求携带 Authorization 头
```

### 5.4 微信支付流程（小程序）

```
1. 用户提交订单，创建订单成功
2. 调用预支付接口 /api/payment/prepay/
3. 后端调用微信统一下单接口，获取 prepay_id
4. 后端返回支付参数（appId、timeStamp、nonceStr、package、signType、paySign）
5. 前端调用 wx.requestPayment() 发起支付
6. 支付成功后，微信回调后端通知接口
7. 后端更新订单状态为已支付
8. 前端获取支付结果，跳转到订单详情页
```

### 5.5 项目结构

```
frontend/mobile/
├── package.json               # 项目依赖配置
├── tsconfig.json              # TypeScript配置文件
├── tsconfig.json              # TypeScript配置文件
├── config/                    # 配置文件目录
├── config/
│   ├── dev.js                  # 开发环境配置文件
│   └── index.js                # 环境变量配置文件初始化
└── src/
    ├── app.tsx                 # 应用入口
    ├── app.config.ts           # 小程序配置
    ├── pages/                  # 页面组件
    │   ├── index/              # 首页
    │   ├── category/           # 分类页
    │   ├── goods/              # 商品页
    │   ├── cart/               # 购物车页
    │   ├── order/              # 订单页
    │   └── user/               # 个人中心页
    ├── components/             # 公共组件
    │   ├── GoodsCard/          # 商品卡片
    │   ├── CartItem/           # 购物车项
    │   ├── OrderCard/          # 订单卡片
    │   └── ...
    ├── store/                  # 状态管理
    │   ├── index.ts            # 状态管理模块初始化
    │   ├── cart.ts             # 购物车状态管理
    │   ├── order.ts            # 订单状态管理
    │   └── user.ts             # 用户状态管理
    ├── api/                    # API请求
    │   ├── index.ts            # API请求模块初始化
    │   ├── goods.ts            # 商品模块API请求
    │   ├── cart.ts             # 购物车模块API请求
    │   ├── order.ts            # 订单模块API请求
    │   └── user.ts             # 用户模块API请求
    ├── utils/                  # 工具函数
    │   ├── request.ts          # 请求工具函数模块初始化
    │   └── storage.ts          # 存储工具函数模块初始化
    └── styles/                 # 全局样式
        └── index.scss          # 全局样式文件初始化
```

### 5.6 小程序配置

```json
{
  "pages": [
    "pages/index/index",
    "pages/category/index",
    "pages/goods/detail",
    "pages/cart/index",
    "pages/order/list",
    "pages/order/detail",
    "pages/order/create",
    "pages/user/index",
    "pages/user/address",
    "pages/user/settings",
    "pages/search/index"
  ],
  "window": {
    "navigationBarTitleText": "商城",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#ff5722",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/tab/home.png",
        "selectedIconPath": "images/tab/home-active.png"
      },
      {
        "pagePath": "pages/category/index",
        "text": "分类",
        "iconPath": "images/tab/category.png",
        "selectedIconPath": "images/tab/category-active.png"
      },
      {
        "pagePath": "pages/cart/index",
        "text": "购物车",
        "iconPath": "images/tab/cart.png",
        "selectedIconPath": "images/tab/cart-active.png"
      },
      {
        "pagePath": "pages/user/index",
        "text": "我的",
        "iconPath": "images/tab/user.png",
        "selectedIconPath": "images/tab/user-active.png"
      }
    ]
  },
  "permission": {
    "scope.userLocation": {
      "desc": "用于获取用户位置，提供定位服务"
    }
  }
}
```

## 6. 项目目录结构规范

### 6.1 整体目录结构

```
shop/                           # 项目根目录
├── PROJECT_REFERENCE.md        # 项目引用文档
├── backend/                    # 后端Django项目
│   ├── manage.py               # 管理脚本
│   ├── requirements.txt        # 项目依赖配置
│   ├── config/                 # 配置文件目录
│   ├── apps/                   # 应用目录
│   ├── utils/                  # 工具函数目录
│   └── middleware/             # 中间件目录
├── frontend/                   # 前端项目
│   ├── admin/                  # PC管理端
│   │   ├── package.json        # 项目依赖配置
│   │   ├── vite.config.ts      # Vite配置文件
│   │   ├── tsconfig.json       # TypeScript配置文件
│   │   └── src/
│   └── mobile/                 # 移动端(Taro)
│       ├── package.json        # 项目依赖配置
│       ├── tsconfig.json       # TypeScript配置文件
│       ├── config/             # 配置文件目录
│       └── src/                # 源代码目录
├── docker/                     # Docker配置
│   ├── docker-compose.yml      # Docker Compose配置
│   ├── nginx/                  # Nginx配置目录
│   │   └── nginx.conf          # Nginx配置文件
│   ├── django/                 # Django配置目录
│   │   └── Dockerfile          # Dockerfile配置
│   └── mysql/                 # MySQL配置目录
│       └── init.sql            # MySQL初始化脚本文件
└── docs/                       # 其他文档
    └── api.md                  # API文档文件
```

### 6.2 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 目录名 | 小写 + 连字符 | `user-management` |
| Python文件名 | 小写 + 下划线 | `user_service.py` |
| Python类名 | 大驼峰 | `UserService` |
| Python函数/变量 | 小写 + 下划线 | `get_user_info()` |
| TypeScript文件名 | 小写 + 连字符 | `user-info.tsx` |
| TypeScript组件名 | 大驼峰 | `UserInfo.tsx` |
| TypeScript变量/函数 | 小驼峰 | `getUserInfo()` |
| 数据库表名 | 小写 + 下划线 + 复数 | `users_user`, `goods_goods` |
| 数据库字段名 | 小写 + 下划线 | `user_name`, `created_at` |

## 7. 部署与DevOps方案

### 7.1 Docker部署

#### docker-compose.yml

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: shop-mysql
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: shop
    volumes:
      - ./docker/mysql/init.sql:/docker-entrypoint-initdb.d/init.sql
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - shop-network

  redis:
    image: redis:7.0
    container_name: shop-redis
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    networks:
      - shop-network

  django:
    build: ./docker/django
    container_name: shop-django
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000
    environment:
      - DJANGO_SETTINGS_MODULE=config.settings.production
      - DATABASE_URL=mysql://root:password@mysql:3306/shop
      - REDIS_URL=redis://redis:6379/0
    volumes:
      - ./backend:/app
    ports:
      - "8000:8000"
    depends_on:
      - mysql
      - redis
    networks:
      - shop-network

  nginx:
    image: nginx:latest
    container_name: shop-nginx
    volumes:
      - ./docker/nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./frontend/admin/dist:/usr/share/nginx/html/admin
      - ./frontend/mobile/dist:/usr/share/nginx/html/mobile
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - django
    networks:
      - shop-network

volumes:
  mysql_data:
  redis_data:

networks:
  shop-network:
    driver: bridge
```

#### Nginx配置

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # PC管理端
    location /admin/ {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /admin/index.html;
    }

    # H5移动端
    location /mobile/ {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /mobile/index.html;
    }

    # API接口
    location /api/ {
        proxy_pass http://django:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # HTTPS配置
    listen 443 ssl;
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
}
```

### 7.2 CI/CD流程

```
1. 开发者提交代码到Git仓库
2. GitHub Actions/GitLab CI触发构建
3. 执行代码检查（flake8、eslint、prettier）
4. 运行单元测试
5. 构建前端项目（Vite build）
6. 构建Docker镜像
7. 推送镜像到Docker仓库
8. 部署到生产环境
9. 执行健康检查
```

### 7.3 环境配置

| 环境 | 用途 | 配置文件 |
|------|------|----------|
| development | 开发环境 | settings.py |
| staging | 测试环境 | settings.staging.py |
| production | 生产环境 | settings.production.py |

**环境变量说明：**

| 变量名 | 说明 |
|--------|------|
| SECRET_KEY | Django密钥 |
| DEBUG | 调试模式 |
| DATABASE_URL | 数据库连接 |
| REDIS_URL | Redis连接 |
| WX_APPID | 微信小程序AppID |
| WX_SECRET | 微信小程序Secret |
| WX_PAY_MCH_ID | 微信支付商户ID |
| WX_PAY_KEY | 微信支付密钥 |
| ALIPAY_APPID | 支付宝AppID |
| ALIPAY_PRIVATE_KEY | 支付宝私钥 |

## 8. 安全策略

### 8.1 认证与权限

- JWT认证，Token存储在localStorage
- 密码使用bcrypt加密存储
- 接口权限控制：公开接口、用户接口、管理员接口
- 敏感操作需要二次验证

### 8.2 数据安全

- SQL注入防护：使用Django ORM，禁止拼接SQL
- XSS防护：前端转义，后端过滤
- CSRF防护：Django自带CSRF保护
- 文件上传：限制文件类型和大小，存储在独立服务器

### 8.3 接口安全

- 接口限流：防止恶意请求
- 敏感数据加密传输：HTTPS
- 请求签名验证：重要接口添加签名
- 日志记录：记录关键操作日志

## 9. 性能优化

### 9.1 后端优化

- Redis缓存热点数据
- 数据库索引优化
- 分页查询优化
- 使用gunicorn多进程部署
- 数据库连接池

### 9.2 前端优化

- 代码分割：按需加载
- 图片优化：使用WebP格式，懒加载
- 缓存策略：HTTP缓存、Service Worker
- 打包优化：Tree Shaking、代码压缩
- CDN加速：静态资源CDN分发

---

**文档版本**: v1.0  
**创建时间**: 2026-07-07  
**适用项目**: 全栈商城项目