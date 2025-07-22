<template>
  <div
    class="w-full transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white"
  >
    <AppNavbar
      class="top-0 left-0 right-0 z-40 shadow-md hidden sm:block"
      @open-search-dialog="showSearchDialog = true"
      v-if="!$route.meta.hideLayout"
    />

    <SearchDialog
      :isVisible="showSearchDialog"
      :searchTerm="currentSearchTerm"
      @update:searchTerm="updateSearchTerm"
      @close="showSearchDialog = false"
      @search="handleSearchSubmit"
    />

    <div
      v-if="isLoading"
      class="fixed inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 z-50"
    >
      <div class="spinner"></div>
    </div>

    <transition
      name="slide"
      mode="out-in"
      @before-enter="startLoading"
      @after-enter="stopLoading"
      class="mt-10"
    >
      <div v-if="$route.meta.hideLayout" class="relative w-full min-h-screen">
        <router-view :key="$route.path" />
      </div>

      <div
        v-else
        class="relative mx-auto container flex gap-4 px-0 md:px-4 flex-col lg:flex-row pt-10"
      >
        <SidebarNav
          v-if="!$route.meta.fullPage"
          :navItems="navItems"
          class="sticky top-[60px] h-[calc(80vh-30px)] overflow-y-auto z-10 w-48 bg-white dark:bg-gray-800 p-4 self-start"
        />

        <div class="flex-1 py-2 -mt-6">
          <el-scrollbar class="h-[200vh]">
            <router-view :key="$route.path" />
            <div class="mt-4" v-if="!$route.meta.fullPage">
              <PostCard v-for="post in fakePosts" :key="post.id" :post="post" class="mb-4" />
            </div>
          </el-scrollbar>
        </div>

        <EventCard
          :navItems="navItems"
          v-if="!$route.meta.fullPage"
          class="sticky top-[60px] h-[calc(100vh-30px)] ml-1 overflow-y-auto z-10 bg-white dark:bg-gray-900 p-2 shadow-md self-start"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router' // Import useRoute
import { useThemeStore } from '@/stores/theme' // Assuming this is still used for theme logic
import AppNavbar from '@/layout/Navbar.vue'
import SidebarNav from '@/layout/Sidebar.vue'
import EventCard from '@/layout/EventCard.vue'
import { useI18n } from 'vue-i18n'
import SearchDialog from './components/SearchDialog.vue'
import PostCard from './components/PostCard.vue'
import { fakePosts } from '@/services/data/fakePosts'
import { navItems } from '@/services/data/menuItems'

export default {
  name: 'MainLayout',
  components: {
    AppNavbar,
    SidebarNav,
    EventCard,
    SearchDialog,
    PostCard,
  },
  setup() {
    const isLoading = ref(false)
    const router = useRouter()
    const route = useRoute() // Initialize useRoute
    const { locale } = useI18n()
    // State for the search dialog
    const showSearchDialog = ref(false)
    const currentSearchTerm = ref('')

    const startLoading = () => {
      isLoading.value = true
    }
    const stopLoading = () => {
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
    watch(router.currentRoute, () => {
      // startLoading()
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
    // Handlers for SearchDialog events
    const updateSearchTerm = (newTerm) => {
      currentSearchTerm.value = newTerm
      console.log('Search term updated:', newTerm)
    }

    const handleSearchSubmit = (term) => {
      console.log('Search performed for:', term)
    }

    watch(
      locale,
      (newLocale) => {
        applyLanguageFont(newLocale)
      },
      { immediate: true },
    )
    onMounted(() => {
      // Ensure the correct font is applied on initial load
      applyLanguageFont(locale.value)
    })

    return {
      isLoading,
      startLoading,
      stopLoading,
      navItems,
      showSearchDialog,
      currentSearchTerm,
      updateSearchTerm,
      handleSearchSubmit,
      fakePosts,
      route, // Make 'route' available in the template
    }
  },
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
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
