import request from './request'
import { Address, ApiResponse } from '@/types'

export interface CreateAddressData {
  name: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  is_default?: boolean
}

export interface UpdateAddressData {
  name?: string
  phone?: string
  province?: string
  city?: string
  district?: string
  detail?: string
  is_default?: boolean
}

export const getAddressList = (): Promise<ApiResponse<Address[]>> => 
  request.get('/addresses/user/addresses/')

export const getAddressDetail = (id: number): Promise<ApiResponse<Address>> => 
  request.get(`/addresses/user/addresses/${id}/`)

export const createAddress = (data: CreateAddressData): Promise<ApiResponse<Address>> =>
  request.post('/addresses/user/addresses/create/', data)

export const updateAddress = (id: number, data: UpdateAddressData): Promise<ApiResponse<Address>> =>
  request.put(`/addresses/user/addresses/${id}/`, data)

export const deleteAddress = (id: number): Promise<ApiResponse<void>> =>
  request.delete(`/addresses/user/addresses/${id}/delete/`)

export const setDefaultAddress = (id: number): Promise<ApiResponse<void>> =>
  request.post(`/addresses/user/addresses/${id}/default/`)