// src/plugins/global.install.ts
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/module/users'
import { type App, reactive, computed } from 'vue'
import { timeAgo, formatCount } from './formatters'
import type { UserData } from '@/types/users.types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $timeAgo: (date: string) => string
    $formatCount: (data: number) => string
    $isLoggedIn: boolean
    $userData: UserData | null
    $appTheme: boolean
  }
}

const GlobalPlugin = {
  install(app: App) {
    const userStore = useUserStore()
    const themeStore = useThemeStore()

    // Use a reactive proxy to automatically track changes
    const globalState = reactive({
      get $isLoggedIn() {
        return userStore.isLogged
      },
      get $userData() {
        return userStore.userData
      },
      get $appTheme() {
        return themeStore.isDark
      },
    })

    app.config.globalProperties.$timeAgo = timeAgo
    app.config.globalProperties.$formatCount = formatCount

    // Assign reactive getters directly
    Object.assign(app.config.globalProperties, globalState)
  },
}

export default GlobalPlugin
