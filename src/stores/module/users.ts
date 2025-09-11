// src/stores/module/users.ts
import { defineStore } from 'pinia'
import { Storage } from '@capacitor/storage'
import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { BackendResponse } from '@/utils/request'
import type { UserData } from '@/types/users.types'

// Define the API response types for better type safety
interface LoginResponse {
  message: string
  statusCode: number
}
interface ProfileResponse {
  user?: UserData // user property might be optional
  data?: UserData // data property might be optional
  message: string
  statusCode: number
}

interface UserState {
  isLogged: boolean
  userData: UserData | null
  loadingUser: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLogged: false,
    userData: null,
    loadingUser: false,
  }),
  actions: {
    async setIsLogged(value: boolean): Promise<void> {
      this.isLogged = value
      await Storage.set({ key: 'islogged', value: String(value) })
    },

    async setUser(data: UserData | null): Promise<void> {
      this.userData = data
      if (data) {
        // 🟢 FIX: Missing closing parenthesis in JSON.stringify()
        await Storage.set({ key: 'userData', value: JSON.stringify(data) })
      } else {
        await Storage.remove({ key: 'userData' })
      }
    },

    async loadUserFromCache(): Promise<void> {
      const { value: userDataString } = await Storage.get({ key: 'userData' })
      console.log(userDataString)
      if (userDataString) {
        try {
          const cachedUserData: UserData = JSON.parse(userDataString)
          this.userData = cachedUserData
          this.isLogged = true
        } catch (e) {
          console.error('Failed to parse cached user data from storage:', e)
          await this.clearUser()
        }
      }
    },

    async loadUserAndToken(): Promise<void> {
      this.loadingUser = true
      // Load from cache for immediate user feedback
      await this.loadUserFromCache()
      const { value: userDataString } = await Storage.get({ key: 'userData' })
      if (!userDataString) {
        return
      }

      try {
        // 🟢 FIX: The `BackendResponse` generic should match the type of the `user` or `data` field
        const response: AxiosResponse<BackendResponse<any>> = await request.get('/auth02/profile', {
          withCredentials: true,
        })

        const apiUser = response.data.data
        if (apiUser) {
          this.setUser(apiUser)
          this.isLogged = true
        } else {
          await this.clearUser()
        }
      } catch (error: any) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.log('Axios reported unauthenticated session. Clearing frontend user data.')
        } else {
          console.error('Network or other error fetching user data:', error)
        }
        await this.clearUser()
      } finally {
        this.loadingUser = false
      }
    },

    async clearUser(): Promise<void> {
      try {
        await request.post('/auth/logout', null, { withCredentials: true })
        await Storage.remove({ key: 'islogged' })
        await Storage.remove({ key: 'userData' })
        this.isLogged = false
        this.userData = null
        console.log('Backend logout successful, and frontend user data cleared.')
      } catch (error) {
        console.error('Error during backend logout API call:', error)
      }
    },

    async login(identifier: string, password_hash: string): Promise<boolean> {
      this.loadingUser = true
      try {
        const response: AxiosResponse<LoginResponse> = await request.post('/api/client/login', {
          identifier,
          password_hash,
        })
        await this.loadUserAndToken()
        console.log('Manual login successful!')
        return true
      } catch (error: any) {
        if (error.response && error.response.data) {
          console.error('Manual login failed:', error.response.data.message || 'Unknown error')
        } else if (error.message) {
          console.error('Manual login failed:', error.message)
        } else {
          console.error('Manual login failed:', error)
        }
        return false
      } finally {
        this.loadingUser = false
      }
    },
  },
})
