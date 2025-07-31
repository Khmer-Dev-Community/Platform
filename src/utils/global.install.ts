import { useThemeStore } from '@/stores/theme'
import { type App, type Plugin, type ComputedRef, computed } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $isLoggedIn: ComputedRef<boolean>
    $userData: ComputedRef<any>
    $appThem: ComputedRef<boolean>
  }
}

const AuthCheckerPlugin: Plugin = {
  install(app: App) {
    Object.defineProperty(app.config.globalProperties, '$appThem', {
      enumerable: true,
      configurable: true,
      get: () => computed(() => useThemeStore().isDark),
    })
  },
}

export default AuthCheckerPlugin
