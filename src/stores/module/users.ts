import { defineStore } from 'pinia'
import { Storage } from '@capacitor/storage'

// 1. Define the interface for the User Data
interface UserData {
  id: string // Assuming a user ID
  name: string
  email: string
  // Add other user properties as needed
  [key: string]: any // Allow for flexible additional properties
}

// 2. Define the interface for the Store's State
interface UserState {
  isLogged: boolean
  userData: UserData | null // userData can be UserData type or null
  token: string | null // token can be string or null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLogged: false,
    userData: null,
    token: null,
  }),
  actions: {
    async setIsLogged(value: boolean): Promise<void> {
      this.isLogged = value
      // Save login state to local storage
      await Storage.set({ key: 'islogged', value: String(value) })
    },
    async loadLoginState(): Promise<void> {
      const { value } = await Storage.get({ key: 'islogged' })
      this.isLogged = value === 'true' // Convert string to boolean
    },
    async setUser(data: UserData | null): Promise<void> {
      this.userData = data
      // Save user data to local storage if needed
      if (data) {
        await Storage.set({ key: 'userData', value: JSON.stringify(data) })
      } else {
        await Storage.remove({ key: 'userData' }) // Clear if data is null
      }
    },
    async setToken(token: string | null): Promise<void> {
      this.token = token
      // You might want to save the token to storage here as well
      if (token) {
        await Storage.set({ key: 'authToken', value: token })
      } else {
        await Storage.remove({ key: 'authToken' })
      }
    },
    async loadUserAndToken(): Promise<void> {
      // Load user data
      const { value: userDataString } = await Storage.get({ key: 'userData' })
      if (userDataString) {
        try {
          this.userData = JSON.parse(userDataString)
        } catch (e) {
          console.error('Failed to parse user data from storage:', e)
          this.userData = null
        }
      } else {
        this.userData = null
      }

      // Load token
      const { value: tokenValue } = await Storage.get({ key: 'authToken' })
      this.token = tokenValue

      // Update isLogged based on both user data and token existence
      this.isLogged = !!this.userData && !!this.token
    },
    async clearUser(): Promise<void> {
      this.isLogged = false
      this.userData = null
      this.token = null
      // Clear local storage
      await Storage.remove({ key: 'islogged' })
      await Storage.remove({ key: 'userData' })
      await Storage.remove({ key: 'authToken' }) // Clear token from storage
    },
  },
})
