import request from './request'

export const userLogin = (data: { username: string; password: string }) =>
  request.post('/users/user/login/', data)

export const userRegister = (data: { username: string; phone: string; password: string; confirm_password: string }) =>
  request.post('/users/user/register/', data)

export const userLogout = () =>
  request.post('/users/user/logout/')

export const getUserInfo = () =>
  request.get('/users/user/info/')

export const updateUserInfo = (data: Record<string, unknown>) =>
  request.put('/users/user/info/', data)

export const changeUserPassword = (data: { old_password: string; new_password: string }) =>
  request.put('/users/user/password/', data)