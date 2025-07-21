import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'node:path'
export default defineConfig({
  plugins: [
    vue(),
    //vueDevTools(),
    tailwindcss(),
    VueI18nPlugin({
      include: path.resolve(__dirname, './src/locales/lang**'), // Path to your locale files
      fullInstall: false, // Optional: if you want to tree-shake unused parts
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
