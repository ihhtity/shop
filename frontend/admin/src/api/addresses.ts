import request from './request'

export const getAddressList = (params?: {
  page?: number
  page_size?: number
  user_id?: number
}) => request.get('/addresses/', { params })

export const getAddressDetail = (id: number) => request.get(`/addresses/${id}/`)

export const createAddress = (data: Record<string, unknown>) =>
  request.post('/addresses/admin/addresses/', data)

export const updateAddress = (id: number, data: Record<string, unknown>) =>
  request.put(`/addresses/admin/addresses/${id}/`, data)

export const deleteAddress = (id: number) =>
  request.delete(`/addresses/admin/addresses/${id}/delete/`)
