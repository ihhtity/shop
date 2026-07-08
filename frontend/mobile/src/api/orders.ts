import request from './request'

export const getOrderList = (params?: {
  page?: number
  page_size?: number
  status?: number
}) => request.get('/orders/', { params })

export const getOrderDetail = (id: number) => request.get(`/orders/${id}/`)

export const createOrder = (data: Record<string, unknown>) =>
  request.post('/orders/user/orders/create/', data)

export const cancelOrder = (id: number) =>
  request.put(`/orders/user/orders/${id}/cancel/`)

export const confirmOrder = (id: number) =>
  request.put(`/orders/user/orders/${id}/confirm/`)