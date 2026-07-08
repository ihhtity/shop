import request from './request'

export const getTaskList = (params?: {
  page?: number
  page_size?: number
  status?: number
  task_type?: number
}) => request.get('/tasks/', { params })

export const getTaskDetail = (id: number) => request.get(`/tasks/${id}/`)

export const createTask = (data: Record<string, unknown>) =>
  request.post('/tasks/admin/tasks/', data)

export const updateTask = (id: number, data: Record<string, unknown>) =>
  request.put(`/tasks/admin/tasks/${id}/`, data)

export const deleteTask = (id: number) =>
  request.delete(`/tasks/admin/tasks/${id}/delete/`)

export const runTask = (id: number) =>
  request.post(`/tasks/admin/tasks/${id}/run/`)
