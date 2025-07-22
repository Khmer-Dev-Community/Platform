import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginData, RegisterData } from '@/types'
import { api } from '@/services/index'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  const login = async (loginData: LoginData) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/auth/login', loginData)
      user.value = response.data.user
      localStorage.setItem('token', response.data.token)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (registerData: RegisterData) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/auth/register', registerData)
      user.value = response.data.user
      localStorage.setItem('token', response.data.token)
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('token')
  }

  const initializeAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await api.get('/auth/me')
        user.value = response.data
      } catch (err) {
        localStorage.removeItem('token')
      }
    }
  }

  const followUser = async (userId: string) => {
    try {
      await api.post(`/users/${userId}/follow`)
      if (user.value) {
        user.value.following = user.value.following || []
        if (!user.value.following.includes(userId)) {
          user.value.following.push(userId)
        }
      }
    } catch (err) {
      console.error('Failed to follow user:', err)
    }
  }

  const unfollowUser = async (userId: string) => {
    try {
      await api.delete(`/users/${userId}/follow`)
      if (user.value && user.value.following) {
        user.value.following = user.value.following.filter((id) => id !== userId)
      }
    } catch (err) {
      console.error('Failed to unfollow user:', err)
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    initializeAuth,
    followUser,
    unfollowUser,
  }
})
