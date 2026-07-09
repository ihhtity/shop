import request from './request'
import { Order, ApiResponse } from '@/types'

export interface OrderItemRequest {
  goods_id: number
  spec_id?: number | null
  quantity: number
}

export interface CreateOrderRequest {
  address_id: number
  items: OrderItemRequest[]
  remark?: string
  coupon_id?: number | null
}

export interface CreateOrderResponse {
  order_id: number
  order_no: string
}

export interface GetOrderListParams {
  page?: number
  page_size?: number
  status?: number
}

export const getOrderList = (params?: GetOrderListParams): Promise<ApiResponse<Order[]>> => 
  request.get('/orders/user/orders/', { params })

export const getOrderDetail = (id: number): Promise<ApiResponse<Order>> => 
  request.get(`/orders/user/orders/${id}/`)

export const createOrder = (data: CreateOrderRequest): Promise<ApiResponse<CreateOrderResponse>> =>
  request.post('/orders/user/orders/create/', data)

export const cancelOrder = (id: number): Promise<ApiResponse<void>> =>
  request.post(`/orders/user/orders/${id}/cancel/`)

export const confirmOrder = (id: number): Promise<ApiResponse<void>> =>
  request.post(`/orders/user/orders/${id}/confirm/`)