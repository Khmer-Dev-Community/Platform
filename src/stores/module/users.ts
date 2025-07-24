// src/stores/module/users.ts
import { defineStore } from 'pinia'
import { Storage } from '@capacitor/storage' // Still useful for general user data, not the auth token

export interface UserData {
  id: number // Changed to number based on your previous JSON example
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
  [key: string]: any
}

interface UserState {
  isLogged: boolean
  userData: UserData | null
  loadingUser: boolean // Add a loading state for user data
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLogged: false,
    userData: null,
    loadingUser: false, // Initialize loading state
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
      this.loadingUser = true // Indicate loading
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
        }
      }
      try {
        const response = await fetch('/api/client/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const apiResponse = await response.json()
          this.setUser(apiResponse.user || apiResponse) // Adjust based on your backend's exact response structure
          this.isLogged = true
          console.log('User data successfully loaded from backend.')
        } else if (response.status === 401 || response.status === 403) {
          // Backend responded that the user is unauthorized/forbidden (cookie missing or invalid)
          console.log(
            'Backend reports unauthenticated session (401/403). Clearing frontend user data.',
          )
          await this.clearUser()
        } else {
          // Other HTTP errors
          console.error(
            'Failed to load user data from backend:',
            response.status,
            await response.text(),
          )
          await this.clearUser() // Treat as unauthenticated
        }
      } catch (error) {
        console.error('Network or other error fetching user data:', error)
        await this.clearUser() // Assume not logged in on error
      } finally {
        this.loadingUser = false // Finished loading attempt
      }
    },

    // Action to clear all user data and log out
    async clearUser(): Promise<void> {
      this.isLogged = false
      this.userData = null
      // No 'token' to clear here as it's HTTP-only
      await Storage.remove({ key: 'islogged' })
      await Storage.remove({ key: 'userData' })
      // Crucially, also tell your backend to clear the HTTP-only cookie if possible
      try {
        await fetch('/api/client/logout', { method: 'POST' }) // Call your backend logout endpoint
        console.log('Backend logout endpoint called to clear session/cookie.')
      } catch (error) {
        console.error('Error during backend logout API call:', error)
      }
    },

    // Example: Manual login action (similar to what happens in Login.vue)
    async login(identifier: string, password_hash: string): Promise<boolean> {
      this.loadingUser = true
      try {
        const response = await fetch('/api/client/login', {
          // Your backend's login endpoint
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password_hash }),
        })

        if (response.ok) {
          await this.loadUserAndToken()
          console.log('Manual login successful!')
          return true
        } else {
          const errorData = await response.json()
          console.error('Manual login failed:', errorData.message)
          return false
        }
      } catch (error) {
        console.error('Network error during manual login:', error)
        return false
      } finally {
        this.loadingUser = false
      }
    },
  },
})
