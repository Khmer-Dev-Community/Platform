<template>
  <div
    class="fixed shadow w-full z-50 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-white border-b border-white dark:border-gray-600"
    style="z-index: 999999"
  >
    <div class="relative mx-auto container px-1 sm:px-4 lg:px-6 hidden lg:block">
      <div class="relative flex items-center justify-between h-14">
        <div class="flex-shrink-0">
          <h1 class="text-lg font-bold">
            <router-link to="/">
              <img src="@/assets/kdc.png" width="160" class="mt-1" />
            </router-link>
          </h1>
        </div>

        <div class="flex-1 max-w-lg mx-auto">
          <div class="relative text-gray-500">
            <div
              @click="$emit('open-search-dialog')"
              aria-label="Search for topics and discussions"
              class="relative flex items-center w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-900 h-[35px] py-2 pl-3 pr-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
            >
              <span class="text-gray-400 mr-2 mt-2">
                <el-icon><Search /></el-icon>
              </span>
              <span class="text-gray-500 dark:text-gray-400 flex-1 text-sm">{{
                $t('input.search')
              }}</span>
              <span class="flex items-center space-x-1 text-gray-400 text-xs">
                <kbd class="kbd kbd-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">⌘</kbd>
                <kbd class="kbd kbd-sm bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded">K</kbd>
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-2 flex-shrink-0">
          <router-link
            to="/about"
            class="px-4 py-2 rounded-md font-medium text-sm sm:text-sm md:text-base font-bold text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
          >
            <van-icon name="service-o" /> {{ $t('menu.about') }} {{ $isLoggedIn }}
          </router-link>

          <div class="relative" v-if="$isLoggedIn">
            <button
              @click="toggleMessageDropdown"
              class="ml-2 rounded-xl py-1 px-3 flex items-center h-[40px] justify-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none msg-dropdown-btn"
            >
              <van-icon name="comment-o" size="21" />
              <span
                class="ml-1 px-1.5 py-0.5 text-xs font-semibold rounded-full bg-red-500 text-white"
                v-if="unreadMessagesCount > 0"
                >{{ unreadMessagesCount }}</span
              >
            </button>

            <div
              v-if="messageDropdownOpen"
              class="absolute right-0 mt-2 w-80 border rounded-md shadow-lg z-10 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 msg-dropdown-content"
            >
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">Messages</h3>
                <button
                  @click="router.push('/chats')"
                  class="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <el-icon><Plus /></el-icon>
                </button>
              </div>
              <div
                class="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 py-6"
              >
                <div class="p-4 rounded-full bg-gray-200 dark:bg-gray-700 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-archive"
                  >
                    <rect width="20" height="5" x="2" y="3" rx="1" />
                    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
                    <path d="M10 12h4" />
                  </svg>
                </div>
                <p class="font-semibold text-lg mb-1">Nothing here!</p>
                <p class="text-sm">You don't have any messages.</p>
              </div>
              <div class="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 text-center">
                <router-link
                  to="/chats"
                  @click="messageDropdownOpen = false"
                  class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >See all messages</router-link
                >
              </div>
            </div>
          </div>

          <div class="relative" v-if="$isLoggedIn">
            <button
              @click="toggleDropDowProfile"
              class="flex items-center space-x-2 profile-dropdown-btn"
            >
              <img
                :src="$userData?.avatar_url || 'https://via.placeholder.com/40'"
                alt="User Avatar"
                class="w-8 h-8 rounded-full object-cover"
              />
              <span class="font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{{
                $userData?.username || 'User'
              }}</span>
              <svg
                class="ml-1 h-4 w-4 text-gray-700 dark:text-gray-300"
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
              v-if="dropDownprofile"
              class="absolute right-0 mt-2 w-48 border rounded-md shadow-lg z-10 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 profile-dropdown-content"
            >
              <router-link
                :to="'/@'+$userData?.username "
                @click="dropDownprofile = false"
                class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </router-link>
              <button
                @click="AppLogout"
                class="block w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
          <div
            v-if="$isLoggedIn"
            class="ml-2 rounded-xl py-1 px-3 flex items-center justify-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none"
          >
            <router-link
              to="/add-new-post"
              class="text-gray-900 dark:text-white"
              style="background: none !important; color: white"
            >
              <el-icon class="text-gray-900 dark:text-white mt-1" size="21"
                ><Plus class="text-gray-900 dark:text-white"
              /></el-icon>
            </router-link>
          </div>
          <button
            @click="toggleTheme"
            class="ml-2 rounded-xl py-1 h-[40px] px-3 flex items-center justify-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none"
            aria-label="Toggle dark mode"
          >
            <el-icon v-if="isDark" size="21"><Moon /></el-icon>
            <el-icon v-else size="21"><Sunny /></el-icon>
          </button>
          <div class="relative">
            <button
              @click="toggleDropdown"
              class="px-3 py-2 rounded-md text-sm sm:text-sm md:text-base font-medium flex items-center mt-0 space text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 lang-dropdown-btn"
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
              class="absolute right-0 mt-2 w-48 border rounded-md shadow-lg z-10 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 lang-dropdown-content"
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
          <button
            class="ml-2 rounded-xl py-1 h-[40px] px-3 flex items-center justify-center bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 focus:outline-none"
            v-if="!$isLoggedIn"
          >
            <router-link to="/login"> {{ $t('menu.login') }} </router-link>
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
    <van-nav-bar
      @click-left="show = true"
      @click-right="loginPage"
      class="lg:hidden pt-1 mt-4 text-gray-900 dark:text-gray-100"
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
          <router-link to="/">
            <img src="@/assets/kdc.png" width="120" class="-mt-2" />
          </router-link>
          {{ $appThem }}
        </div>
      </template>
      <template #right>
        <div style="display: flex; align-items: center">
          <van-icon
            name="chat-o"
            badge="9"
            replace
            to="/chats"
            style="font-size: 25px; margin-left: 20px"
            class="text-gray-700 dark:text-gray-300"
          />

          <div class="relative ml-2" v-if="$isLoggedIn">
            <button
              @click="toggleDropDowProfile"
              class="flex items-center space-x-2 profile-dropdown-btn"
            >
              <img
                :src="$userData?.avatar_url || 'https://via.placeholder.com/40'"
                alt="User Avatar"
                class="w-8 h-8 rounded-full object-cover"
              />
              <span class="font-medium text-gray-700 dark:text-gray-300 hidden sm:block">{{
                $userData?.username || 'User'
              }}</span>
              <svg
                class="ml-1 h-4 w-4 text-gray-700 dark:text-gray-300"
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
              v-if="dropDownprofile"
              class="absolute right-0 mt-2 w-48 border rounded-md shadow-lg z-10 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 profile-dropdown-content"
            >
              <router-link
                :to="'/@'+$userData?.username"
                @click="dropDownprofile = false"
                class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Profile
              </router-link>
              <button
                @click="AppLogout"
                class="block w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </template>
    </van-nav-bar>
    <van-popup
      v-model:show="show"
      position="left"
      :style="{ width: '300px', height: '100%' }"
      @click-overlay="onClickOverlay"
      @click-close-icon="onClickCloseIcon"
      class="bg-white dark:bg-gray-800"
    >
      <van-cell-group class="bg-white dark:bg-gray-800">
        <van-cell
          title="Profile "
          class="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          <button
            @click="AppLogout"
            class="block w-full text-left px-3 py-2 text-sm cursor-pointer transition duration-300 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            <van-icon name="close" />
            Sign Out
          </button>
        </van-cell>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Storage } from '@capacitor/storage'
import { showNotify } from 'vant'
import { useThemeStore } from '@/stores/theme'
import { useUserStore, type UserData } from '@/stores/module/users'
import { Search, Moon, Sunny, Plus } from '@element-plus/icons-vue'
import Cookies from 'universal-cookie'

const emit = defineEmits(['open-search-dialog'])
const cookies = new Cookies(null, { path: '' })
const instance = getCurrentInstance()
const $isLoggedIn = computed<boolean>(
  () => instance?.appContext.config.globalProperties.$isLoggedIn?.value ?? false,
)
const $userData = computed<UserData | null>(
  () => instance?.appContext.config.globalProperties.$userData?.value ?? null,
)

const { t, locale } = useI18n()
const router = useRouter()
const themeStore = useThemeStore()
const userStore = useUserStore()

const isDark = computed(() => themeStore.isDark)

const applyTheme = (isDarkValue: boolean) => {
  if (isDarkValue) document.documentElement.classList.add('dark')
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
  const storedTheme: any = localStorage.getItem('theme')
  if (storedTheme) themeStore.setTheme(storedTheme)
  else
    themeStore.setTheme(
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    )
  applyTheme(isDark.value)
})

const show = ref(false)
const dropdownOpen = ref(false) // For language dropdown
const dropDownprofile = ref(false) // For user profile dropdown
const messageDropdownOpen = ref(false) // State for message dropdown
const unreadMessagesCount = ref(0) // Placeholder for unread count

const languages = [
  { name: 'En', code: 'en' },
  { name: 'ខ្មែរ', code: 'km' },
]

const langSelected = computed(() => {
  const current = languages.find((lang) => lang.code === locale.value)
  return current ? current.name : 'English'
})
const closeAllDropdowns = () => {
  dropdownOpen.value = false
  messageDropdownOpen.value = false
  dropDownprofile.value = false
}

const toggleDropdown = () => {
  closeAllDropdowns()
  dropdownOpen.value = !dropdownOpen.value
}

const toggleMessageDropdown = () => {
  closeAllDropdowns()
  messageDropdownOpen.value = !messageDropdownOpen.value
}

const toggleDropDowProfile = () => {
  closeAllDropdowns()
  dropDownprofile.value = !dropDownprofile.value
}

const selectLanguage = async (langCode: string) => {
  locale.value = langCode
  await Storage.set({ key: 'lang', value: langCode })
  console.log('Language selected:', langCode)
  dropdownOpen.value = false // Close dropdown after selection
}

const AppLogout = async () => {
  cookies.remove('kdc.secure.token', { path: '/' })
  await userStore.clearUser()
  showNotify({ type: 'success', message: 'Logout successful!' })
  //router.push('/login')
  dropDownprofile.value = false
}

const loginPage = () => {
  router.push('/chat')
}

watch(locale, (newLocale) => {
  console.log('Locale changed to:', newLocale)
})

// Add a global click listener to close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    const isOutsideLanguageDropdown =
      !target.closest('.lang-dropdown-btn') && !target.closest('.lang-dropdown-content')
    const isOutsideMessageDropdown =
      !target.closest('.msg-dropdown-btn') && !target.closest('.msg-dropdown-content')
    const isOutsideProfileDropdown =
      !target.closest('.profile-dropdown-btn') && !target.closest('.profile-dropdown-content')

    if (dropdownOpen.value && isOutsideLanguageDropdown) {
      dropdownOpen.value = false
    }
    if (messageDropdownOpen.value && isOutsideMessageDropdown) {
      messageDropdownOpen.value = false
    }
    if (dropDownprofile.value && isOutsideProfileDropdown) {
      dropDownprofile.value = false
    }
  })
})
</script>

<style scoped>
.z-10 {
  z-index: 10;
}
</style>
