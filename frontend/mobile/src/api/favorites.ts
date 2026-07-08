import request from './request'

export const getFavorites = () => request.get('/favorites/')

export const addFavorite = (data: { goods_id: number }) =>
  request.post('/favorites/create/', data)

export const removeFavorite = (id: number) =>
  request.delete(`/favorites/${id}/`)

export const checkFavorite = (goods_id: number) =>
  request.get('/favorites/check/', { params: { goods_id } })