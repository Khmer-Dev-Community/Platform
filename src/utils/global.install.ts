import type { App, Plugin, ComputedRef } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $isLoggedIn: ComputedRef<boolean>
    $userData: ComputedRef<any>
  }
}

const AuthCheckerPlugin: Plugin = {
  install(app: App) {},
}

export default AuthCheckerPlugin
