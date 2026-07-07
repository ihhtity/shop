CREATE DATABASE IF NOT EXISTS shop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE shop;

CREATE TABLE IF NOT EXISTS users_user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(128) NOT NULL,
    nickname VARCHAR(100),
    phone VARCHAR(20) UNIQUE,
    email VARCHAR(254) UNIQUE,
    avatar VARCHAR(500),
    is_admin TINYINT(1) DEFAULT 0,
    status TINYINT(1) DEFAULT 1,
    date_joined DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME NULL,
    openid VARCHAR(100) UNIQUE NULL
);

INSERT INTO users_user (username, password, nickname, phone, is_admin, status) VALUES
('admin', 'pbkdf2_sha256$600000$test$test', '管理员', '13800138000', 1, 1);

CREATE TABLE IF NOT EXISTS goods_category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id BIGINT NULL,
    sort_order INT DEFAULT 0,
    status TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES goods_category(id)
);

CREATE TABLE IF NOT EXISTS goods_goods (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    category_id BIGINT NULL,
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    original_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    stock INT NOT NULL DEFAULT 0,
    sales INT NOT NULL DEFAULT 0,
    description TEXT,
    images TEXT,
    is_on_sale TINYINT(1) DEFAULT 1,
    is_hot TINYINT(1) DEFAULT 0,
    is_new TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES goods_category(id)
);

CREATE TABLE IF NOT EXISTS goods_specification (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    goods_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    value VARCHAR(100) NOT NULL,
    price_offset DECIMAL(10,2) DEFAULT 0,
    stock INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (goods_id) REFERENCES goods_goods(id)
);

CREATE TABLE IF NOT EXISTS orders_order (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_no VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    address_id BIGINT NULL,
    total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    pay_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    pay_type TINYINT(1) DEFAULT 0,
    pay_status TINYINT(1) DEFAULT 0,
    status TINYINT(1) DEFAULT 0,
    remark VARCHAR(500),
    cancel_time DATETIME NULL,
    pay_time DATETIME NULL,
    finish_time DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_user(id),
    FOREIGN KEY (address_id) REFERENCES addresses_address(id)
);

CREATE TABLE IF NOT EXISTS orders_orderitem (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    goods_id BIGINT NOT NULL,
    goods_name VARCHAR(200) NOT NULL,
    goods_image VARCHAR(500),
    spec_id BIGINT NULL,
    spec_name VARCHAR(200),
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders_order(id),
    FOREIGN KEY (goods_id) REFERENCES goods_goods(id),
    FOREIGN KEY (spec_id) REFERENCES goods_specification(id)
);

CREATE TABLE IF NOT EXISTS addresses_address (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    province VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    detail VARCHAR(500) NOT NULL,
    is_default TINYINT(1) DEFAULT 0,
    status TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_user(id)
);

CREATE TABLE IF NOT EXISTS coupons_coupon (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    coupon_type TINYINT(1) DEFAULT 1,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    discount_rate DECIMAL(4,2) DEFAULT 0,
    min_spend DECIMAL(10,2) DEFAULT 0,
    total_count INT DEFAULT 0,
    used_count INT DEFAULT 0,
    per_user_limit INT DEFAULT 1,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coupons_usercoupon (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    coupon_id BIGINT NOT NULL,
    order_id BIGINT NULL,
    status TINYINT(1) DEFAULT 0,
    used_time DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users_user(id),
    FOREIGN KEY (coupon_id) REFERENCES coupons_coupon(id),
    FOREIGN KEY (order_id) REFERENCES orders_order(id)
);

CREATE TABLE IF NOT EXISTS payment_paymentrecord (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    pay_type TINYINT(1) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    transaction_no VARCHAR(100) NULL,
    status TINYINT(1) DEFAULT 0,
    pay_time DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders_order(id)
);