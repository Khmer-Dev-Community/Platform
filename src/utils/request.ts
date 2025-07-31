import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

import qs from 'qs'
import { useUserStore } from '@/stores/module/users'
export interface BackendResponse<T = any> {
  code: number
  message: string
  data?: T
  user?: T
}

interface BackendErrorData {
  message?: string
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: {
    serialize(params) {
      return qs.stringify(params, { allowDots: true })
    },
  },
})

// Request Interceptor
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    if (userStore.isLogged && userStore.userData) {
      config.headers['Id'] = userStore.userData.id.toString()
      if (userStore.userData.roleid !== undefined && userStore.userData.roleid !== null) {
        config.headers['roleid'] = userStore.userData.roleid.toString()
      }
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Response Interceptor
service.interceptors.response.use(
  (response: AxiosResponse<BackendResponse>) => {
    const res = response.data
    if (res.code && res.code !== 0) {
      if (res.code === 401 || res.code === 4001) {
        const userStore = useUserStore()
        userStore.clearUser() // Clear frontend state and call backend logout
        ElMessageBox.alert('You have been logged out, please log in again', 'Warning', {
          confirmButtonText: 'Login',
        })
          .then(() => {
            window.location.href = '/login' // Redirect to login page
          })
          .catch(() => {
            // User closed the message box, still redirect to login for consistency
            window.location.href = '/login'
          })
      } else {
        ElMessage.error(res.message || 'An error occurred')
      }
      return Promise.reject(
        new AxiosError(res.message, String(res.code), response.config, response.request, response),
      )
    } else {
      return response
    }
  },
  (error: AxiosError<BackendErrorData>) => {
    const userStore = useUserStore()
    const errorMessage = error.response?.data?.message || error.message
    if (errorMessage.includes('Token expired or not found')) {
      ElMessageBox.confirm('Your account session has expired. Please log in again.', 'Warning', {
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          userStore.clearUser()
          window.location.href = '/login' // Redirect to login
        })
        .catch(() => {
          userStore.clearUser()
          window.location.href = '/login'
        })
    } else if (errorMessage.includes('Your Account login on other device')) {
      ElMessageBox.confirm(
        'Your account has been logged in on another device. Please log in again.',
        'Warning',
        {
          confirmButtonText: 'Login',
          cancelButtonText: 'Cancel',
          type: 'warning',
        },
      )
        .then(() => {
          userStore.clearUser() // Clear session
          window.location.href = '/login'
        })
        .catch(() => {
          userStore.clearUser()
          window.location.href = '/login'
        })
    } else if (error.code === 'ECONNABORTED' || errorMessage.includes('timeout')) {
      ElMessage.error('Network timeout. Please check your internet connection.')
    } else if (errorMessage === 'Network Error') {
      ElMessage.error('Network connection error. Please check your internet connection.')
    } else {
      if (error.response?.data) {
        ElMessage.error(errorMessage || 'An unknown error occurred.')
      } else {
        ElMessage.error('Could not reach the server or invalid API path.')
      }
    }
    return Promise.reject(error)
  },
)
export default service
