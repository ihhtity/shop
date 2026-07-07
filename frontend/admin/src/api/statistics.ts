import request from './request'

export const getDashboard = () => request.get('/statistics/dashboard/')

export const getSalesStat = (params?: { days?: number }) =>
  request.get('/statistics/sales/', { params })

export const getUserStat = (params?: { days?: number }) =>
  request.get('/statistics/users/', { params })

export const getGoodsStat = () => request.get('/statistics/goods/')