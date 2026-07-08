import request from './request'

export const getCartList = (params?: {
  page?: number
  page_size?: number
  user_id?: number
}) => request.get('/cart/', { params })

export const createCart = (data: Record<string, unknown>) =>
  request.post('/cart/admin/cart/', data)

export const updateCart = (id: number, data: Record<string, unknown>) =>
  request.put(`/cart/admin/cart/${id}/`, data)

export const deleteCart = (id: number) =>
  request.delete(`/cart/admin/cart/${id}/delete/`)
