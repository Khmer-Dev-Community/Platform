// src/stores/module/users.ts
import { defineStore } from 'pinia'
import { Storage } from '@capacitor/storage'

import request from '@/utils/request'
import type { BackendResponse } from '@/utils/request'

export interface UserData {
  id: number
  fname: string
  lname: string
  username: string
  email: string
  phone: string
  sex: string
  status: boolean
  description: string
  github_id: string // From GitHub OAuth
  avatar_url: string // From GitHub OAuth
  name: string // User's full name from backend
  createdAt: string
  updatedAt: string
  roleid?: number // Assuming roleid can be on UserData
  companyId?: number // Assuming companyId can be on UserData
  [key: string]: any // Allows for additional properties
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
        await Storage.set({ key: 'userData', value: JSON.stringify(data) })
      } else {
        await Storage.remove({ key: 'userData' })
      }
    },

    async loadUserAndToken(): Promise<void> {
      this.loadingUser = true
      let cachedUserData: UserData | null = null
      const { value: userDataString } = await Storage.get({ key: 'userData' })

      if (userDataString) {
        try {
          cachedUserData = JSON.parse(userDataString)
          this.userData = cachedUserData
          this.isLogged = true // Optimistic, will be confirmed by API call
        } catch (e) {
          console.error('Failed to parse cached user data from storage:', e)
          this.userData = null
          this.isLogged = false // Reset if cached data is corrupt
        }
      }
      try {
        const response = await request.get<BackendResponse>('/auth02/profile', {
          withCredentials: true, // Add this line
        })
        console.log(response.data)
        const apiResponseData = response.data
        this.setUser(
          (apiResponseData.user as UserData) ||
            (apiResponseData.data as UserData) ||
            (apiResponseData as unknown as UserData),
        )
        this.isLogged = true
      } catch (error: any) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          console.log(
            'Axios reported unauthenticated session (401/403). Clearing frontend user data.',
          )
          await this.clearUser()
        } else {
          console.error('Network or other error fetching user data via Axios:', error)
          await this.clearUser()
        }
      } finally {
        this.loadingUser = false
      }
    },

    async clearUser(): Promise<void> {
      this.isLogged = false
      this.userData = null
      // Remove local storage data (not the HttpOnly cookie itself)
      await Storage.remove({ key: 'islogged' })
      await Storage.remove({ key: 'userData' })
      try {
        // Use your Axios instance 'request' for logout
        // await request.post('/api/client/logout')
        console.log('Backend logout endpoint called via Axios to clear session/cookie.')
      } catch (error) {
        console.error('Error during backend logout API call via Axios:', error)
        // Frontend state is already cleared; this just logs the error if backend logout fails.
      }
    },

    async login(identifier: string, password_hash: string): Promise<boolean> {
      this.loadingUser = true
      try {
        // Use your Axios instance 'request' for login
        const response = await request.post<BackendResponse>('/api/client/login', {
          identifier,
          password_hash,
        })
        await this.loadUserAndToken() // This will re-fetch profile and confirm authentication
        console.log('Manual login successful via Axios!')
        return true
      } catch (error: any) {
        // This catch block will receive an AxiosError if the login failed
        if (error.response && error.response.data) {
          console.error(
            'Manual login failed (Axios error):',
            error.response.data.message || 'Unknown error',
          )
        } else if (error.message) {
          console.error('Manual login failed (Network/Other error):', error.message)
        } else {
          console.error('Manual login failed (Unknown error):', error)
        }
        return false
      } finally {
        this.loadingUser = false
      }
    },
  },
})
