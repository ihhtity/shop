import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => response.data as any,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user_token')
      window.location.href = '/login'
    } else if (error.response?.status === 403) {
      alert('权限不足')
    } else if (error.response?.status === 500) {
      alert('服务器内部错误')
    }
    return Promise.reject(error)
  }
)

const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return axiosInstance.get(url, config)
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return axiosInstance.post(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return axiosInstance.put(url, data, config)
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return axiosInstance.delete(url, config)
  },
}

export default request
