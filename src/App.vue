<template>
  <div
    class="w-full transition-colors duration-300 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
  >
    <AppNavbar class="top-0 left-0 right-0 z-40 shadow-md hidden sm:block" />

    <div
      v-if="isLoading"
      class="fixed inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 z-50"
    >
      <div class="spinner"></div>
    </div>

    <transition name="slide" mode="out-in" @before-enter="startLoading" @after-enter="stopLoading">
      <div class="relative mx-auto container flex gap-4 px-0 md:px-4 flex-col lg:flex-row mt-10">
        <SidebarNav
          :navItems="navItems"
          class="sticky top-[10px] h-[calc(80vh-10px)] overflow-y-auto z-10 w-48 bg-white dark:bg-gray-800 p-4 shadow-md self-start"
        />

        <div class="flex-1 py-4 -mt-4">
          <el-scrollbar class="h-[200vh]">
            <router-view :key="$route.path" />
          </el-scrollbar>
        </div>
        <EventCard
          :navItems="navItems"
          class="sticky top-[10px] h-[calc(100vh-10px)] ml-1 overflow-y-auto z-10 bg-white dark:bg-gray-800 p-2 shadow-md self-start"
        />
      </div>
    </transition>
  </div>
</template>

<script>
// ... (Your script section remains the same as the last provided one)
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import AppNavbar from '@/layout/Navbar.vue'
import SidebarNav from '@/layout/Sidebar.vue'
import EventCard from '@/layout/EventCard.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'MainLayout',
  components: {
    AppNavbar,
    SidebarNav,
    EventCard,
  },
  setup() {
    const isLoading = ref(false)
    const router = useRouter()
    const { locale } = useI18n()

    const navItems = [
      { text: 'Explore', icon: 'fas fa-home', active: false },
      { text: 'Feed', icon: 'fas fa-rss', active: false },
      { text: 'Notifications', icon: 'far fa-bell', active: false, badge: '10' },
      { text: 'Members', icon: 'fas fa-user-friends', active: false },
      { text: 'My profile', icon: 'far fa-user-circle', active: false },
      { text: 'Discussions', icon: 'far fa-comment-dots', active: false },
      { text: 'Articles', icon: 'fas fa-list-ul', active: false },
      { text: 'Events', icon: 'far fa-calendar-alt', active: false },
      { text: 'Groups', icon: 'fas fa-users', active: false },
      { text: 'Wishlist', icon: 'fas fa-magic', active: true },
      { text: 'Help center', icon: 'far fa-book-open', active: false },
      { text: 'Resources', icon: 'fas fa-code', active: false },
      { text: 'Roadmap', icon: 'far fa-map', active: false },
      { text: 'Changelog', icon: 'fas fa-list', active: false },
    ]

    const startLoading = () => {
      isLoading.value = true
    }
    const stopLoading = () => {
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
    watch(router.currentRoute, () => {
      startLoading()
      setTimeout(stopLoading, 500)
    })

    const applyLanguageFont = (currentLocale) => {
      document.documentElement.classList.remove('font-igflexs-kh', 'font-english')
      if (currentLocale === 'km') {
        document.documentElement.classList.add('font-igflexs-kh')
      } else {
        document.documentElement.classList.add('font-english')
      }
      document.documentElement.setAttribute('lang', currentLocale)
    }

    watch(
      locale,
      (newLocale) => {
        applyLanguageFont(newLocale)
      },
      { immediate: true },
    )
    onMounted(() => {})

    return {
      isLoading,
      startLoading,
      stopLoading,
      navItems,
    }
  },
}
</script>

<style scoped>
/* ... (Your style section remains the same as the last provided one) */
/* Transition styles for router-view content */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

/* Loading overlay and spinner styles */
.loading-overlay {
  /* Tailwind classes handle position, z-index, and background */
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff; /* Example primary color */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Ensure body font is consistently applied */
html {
  font-family: 'Inter', sans-serif; /* Default font if not overridden by language */
}

/* Custom fonts for specific languages (defined in your CSS/Tailwind config) */
.font-igflexs-kh {
  font-family: 'igflexs-kh', sans-serif; /* Replace with your actual Khmer font */
}
.font-english {
  font-family: 'Inter', sans-serif; /* Or your preferred English font */
}
</style>
