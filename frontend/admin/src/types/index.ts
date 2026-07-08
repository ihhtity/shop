export interface AdminUser {
  id: number
  username: string
  email: string
  phone: string
  avatar: string | null
  role: number
  is_active: boolean
}

export interface User {
  id: number
  username: string
  password: string
  email: string
  phone: string
  nickname: string
  avatar: string
  gender: number
  birth_date: string
  is_active: boolean
  date_joined: string
}

export interface GoodsCategory {
  id: number
  name: string
  description: string
  parent: number | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface GoodsSpec {
  id: number
  goods: number
  name: string
  value: string
  price: number
  stock: number
}

export interface Goods {
  id: number
  name: string
  sku: string
  category: number
  price: number
  original_price: number
  stock: number
  sales: number
  unit: string
  description: string
  is_on_sale: boolean
  is_hot: boolean
  is_new: boolean
  images: string[]
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: number
  order_no: string
  user: number
  address: number | null
  total_amount: number
  discount_amount: number
  pay_amount: number
  status: number
  pay_status: number
  pay_type: number
  remark: string
  pay_time: string | null
  ship_time: string | null
  finish_time: string | null
  cancel_time: string | null
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  order: number
  goods: number
  goods_name: string
  goods_image: string
  spec: string
  price: number
  quantity: number
  subtotal: number
}

export interface Cart {
  id: number
  user: number
  goods: number
  spec: number | null
  quantity: number
  status: number
  created_at: string
  updated_at: string
}

export interface Address {
  id: number
  user: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default: boolean
  status: number
  created_at: string
  updated_at: string
}

export interface Coupon {
  id: number
  name: string
  coupon_type: number
  discount_amount: number
  discount_rate: number
  min_spend: number
  total_count: number
  used_count: number
  per_user_limit: number
  start_time: string
  end_time: string
  status: number
  created_at: string
}

export interface UserCoupon {
  id: number
  user: number
  coupon: number
  order: number | null
  status: number
  receive_time: string
  used_time: string | null
}

export interface Task {
  id: number
  title: string
  description: string
  task_type: number
  status: number
  progress: number
  priority: number
  scheduled_time: string | null
  start_time: string | null
  end_time: string | null
  error_message: string
  created_at: string
  updated_at: string
}

export interface DashboardData {
  total_users: number
  total_goods: number
  total_orders: number
  total_sales: number
  today_users: number
  today_orders: number
  today_sales: number
}

export interface SalesData {
  date: string
  amount: number
  orders: number
}

export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}
