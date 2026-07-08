import { create } from 'zustand'
import { adminLogin, getAdminInfo } from '@/api/users'

interface AdminUser {
  id: number
  username: string
  email: string
  phone: string
  avatar: string
  role: number
  is_active: boolean
}

interface AuthState {
  user: AdminUser | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: AdminUser) => void
  fetchUserInfo: () => Promise<void>
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  login: async (username, password) => {
    const response = await adminLogin({ username, password })
    if (response.code === 0) {
      localStorage.setItem('token', response.data.token)
      set({ token: response.data.token, user: response.data.user, isAuthenticated: true })
    } else {
      throw new Error(response.message)
    }
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },
  setUser: (user) => set({ user }),
  fetchUserInfo: async () => {
    try {
      const response = await getAdminInfo()
      if (response.code === 0) {
        set({ user: response.data })
      }
    } catch (error) {
      localStorage.removeItem('token')
      set({ user: null, token: null, isAuthenticated: false })
    }
  },
}))

export default useAuthStore