export interface User {
  id: number
  username: string
  nickname: string | null
  phone: string | null
  email: string | null
  avatar: string | null
  gender: number
  birth_date: string | null
}

export interface Category {
  id: number
  name: string
  parent_id: number | null
  level: number
  sort_order: number
  icon: string
  status: number
  children?: Category[]
}

export interface Goods {
  id: number
  name: string
  sku: string
  description: string
  images: string[]
  price: string
  original_price: string
  stock: number
  sales: number
  is_on_sale: boolean
  is_hot: boolean
  is_new: boolean
  category_id: number
}

export interface Specification {
  id: number
  goods_id: number
  name: string
  value: string
  price_offset: string
  stock: number
  image: string | null
}

export interface CartItem {
  id: number
  goods: Goods
  goods_id: number
  goods_name: string
  goods_image: string
  spec: Specification | null
  spec_id: number | null
  spec_name: string
  price: string | number
  quantity: number
  subtotal: string | number
}

export interface Address {
  id: number
  user_id: number
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default: boolean
  status: number
}

export interface Coupon {
  id: number
  name: string
  coupon_type: number
  discount_amount: string
  discount_rate: string
  min_spend: string
  total_count: number
  used_count: number
  per_user_limit: number
  start_time: string
  end_time: string
  status: number
}

export interface UserCoupon {
  id: number
  user_id: number
  coupon: Coupon
  order_id: number | null
  status: number
  receive_time: string
  used_time: string | null
}

export interface OrderItem {
  id: number
  goods_id: number
  goods_name: string
  goods_image: string
  spec_id: number | null
  spec_name: string | null
  price: string
  quantity: number
  subtotal: string
}

export interface Order {
  id: number
  order_no: string
  user_id: number
  address: Address | null
  total_amount: string
  discount_amount: string
  pay_amount: string
  status: number
  pay_status: number
  pay_type: number | null
  pay_time: string | null
  ship_time: string | null
  finish_time: string | null
  cancel_time: string | null
  remark: string | null
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: number
  user_id: number
  goods: Goods
  status: number
  created_at: string
}

export interface Notification {
  id: number
  user_id: number | null
  title: string
  content: string
  notify_type: number
  is_read: boolean
  status: number
  created_at: string
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

export type OrderStatus = 'all' | 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled'
