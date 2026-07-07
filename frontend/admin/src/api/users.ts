import request from './request'

export const login = (data: { username: string; password: string }) =>
  request.post('/users/login/', data)

export const getUserList = (params?: { page?: number; page_size?: number }) =>
  request.get('/users/admin/users/', { params })

export const getUserDetail = (id: number) =>
  request.get(`/users/admin/users/${id}/`)

export const updateUser = (id: number, data: Record<string, unknown>) =>
  request.put(`/users/admin/users/${id}/update/`, data)

export const deleteUser = (id: number) =>
  request.delete(`/users/admin/users/${id}/delete/`)