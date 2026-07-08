import request from './request'

export const getGoodsList = (params?: {
  page?: number
  page_size?: number
  category_id?: number
  keyword?: string
}) => request.get('/goods/', { params })

export const getGoodsDetail = (id: number) => request.get(`/goods/${id}/`)

export const getCategories = () => request.get('/goods/categories/')

export const getHotGoods = () => request.get('/goods/hot/')

export const getNewGoods = () => request.get('/goods/new/')

export const getSpecs = (goods_id: number) =>
  request.get(`/goods/specs/`, { params: { goods_id } })