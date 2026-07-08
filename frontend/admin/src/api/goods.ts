import request from './request'

export const getGoodsList = (params?: {
  page?: number
  page_size?: number
  category_id?: number
  keyword?: string
}) => request.get('/goods/', { params })

export const getGoodsDetail = (id: number) => request.get(`/goods/${id}/`)

export const createGoods = (data: Record<string, unknown>) =>
  request.post('/goods/admin/goods/', data)

export const updateGoods = (id: number, data: Record<string, unknown>) =>
  request.put(`/goods/admin/goods/${id}/`, data)

export const deleteGoods = (id: number) =>
  request.delete(`/goods/admin/goods/${id}/delete/`)

export const getCategories = () => request.get('/goods/categories/')

export const createCategory = (data: Record<string, unknown>) =>
  request.post('/goods/admin/categories/', data)

export const updateCategory = (id: number, data: Record<string, unknown>) =>
  request.put(`/goods/admin/categories/${id}/`, data)

export const deleteCategory = (id: number) =>
  request.delete(`/goods/admin/categories/${id}/delete/`)

export const getSpecs = (goods_id: number) =>
  request.get(`/goods/specs/`, { params: { goods_id } })

export const createSpec = (data: Record<string, unknown>) =>
  request.post('/goods/admin/specs/', data)

export const updateSpec = (id: number, data: Record<string, unknown>) =>
  request.put(`/goods/admin/specs/${id}/`, data)

export const deleteSpec = (id: number) =>
  request.delete(`/goods/admin/specs/${id}/delete/`)
