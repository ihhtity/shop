import request from './request'

export const getOrderList = (params?: {
  page?: number
  page_size?: number
  status?: number
  order_no?: string
}) => request.get('/orders/admin/orders/', { params })

export const getOrderDetail = (id: number) => request.get(`/orders/${id}/`)

export const updateOrder = (id: number, data: Record<string, unknown>) =>
  request.put(`/orders/admin/orders/${id}/`, data)