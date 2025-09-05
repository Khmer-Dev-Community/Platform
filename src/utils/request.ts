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
  statusCode: number
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
      // config.headers['Id'] = userStore.userData.id.toString()
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
    return response
  },
  (error: AxiosError<BackendErrorData>) => {
    const userStore = useUserStore()
    const errorMessage = error.response?.data?.message || error.message
    const statusCode = error.response?.status

    // Handle authentication and session errors first
    if (statusCode === 401 || statusCode === 4001 || errorMessage.includes('Token expired')) {
      /*   ElMessageBox.alert('Your session has expired. Please log in again.', 'Warning', {
        confirmButtonText: 'Login',
      }).then(() => {
        userStore.clearUser()
        window.location.href = '/login'
      })*/
    } else if (errorMessage.includes('Your Account login on other device')) {
      ElMessageBox.confirm(
        'Your account has been logged in on another device. Please log in again.',
        'Warning',
        {
          confirmButtonText: 'Login',
        },
      ).then(() => {
        userStore.clearUser()
        window.location.href = '/login'
      })
    } else if (error.code === 'ECONNABORTED' || errorMessage.includes('timeout')) {
      ElMessage.error('Network timeout. Please check your internet connection.')
    } else if (errorMessage === 'Network Error' || statusCode === 0) {
      ElMessage.error('Network connection error. Please check your internet connection.')
    } else {
      // Handle other common errors (e.g., 400, 404, 500)
      if (error.response?.data?.message) {
        ElMessage.error(error.response.data.message)
      } else {
        ElMessage.error('An unknown error occurred.')
      }
    }

    return Promise.reject(error)
  },
)
export default service
