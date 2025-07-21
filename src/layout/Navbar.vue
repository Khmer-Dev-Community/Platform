<template>
  <div
    class="shadow w-full z-50 transition-colors duration-300 bg-white dark:bg-gray-700 dark:text-white"
    style="z-index: 999999"
  >
    <div class="max-w-screen-xl mx-auto px-1 sm:px-4 lg:px-6 hidden lg:block">
      <div class="relative flex items-center justify-between h-14">
        <div class="flex items-center justify-between justify-between fxi">
          <div class="flex-shrink-0">
            <h1 class="text-lg font-bold">
              <router-link to="/">
                <img src="@/assets/logo.svg" width="60" class="mt-0" />
              </router-link>
            </h1>
          </div>
          <div class="hidden md:flex md:ml-8 space-x-2 w-300">
            <div class="flex-1 max-w-lg mx-2">
              <div class="relative text-gray-500">
                <input
                  v-model="internalSearch"
                  @input="$emit('search-updated', internalSearch)"
                  aria-label="Search for topics and discussions"
                  class="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-900 h-[35px] py-2 pl-10 pr-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  :placeholder="$t('input.search')"
                  type="search"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/3 text-gray-400">
                  <el-icon><Search /></el-icon>
                </span>
              </div>
            </div>
            <router-link
              to="/about"
              class="px-4 py-2 rounded-md font-medium text-sm sm:text-sm md:text-base font-bold text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <van-icon name="service-o" /> {{ $t('menu.about') }}
            </router-link>
            <router-link
              v-if="$isLoggedIn()"
              to="/contact"
              class="px-4 py-2 rounded-md font-medium text-sm sm:text-sm md:text-base text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <van-icon name="comment-o" /> Message
            </router-link>

            <div class="relative float-right">
              <button
                @click="toggleDropdown"
                class="px-3 py-2 rounded-md text-sm sm:text-sm md:text-base font-medium flex items-center mt-0 space text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="0.95px"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-globe size-5"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                  <path d="M2 12h20"></path>
                </svg>
                &nbsp;
                {{ langSelected }}
                <svg
                  class="ml-1 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-48 border rounded-md shadow-lg z-10 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <button
                  v-for="language in languages"
                  :key="language.code"
                  @click="selectLanguage(language.code)"
                  class="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:bg-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  {{ language.name }}
                </button>
              </div>
            </div>

            <el-button-group
              class="px-3 py-3 text-sm font-small -m-2 text-white"
              v-if="!$isLoggedIn()"
            >
              <el-button
                class="bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 text-white dark:bg-gray-700"
              >
                <router-link to="/login"
                  ><van-icon name="user-o" /> {{ $t('menu.login') }}
                </router-link>
              </el-button>
              <el-button
                class="bg-blue-500 hover:bg-blue-600 dark:bg-gray-700 text-white dark:bg-gray-700"
              >
                <router-link to="/scanner" v-if="!$isLoggedIn()"
                  ><van-icon name="add-o" /> {{ $t('menu.signup') }}
                </router-link>
              </el-button>
            </el-button-group>
            <button
              @click="toggleTheme"
              class="ml-2 rounded-xl py-1 px-3 flex items-center justify-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              <el-icon v-if="isDark" size="21"><Moon /></el-icon>
              <el-icon v-else size="21"><Sunny /></el-icon>
            </button>
          </div>
          <div class="flex lg:hidden">
            <button @click="toggleMenu" class="text-gray-700 focus:outline-none">
              <svg
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <van-nav-bar
      :title="title"
      @click-left="show = true"
      @click-right="loginPage"
      class="lg:hidden pt-1 -mt-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    >
      <template #left>
        <div style="display: flex; align-items: center">
          <van-icon
            name="list-switch"
            style="font-size: 25px; margin-right: 10px"
            replace
            to="/home"
            class="text-gray-700 dark:text-gray-300"
          />
        </div>
      </template>
      <template #right>
        <div style="display: flex; align-items: center">
          <van-icon
            :name="isDark ? 'sunny-o' : 'moon-o'"
            size="25"
            @click.stop="toggleTheme"
            class="text-gray-700 dark:text-gray-300 ml-4"
          />

          <van-icon
            name="chat-o"
            badge="9"
            replace
            to="/chat"
            style="font-size: 25px; margin-left: 20px"
            class="text-gray-700 dark:text-gray-300"
          />
          <van-icon
            name="scan"
            style="font-size: 25px; margin-left: 20px"
            replace
            to="/scan"
            class="text-gray-700 dark:text-gray-300"
          />
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Storage } from '@capacitor/storage'
import { showNotify } from 'vant'
import { useThemeStore } from '@/stores/theme'

export default {
  setup() {
    const { t, locale } = useI18n()
    const router = useRouter()
    const themeStore = useThemeStore()
    const isDark = computed(() => themeStore.isDark)

    const applyTheme = (isDark) => {
      if (isDark) document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    }
    const toggleTheme = () => {
      const newTheme = isDark.value ? 'light' : 'dark'
      themeStore.setTheme(newTheme)
      localStorage.setItem('theme', newTheme)
      applyTheme(isDark.value)
    }

    watch(
      isDark,
      (newVal) => {
        document.documentElement.classList.toggle('dark', newVal)
      },
      { immediate: true },
    )
    onMounted(() => {
      const storedTheme = localStorage.getItem('theme')
      if (storedTheme) isDark.value = storedTheme === 'dark'
      else isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(isDark.value)
    })

    const show = ref(false)
    const dropdownOpen = ref(false)
    const dropDownprofile = ref(false)

    const languages = [
      { name: 'English', code: 'en' },
      { name: 'ខ្មែរ', code: 'km' },
    ]

    const langSelected = computed(() => {
      const current = languages.find((lang) => lang.code === locale.value)
      return current ? current.name : 'English'
    })

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value
    }

    const selectLanguage = async (langCode) => {
      locale.value = langCode
      await Storage.set({ key: 'lang', value: langCode })
      console.log(langCode)
      dropdownOpen.value = false
    }

    const AppLogout = async () => {
      await Storage.remove({ key: 'userToken' })
      await Storage.remove({ key: 'islogged' })
      await Storage.remove({ key: 'userData' })
      showNotify({ type: 'success', message: 'Logout successful!' })
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }

    const loginPage = () => router.push('/chat')
    const toggleDropDowProfile = () => (dropDownprofile.value = !dropDownprofile.value)
    watch(locale, (newLocale) => {
      console.log('Locale changed to:', newLocale)
    })
    return {
      t,
      show,
      loginPage,
      langSelected,
      dropdownOpen,
      languages,
      toggleDropdown,
      selectLanguage,
      toggleDropDowProfile,
      dropDownprofile,
      AppLogout,
      isDark,
      toggleTheme,
    }
  },

  props: {
    title: {
      type: String,
      default: 'JOB LINKED',
    },
  },
}
</script>

<style>
.sm\:ml-6 {
  margin-left: 0px !important;
}

.van-nav-bar__title {
  font-size: 18px;
  font-weight: bold;
  color: #333; /* Default light mode color */
}
html.dark .van-nav-bar__title {
  color: #f3f4f6; /* Tailwind gray-100 */
}
html.dark .van-nav-bar .van-icon {
  color: #d1d5db; /* Tailwind gray-300 for icons */
}
html.dark .van-cell__title {
  color: #e5e7eb; /* Tailwind gray-200 for cell titles */
}
html.dark .van-cell {
  background-color: #1f2937; /* Tailwind gray-800 for cell background */
}
</style>
