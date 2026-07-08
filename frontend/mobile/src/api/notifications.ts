import request from './request'

export const getNotifications = (params?: { page?: number; page_size?: number }) =>
  request.get('/notifications/', { params })

export const getUnreadCount = () => request.get('/notifications/unread_count/')

export const markAsRead = (id: number) =>
  request.put(`/notifications/${id}/read/`)

export const markAllAsRead = () => request.put('/notifications/read_all/')

export const deleteNotification = (id: number) =>
  request.delete(`/notifications/${id}/`)
