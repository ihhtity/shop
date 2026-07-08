import request from './request'

export const getDashboardData = () => request.get('/statistics/dashboard/')

export const getSalesData = (params?: {
  start_date?: string
  end_date?: string
}) => request.get('/statistics/sales/', { params })

export const getGoodsData = (params?: {
  start_date?: string
  end_date?: string
}) => request.get('/statistics/goods/', { params })

export const getUserData = (params?: {
  start_date?: string
  end_date?: string
}) => request.get('/statistics/users/', { params })

export const getOrderData = (params?: {
  start_date?: string
  end_date?: string
}) => request.get('/statistics/orders/', { params })
