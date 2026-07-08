import request from './request'

export const getOrderList = (params?: {
  page?: number
  page_size?: number
  status?: number
  pay_status?: number
  keyword?: string
}) => request.get('/orders/', { params })

export const getOrderDetail = (id: number) => request.get(`/orders/${id}/`)

export const updateOrderStatus = (id: number, status: number) =>
  request.put(`/orders/admin/orders/${id}/status/`, { status })

export const updateOrderPayStatus = (id: number, pay_status: number) =>
  request.put(`/orders/admin/orders/${id}/pay_status/`, { pay_status })

export const deleteOrder = (id: number) =>
  request.delete(`/orders/admin/orders/${id}/delete/`)
