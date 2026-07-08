USE shop;

-- 用户数据
INSERT IGNORE INTO shop_user (id, username, password, email, phone, nickname, avatar, gender, birth_date, is_active, is_staff, is_superuser, date_joined, first_name, last_name) VALUES
(1, 'user001', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user001@shop.com', '13800138001', '张三', 'https://picsum.photos/id/1005/100/100', 1, '1990-01-01', 1, 0, 0, '2024-01-01 00:00:00', '张', '三'),
(2, 'user002', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user002@shop.com', '13800138002', '李四', 'https://picsum.photos/id/1012/100/100', 0, '1995-05-15', 1, 0, 0, '2024-02-01 00:00:00', '李', '四'),
(3, 'user003', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user003@shop.com', '13800138003', '王五', 'https://picsum.photos/id/1025/100/100', 1, '1998-08-20', 1, 0, 0, '2024-02-15 00:00:00', '王', '五'),
(4, 'user004', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user004@shop.com', '13800138004', '赵六', 'https://picsum.photos/id/1074/100/100', 0, '2000-11-30', 1, 0, 0, '2024-03-01 00:00:00', '赵', '六'),
(5, 'user005', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user005@shop.com', '13800138005', '孙七', 'https://picsum.photos/id/1066/100/100', 1, '1993-04-10', 1, 0, 0, '2024-03-15 00:00:00', '孙', '七'),
(6, 'user006', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user006@shop.com', '13800138006', '周八', 'https://picsum.photos/id/1084/100/100', 0, '1997-07-25', 1, 0, 0, '2024-04-01 00:00:00', '周', '八'),
(7, 'user007', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user007@shop.com', '13800138007', '吴九', 'https://picsum.photos/id/1033/100/100', 1, '1999-09-05', 1, 0, 0, '2024-04-15 00:00:00', '吴', '九'),
(8, 'user008', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user008@shop.com', '13800138008', '郑十', 'https://picsum.photos/id/1043/100/100', 0, '1992-12-18', 1, 0, 0, '2024-05-01 00:00:00', '郑', '十'),
(9, 'user009', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user009@shop.com', '13800138009', '冯十一', 'https://picsum.photos/id/1057/100/100', 1, '1996-03-22', 1, 0, 0, '2024-05-15 00:00:00', '冯', '十一'),
(10, 'user010', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'user010@shop.com', '13800138010', '陈十二', 'https://picsum.photos/id/1062/100/100', 0, '2001-06-08', 1, 0, 0, '2024-06-01 00:00:00', '陈', '十二');

-- 管理员数据
INSERT IGNORE INTO shop_admin (id, username, password, email, phone, avatar, role, is_active, last_login, created_at, updated_at) VALUES
(1, 'admin', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'admin@shop.com', '13800138000', 'https://picsum.photos/id/1/100/100', 1, 1, '2024-06-01 10:00:00', '2024-01-01 00:00:00', '2024-06-01 10:00:00'),
(2, 'manager', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'manager@shop.com', '13800138011', 'https://picsum.photos/id/2/100/100', 2, 1, '2024-06-01 09:00:00', '2024-01-15 00:00:00', '2024-06-01 09:00:00'),
(3, 'operator1', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'operator1@shop.com', '13800138012', 'https://picsum.photos/id/3/100/100', 3, 1, NULL, '2024-02-01 00:00:00', '2024-02-01 00:00:00'),
(4, 'operator2', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'operator2@shop.com', '13800138013', 'https://picsum.photos/id/4/100/100', 3, 1, NULL, '2024-02-15 00:00:00', '2024-02-15 00:00:00'),
(5, 'operator3', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'operator3@shop.com', '13800138014', 'https://picsum.photos/id/5/100/100', 3, 1, NULL, '2024-03-01 00:00:00', '2024-03-01 00:00:00'),
(6, 'admin2', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'admin2@shop.com', '13800138015', 'https://picsum.photos/id/6/100/100', 2, 1, '2024-05-30 14:00:00', '2024-03-15 00:00:00', '2024-05-30 14:00:00'),
(7, 'operator4', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'operator4@shop.com', '13800138016', 'https://picsum.photos/id/7/100/100', 3, 1, NULL, '2024-04-01 00:00:00', '2024-04-01 00:00:00'),
(8, 'operator5', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'operator5@shop.com', '13800138017', 'https://picsum.photos/id/8/100/100', 3, 1, NULL, '2024-04-15 00:00:00', '2024-04-15 00:00:00'),
(9, 'admin3', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'admin3@shop.com', '13800138018', 'https://picsum.photos/id/9/100/100', 2, 1, NULL, '2024-05-01 00:00:00', '2024-05-01 00:00:00'),
(10, 'operator6', 'pbkdf2_sha256$720000$majUdqy56fdvaZHExL2OjG$ReutXAlGJWuQygyPZT3qbl8y38FYnpGUMW5vI87S66g=', 'operator6@shop.com', '13800138019', 'https://picsum.photos/id/10/100/100', 3, 0, NULL, '2024-05-15 00:00:00', '2024-05-15 00:00:00');

-- 商品分类数据
INSERT IGNORE INTO shop_category (id, name, parent_id, level, sort_order, icon, status) VALUES
(1, '电子产品', NULL, 1, 1, '📱', 1),
(2, '手机', 1, 2, 1, '📲', 1),
(3, '电脑', 1, 2, 2, '💻', 1),
(4, '服装', NULL, 1, 2, '👕', 1),
(5, '男装', 4, 2, 1, '👔', 1),
(6, '女装', 4, 2, 2, '👗', 1),
(7, '食品', NULL, 1, 3, '🍎', 1),
(8, '生鲜', 7, 2, 1, '🥩', 1),
(9, '零食', 7, 2, 2, '🍪', 1),
(10, '家居', NULL, 1, 4, '🏠', 1);

-- 商品数据
INSERT IGNORE INTO shop_goods (id, category_id, name, sku, description, images, price, original_price, stock, sales, is_on_sale, is_hot, is_new, sort_order) VALUES
(1, 2, 'iPhone 15 Pro Max', 'SKU001', '苹果最新旗舰手机，搭载A17 Pro芯片', '["https://picsum.photos/id/10/400/400","https://picsum.photos/id/11/400/400"]', 9999.00, 10999.00, 100, 500, 1, 1, 1, 1),
(2, 2, '华为 Mate 60 Pro', 'SKU002', '国产旗舰手机，支持卫星通话', '["https://picsum.photos/id/20/400/400","https://picsum.photos/id/21/400/400"]', 6999.00, 7499.00, 200, 800, 1, 1, 1, 2),
(3, 3, 'MacBook Pro 16寸', 'SKU003', '苹果专业级笔记本电脑', '["https://picsum.photos/id/30/400/400","https://picsum.photos/id/31/400/400"]', 19999.00, 21999.00, 50, 200, 1, 1, 0, 3),
(4, 3, '联想 ThinkPad X1', 'SKU004', '商务办公首选笔记本', '["https://picsum.photos/id/40/400/400","https://picsum.photos/id/41/400/400"]', 12999.00, 13999.00, 150, 300, 1, 0, 1, 4),
(5, 5, '纯棉商务衬衫', 'SKU005', '高品质纯棉面料，舒适透气', '["https://picsum.photos/id/50/400/400","https://picsum.photos/id/51/400/400"]', 299.00, 399.00, 500, 1000, 1, 1, 0, 5),
(6, 6, '夏季连衣裙', 'SKU006', '优雅气质，修身显瘦', '["https://picsum.photos/id/60/400/400","https://picsum.photos/id/61/400/400"]', 399.00, 499.00, 300, 600, 1, 1, 1, 6),
(7, 8, '进口牛排', 'SKU007', '澳洲M5级和牛，鲜嫩多汁', '["https://picsum.photos/id/70/400/400","https://picsum.photos/id/71/400/400"]', 199.00, 259.00, 200, 400, 1, 1, 0, 7),
(8, 9, '坚果礼盒', 'SKU008', '精选六种坚果，营养丰富', '["https://picsum.photos/id/80/400/400","https://picsum.photos/id/81/400/400"]', 168.00, 198.00, 1000, 2000, 1, 0, 1, 8),
(9, 10, '北欧风台灯', 'SKU009', '简约设计，护眼照明', '["https://picsum.photos/id/90/400/400","https://picsum.photos/id/91/400/400"]', 199.00, 249.00, 500, 800, 1, 0, 0, 9),
(10, 2, '小米14 Ultra', 'SKU010', '影像旗舰，徕卡光学镜头', '["https://picsum.photos/id/100/400/400","https://picsum.photos/id/101/400/400"]', 5999.00, 6499.00, 300, 1200, 1, 1, 1, 10);

-- 商品规格数据
INSERT IGNORE INTO shop_specification (id, goods_id, name, value, price_offset, stock, image) VALUES
(1, 1, '颜色', '钛金属黑色', 0.00, 30, NULL),
(2, 1, '颜色', '钛金属白色', 0.00, 30, NULL),
(3, 1, '颜色', '钛金属原色', 0.00, 20, NULL),
(4, 1, '存储', '256GB', 0.00, 40, NULL),
(5, 1, '存储', '512GB', 1000.00, 40, NULL),
(6, 2, '颜色', '曜金黑', 0.00, 70, NULL),
(7, 2, '颜色', '昆仑玻璃白', 0.00, 70, NULL),
(8, 2, '存储', '256GB', 0.00, 100, NULL),
(9, 2, '存储', '512GB', 800.00, 80, NULL),
(10, 5, '尺码', 'M', 0.00, 100, NULL),
(11, 5, '尺码', 'L', 0.00, 100, NULL),
(12, 5, '尺码', 'XL', 0.00, 100, NULL),
(13, 6, '尺码', 'S', 0.00, 80, NULL),
(14, 6, '尺码', 'M', 0.00, 80, NULL),
(15, 6, '颜色', '黑色', 0.00, 100, NULL),
(16, 6, '颜色', '白色', 0.00, 100, NULL),
(17, 7, '重量', '500g', 0.00, 100, NULL),
(18, 7, '重量', '1kg', 100.00, 80, NULL),
(19, 8, '规格', '标准版', 0.00, 500, NULL),
(20, 8, '规格', '豪华版', 50.00, 300, NULL);

-- 收货地址数据
INSERT IGNORE INTO shop_address (id, user_id, name, phone, province, city, district, detail, is_default, status) VALUES
(1, 1, '张三', '13800138001', '北京市', '北京市', '朝阳区', '建国路88号SOHO现代城A座1001室', 1, 1),
(2, 1, '张三', '13800138001', '上海市', '上海市', '浦东新区', '陆家嘴环路1000号恒生银行大厦20层', 0, 1),
(3, 2, '李四', '13800138002', '广东省', '广州市', '天河区', '天河路385号太古汇商场L3层', 1, 1),
(4, 3, '王五', '13800138003', '浙江省', '杭州市', '西湖区', '文三路478号华星创业大厦15楼', 1, 1),
(5, 4, '赵六', '13800138004', '江苏省', '南京市', '玄武区', '中山路288号新街口金鹰国际购物中心', 1, 1),
(6, 5, '孙七', '13800138005', '四川省', '成都市', '锦江区', '春熙路188号IFS国际金融中心', 1, 1),
(7, 6, '周八', '13800138006', '湖北省', '武汉市', '武昌区', '楚河汉街1号万达广场', 1, 1),
(8, 7, '吴九', '13800138007', '湖南省', '长沙市', '芙蓉区', '五一广场平和堂商场', 1, 1),
(9, 8, '郑十', '13800138008', '山东省', '济南市', '历下区', '泉城路188号恒隆广场', 1, 1),
(10, 9, '冯十一', '13800138009', '辽宁省', '沈阳市', '和平区', '太原街万达广场', 1, 1);

-- 购物车数据
INSERT IGNORE INTO shop_cart (id, user_id, goods_id, spec_id, quantity, status) VALUES
(1, 1, 1, 1, 1, 1),
(2, 1, 5, 11, 2, 1),
(3, 2, 2, 6, 1, 1),
(4, 2, 7, 17, 3, 1),
(5, 3, 3, NULL, 1, 1),
(6, 3, 8, 19, 2, 1),
(7, 4, 4, NULL, 1, 1),
(8, 4, 6, 13, 1, 1),
(9, 5, 9, NULL, 1, 1),
(10, 5, 10, 6, 1, 1);

-- 优惠券数据
INSERT IGNORE INTO shop_coupon (id, name, coupon_type, discount_amount, discount_rate, min_spend, total_count, used_count, per_user_limit, start_time, end_time, status) VALUES
(1, '新人专享券', 3, 50.00, 1.00, 0, 1000, 500, 1, '2024-01-01 00:00:00', '2025-12-31 23:59:59', 1),
(2, '满100减20', 1, 20.00, 1.00, 100.00, 500, 300, 2, '2024-01-01 00:00:00', '2024-12-31 23:59:59', 1),
(3, '满500减100', 1, 100.00, 1.00, 500.00, 200, 100, 1, '2024-01-01 00:00:00', '2024-12-31 23:59:59', 1),
(4, '8折特惠券', 2, 0.00, 0.80, 200.00, 300, 150, 1, '2024-06-01 00:00:00', '2024-06-30 23:59:59', 1),
(5, '满1000减200', 1, 200.00, 1.00, 1000.00, 100, 50, 1, '2024-01-01 00:00:00', '2024-12-31 23:59:59', 1),
(6, '会员专属券', 3, 30.00, 1.00, 0, 500, 200, 1, '2024-01-01 00:00:00', '2024-12-31 23:59:59', 1),
(7, '周末特惠', 1, 30.00, 1.00, 150.00, 200, 80, 2, '2024-06-01 00:00:00', '2024-06-30 23:59:59', 1),
(8, '夏季清仓9折', 2, 0.00, 0.90, 100.00, 400, 200, 3, '2024-07-01 00:00:00', '2024-08-31 23:59:59', 1),
(9, '开学季满减', 1, 50.00, 1.00, 300.00, 300, 120, 1, '2024-08-01 00:00:00', '2024-09-30 23:59:59', 1),
(10, '双十一预热券', 1, 111.00, 1.00, 500.00, 500, 100, 1, '2024-10-01 00:00:00', '2024-11-11 23:59:59', 1);

-- 用户优惠券数据
INSERT IGNORE INTO shop_usercoupon (id, user_id, coupon_id, order_id, status, receive_time, used_time) VALUES
(1, 1, 1, NULL, 0, '2024-02-01 10:00:00', NULL),
(2, 1, 2, NULL, 0, '2024-02-05 14:30:00', NULL),
(3, 2, 1, NULL, 1, '2024-02-15 09:00:00', '2024-02-20 15:00:00'),
(4, 2, 3, NULL, 0, '2024-03-01 11:00:00', NULL),
(5, 3, 1, NULL, 0, '2024-03-01 10:00:00', NULL),
(6, 3, 4, NULL, 1, '2024-06-05 16:00:00', '2024-06-10 12:00:00'),
(7, 4, 2, NULL, 0, '2024-03-15 08:00:00', NULL),
(8, 5, 1, NULL, 0, '2024-04-01 09:30:00', NULL),
(9, 6, 5, NULL, 0, '2024-04-15 10:00:00', NULL),
(10, 7, 6, NULL, 0, '2024-05-01 11:00:00', NULL);

-- 订单数据
INSERT IGNORE INTO shop_order (id, order_no, user_id, address_id, total_amount, discount_amount, pay_amount, status, pay_status, pay_type, pay_time, ship_time, finish_time, cancel_time, remark) VALUES
(1, '2024060100001', 1, 1, 9999.00, 50.00, 9949.00, 3, 1, 1, '2024-06-01 10:30:00', '2024-06-02 14:00:00', '2024-06-05 16:00:00', NULL, '尽快发货'),
(2, '2024060500002', 2, 3, 6999.00, 100.00, 6899.00, 3, 1, 2, '2024-06-05 15:00:00', '2024-06-06 10:00:00', '2024-06-08 14:30:00', NULL, NULL),
(3, '2024061000003', 3, 4, 299.00, 20.00, 279.00, 2, 1, 1, '2024-06-10 09:00:00', '2024-06-11 11:00:00', NULL, NULL, NULL),
(4, '2024061500004', 4, 5, 399.00, 0.00, 399.00, 1, 1, 1, '2024-06-15 16:00:00', '2024-06-16 09:00:00', NULL, NULL, NULL),
(5, '2024062000005', 5, 6, 199.00, 0.00, 199.00, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(6, '2024062500006', 6, 7, 168.00, 30.00, 138.00, 3, 1, 2, '2024-06-25 14:00:00', '2024-06-26 10:00:00', '2024-06-28 15:00:00', NULL, NULL),
(7, '2024062800007', 7, 8, 19999.00, 200.00, 19799.00, 1, 1, 1, '2024-06-28 11:00:00', NULL, NULL, NULL, '贵重物品请仔细包装'),
(8, '2024070100008', 8, 9, 12999.00, 100.00, 12899.00, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL),
(9, '2024070300009', 9, 10, 5999.00, 50.00, 5949.00, 4, 0, NULL, NULL, NULL, NULL, '2024-07-03 12:00:00', '不想买了'),
(10, '2024070500010', 1, 2, 199.00, 0.00, 199.00, 3, 1, 1, '2024-07-05 18:00:00', '2024-07-06 10:00:00', '2024-07-08 14:00:00', NULL, NULL);

-- 订单商品数据
INSERT IGNORE INTO shop_orderitem (id, order_id, goods_id, goods_name, goods_image, spec_id, spec_name, price, quantity, subtotal) VALUES
(1, 1, 1, 'iPhone 15 Pro Max', 'https://picsum.photos/id/10/400/400', 1, '钛金属黑色 256GB', 9999.00, 1, 9999.00),
(2, 2, 2, '华为 Mate 60 Pro', 'https://picsum.photos/id/20/400/400', 6, '曜金黑 256GB', 6999.00, 1, 6999.00),
(3, 3, 5, '纯棉商务衬衫', 'https://picsum.photos/id/50/400/400', 11, 'L', 299.00, 1, 299.00),
(4, 4, 6, '夏季连衣裙', 'https://picsum.photos/id/60/400/400', 13, 'S 黑色', 399.00, 1, 399.00),
(5, 5, 7, '进口牛排', 'https://picsum.photos/id/70/400/400', 17, '500g', 199.00, 1, 199.00),
(6, 6, 8, '坚果礼盒', 'https://picsum.photos/id/80/400/400', 19, '标准版', 168.00, 1, 168.00),
(7, 7, 3, 'MacBook Pro 16寸', 'https://picsum.photos/id/30/400/400', NULL, NULL, 19999.00, 1, 19999.00),
(8, 8, 4, '联想 ThinkPad X1', 'https://picsum.photos/id/40/400/400', NULL, NULL, 12999.00, 1, 12999.00),
(9, 9, 10, '小米14 Ultra', 'https://picsum.photos/id/100/400/400', 6, '曜金黑 256GB', 5999.00, 1, 5999.00),
(10, 10, 9, '北欧风台灯', 'https://picsum.photos/id/90/400/400', NULL, NULL, 199.00, 1, 199.00);

-- 支付记录数据
INSERT IGNORE INTO shop_paymentrecord (id, order_id, transaction_no, pay_type, amount, status, pay_time, refund_amount, refund_time) VALUES
(1, 1, 'wx20240601103000000001', 1, 9949.00, 1, '2024-06-01 10:30:00', 0.00, NULL),
(2, 2, 'ali20240605150000000002', 2, 6899.00, 1, '2024-06-05 15:00:00', 0.00, NULL),
(3, 3, 'wx20240610090000000003', 1, 279.00, 1, '2024-06-10 09:00:00', 0.00, NULL),
(4, 4, 'wx20240615160000000004', 1, 399.00, 1, '2024-06-15 16:00:00', 0.00, NULL),
(5, 5, NULL, 1, 199.00, 0, NULL, 0.00, NULL),
(6, 6, 'ali20240625140000000006', 2, 138.00, 1, '2024-06-25 14:00:00', 0.00, NULL),
(7, 7, 'wx20240628110000000007', 1, 19799.00, 1, '2024-06-28 11:00:00', 0.00, NULL),
(8, 8, NULL, 1, 12899.00, 0, NULL, 0.00, NULL),
(9, 9, NULL, 1, 5949.00, 0, NULL, 0.00, NULL),
(10, 10, 'wx20240705180000000010', 1, 199.00, 1, '2024-07-05 18:00:00', 0.00, NULL);

-- 任务数据
INSERT IGNORE INTO shop_task (id, title, description, task_type, status, progress, priority, scheduled_time, start_time, end_time, error_message) VALUES
(1, '每日数据备份', '自动备份数据库到云存储', 5, 2, 100, 3, '2024-06-01 02:00:00', '2024-06-01 02:00:00', '2024-06-01 02:30:00', NULL),
(2, '用户数据统计报表', '生成月度用户数据分析报表', 3, 2, 100, 2, '2024-06-01 00:00:00', '2024-06-01 00:00:00', '2024-06-01 00:45:00', NULL),
(3, '商品图片批量处理', '压缩并优化商品图片', 4, 1, 50, 4, '2024-06-15 03:00:00', '2024-06-15 03:00:00', NULL, NULL),
(4, '邮件营销推送', '向会员发送促销邮件', 2, 2, 100, 2, '2024-06-10 09:00:00', '2024-06-10 09:00:00', '2024-06-10 09:15:00', NULL),
(5, '库存数据同步', '同步线上线下库存数据', 1, 0, 0, 1, '2024-06-20 04:00:00', NULL, NULL, NULL),
(6, '系统日志清理', '清理30天前的系统日志', 6, 2, 100, 5, '2024-06-05 01:00:00', '2024-06-05 01:00:00', '2024-06-05 01:10:00', NULL),
(7, '订单数据导出', '导出本月订单数据到Excel', 3, 0, 0, 3, '2024-06-25 10:00:00', NULL, NULL, NULL),
(8, '优惠券过期提醒', '发送优惠券即将过期提醒', 2, 3, 0, 4, '2024-06-12 08:00:00', '2024-06-12 08:00:00', NULL, '短信服务异常'),
(9, '数据迁移任务', '迁移历史数据到归档库', 1, 1, 75, 1, '2024-06-18 00:00:00', '2024-06-18 00:00:00', NULL, NULL),
(10, '商品分类同步', '同步商品分类到搜索索引', 1, 2, 100, 3, '2024-06-08 05:00:00', '2024-06-08 05:00:00', '2024-06-08 05:05:00', NULL);
