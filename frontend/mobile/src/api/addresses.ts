import request from './request'
import { Address } from '@/types'

export const getAddressList = () => request.get<Address[]>('/addresses/')

export const getAddressDetail = (id: number) => request.get<Address>(`/addresses/${id}/`)

export const createAddress = (data: Partial<Address>) =>
  request.post('/addresses/user/addresses/create/', data)

export const updateAddress = (id: number, data: Partial<Address>) =>
  request.put(`/addresses/user/addresses/${id}/`, data)

export const deleteAddress = (id: number) =>
  request.delete(`/addresses/user/addresses/${id}/delete/`)

export const setDefaultAddress = (id: number) =>
  request.post(`/addresses/user/addresses/${id}/default/`)