export interface User {
  id: number
  username: string
  nickname: string
  phone: string
  email: string
  avatar: string
  is_admin: boolean
  status: number
}

export interface Goods {
  id: number
  name: string
  sku: string
  price: number
  original_price: number
  stock: number
  sales: number
  is_on_sale: boolean
  is_hot: boolean
  is_new: boolean
  images: string[]
}

export interface Order {
  id: number
  order_no: string
  total_amount: number
  pay_amount: number
  status: number
  pay_status: number
  pay_type: number
  created_at: string
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