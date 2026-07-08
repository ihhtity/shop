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

export const bindPhone = (data: { phone: string }) =>
  request.post('/users/user/bind/phone/', data)

export const unbindPhone = () =>
  request.post('/users/user/unbind/phone/')

export const changePhone = (data: { phone: string }) =>
  request.post('/users/user/change/phone/', data)

export const bindEmail = (data: { email: string; code: string }) =>
  request.post('/users/user/bind/email/', data)

export const unbindEmail = () =>
  request.post('/users/user/unbind/email/')

export const changeEmail = (data: { email: string; code: string }) =>
  request.post('/users/user/change/email/', data)

export const sendEmailCode = (data: { email: string }) =>
  request.post('/users/user/send/email/code/', data)