import { useUserStore } from './users'

export default {
  install(app: any) {
    app.config.globalProperties.$isLoggedIn = false
  },
}

export function isAccountLoggedIn(): boolean {
  const userStore = useUserStore()
  return userStore.isLogged
}
