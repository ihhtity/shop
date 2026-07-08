import request from './request'

export const getCartList = () => request.get('/cart/user/cart/')

export const addToCart = (data: Record<string, unknown>) =>
  request.post('/cart/user/cart/', data)

export const updateCart = (id: number, data: Record<string, unknown>) =>
  request.put(`/cart/user/cart/${id}/`, data)

export const deleteCart = (id: number) =>
  request.delete(`/cart/user/cart/${id}/delete/`)

export const clearCart = () =>
  request.post('/cart/user/cart/clear/')