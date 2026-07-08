import request from './request'

export const getCouponList = () => request.get('/coupons/')

export const receiveCoupon = (id: number) =>
  request.post(`/coupons/user/coupons/${id}/receive/`)

export const getUserCoupons = () => request.get('/coupons/user/coupons/')