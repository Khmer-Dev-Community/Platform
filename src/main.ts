
import { createApp, computed } from 'vue'
import { createPinia } from 'pinia'
// Emoji
import 'vue3-emoji-picker/css'
// UI Libraries
import ElementPlus from 'element-plus'
import Vant, { Locale } from 'vant'
import 'vant/lib/index.css'
import './assets/main.css'
import enUS from 'vant/es/locale/lang/en-US'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// i18n
import { i18n, setupI18n } from './locales'
// Styles
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/module/users'
//import AuthCheckerPlugin from '@/utils/global.install'
import { useThemeStore } from './stores/theme'

// Editor
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import enLocale from '@kangc/v-md-editor/lib/lang/en-US'
import Prism from 'prismjs'
import hljs from 'highlight.js'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-json'
import 'prismjs/themes/prism-okaidia.css'

// Previewer (Viewer)
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import GlobalPlugin from '@/utils/global.install'

VueMarkdownEditor.use(githubTheme, {
  Prism: Prism,
  Hljs: hljs,
})

// CRITICAL: Configure the previewer with a theme
VMdPreview.use(githubTheme, {
  Hljs: hljs,
})

VueMarkdownEditor.lang.use('en-US', enLocale)

async function bootstrap() {
  await setupI18n()
  const app = createApp(App)

  const pinia = createPinia()
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.use(pinia)
  app.use(router)
  app.use(ElementPlus)
  app.use(Vant)
  app.use(i18n)

  // CRITICAL: Use both the editor and the previewer
  app.use(VueMarkdownEditor)
  app.use(VMdPreview)

  Locale.use('en-US', enUS)
  //app.use(AuthCheckerPlugin)
  const userStore = useUserStore()
  app.config.globalProperties.$t = i18n.global.t
  app.config.globalProperties.$isLoggedIn = computed(() => userStore.isLogged)
  //app.config.globalProperties.$userData = computed(() => userStore.userData)
  await userStore.loadUserAndToken()
  app.use(GlobalPlugin)
  app.mount('#app')
}
bootstrap()
