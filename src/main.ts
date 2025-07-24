import './assets/main.css'
import { createApp, computed } from 'vue'
import { createPinia } from 'pinia'
// Emoji
import 'vue3-emoji-picker/css'
// UI Libraries
import ElementPlus from 'element-plus'
import Vant, { Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// i18n
import { i18n, setupI18n } from './locales'
// Styles
import 'element-plus/dist/index.css'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/module/users'
// check Login
import AuthCheckerPlugin from '@/utils/global.install'
async function bootstrap() {
  await setupI18n()
  const app = createApp(App)
  const pinia = createPinia()
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(pinia)
  app.use(router) // Attach Vue Router to the app
  app.use(ElementPlus) // Attach Element Plus
  app.use(Vant) // Attach Vant
  app.use(i18n) // Attach i18n
  // Configure Vant locale
  Locale.use('en-US', enUS)
  app.use(AuthCheckerPlugin)
  const userStore = useUserStore()
  app.config.globalProperties.$isLoggedIn = computed(() => userStore.isLogged)
  //app.config.globalProperties.$userData = computed(() => userStore.userData)
  //await userStore.loadUserAndToken()
  app.mount('#app')
}
bootstrap()
