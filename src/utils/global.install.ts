// src/plugins/global.install.ts

import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/module/users' // 👈 Correct import
import { type App, type Plugin, type ComputedRef, computed } from 'vue'
import { timeAgo, formatCount } from './formatters'
import type { UserData } from '@/stores/module/users.types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $timeAgo: (date: string) => string
    $formatCount: (data: number) => string
    $isLoggedIn: ComputedRef<boolean>
    $userData: ComputedRef<UserData | null>
    $appTheme: ComputedRef<boolean>
  }
}

const GlobalPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$timeAgo = timeAgo
    app.config.globalProperties.$formatCount = formatCount
    Object.defineProperty(app.config.globalProperties, '$userData', {
      enumerable: true,
      configurable: true,
      get: () => computed(() => useUserStore().userData),
    })
    Object.defineProperty(app.config.globalProperties, '$isLoggedIn', {
      enumerable: true,
      configurable: true,
      get: () => computed(() => useUserStore().isLogged),
    })

    Object.defineProperty(app.config.globalProperties, '$appTheme', {
      enumerable: true,
      configurable: true,
      get: () => computed(() => useThemeStore().isDark),
    })
  },
}

export default GlobalPlugin
