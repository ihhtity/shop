import request from './request'

export const adminLogin = (data: { username: string; password: string }) =>
  request.post('/users/admin/login/', data)

export const adminRegister = (data: { username: string; email?: string; phone?: string; password: string; confirm_password: string }) =>
  request.post('/users/admin/register/', data)

export const adminLogout = () =>
  request.post('/users/admin/logout/')

export const getAdminInfo = () =>
  request.get('/users/admin/info/')

export const updateAdminInfo = (data: Record<string, unknown>) =>
  request.put('/users/admin/info/', data)

export const changeAdminPassword = (data: { old_password: string; new_password: string }) =>
  request.put('/users/admin/password/', data)

export const getUserList = (params?: { page?: number; page_size?: number }) =>
  request.get('/users/admin/users/', { params })

export const getUserDetail = (id: number) =>
  request.get(`/users/admin/users/${id}/`)

export const updateUser = (id: number, data: Record<string, unknown>) =>
  request.put(`/users/admin/users/${id}/update/`, data)

export const deleteUser = (id: number) =>
  request.delete(`/users/admin/users/${id}/delete/`)

export const getAdminList = (params?: { page?: number; page_size?: number }) =>
  request.get('/users/admin/admins/', { params })

export const getAdminDetail = (id: number) =>
  request.get(`/users/admin/admins/${id}/`)

export const updateAdmin = (id: number, data: Record<string, unknown>) =>
  request.put(`/users/admin/admins/${id}/update/`, data)

export const deleteAdmin = (id: number) =>
  request.delete(`/users/admin/admins/${id}/delete/`)