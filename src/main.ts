import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

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
async function bootstrap() {
  await setupI18n()
  const app = createApp(App)
  // Register Element Plus icons globally
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // Global properties
  app.config.globalProperties.$isLoggedIn = () => false

  app.use(createPinia())
  app.use(router)
  app.use(ElementPlus)
  app.use(Vant)
  app.use(i18n)
  // Configure Vant locale
  Locale.use('en-US', enUS)

  app.mount('#app')
}

bootstrap()
