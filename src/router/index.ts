// router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/module/users' // Import your user store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        fullPage: false,
        title: 'KDC Community | Official',
        metaTags: [
          { name: 'description', content: 'Welcome  KDC community!' },
          { property: 'og:title', content: 'KDC Community  ' },
          { property: 'og:description', content: 'Join discussions and connect with people.' },
        ],
      },
    },
    {
      path: '/home',
      name: 'homeAlias', // Changed name to avoid duplicate for '/home'
      component: () => import('../views/Home.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('../views/HomeView.vue'), // Assuming HomeView is now the actual component
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: {
        fullPage: false,
        requiresAuth: true, // <-- Protect Profile route as well
      },
    },
    {
      path: '/@:username/tap/:active?',
      name: 'profile-active',
      component: () => import('../views/Profile.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/@:username',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: {
        fullPage: false,
      },
    },

    {
      path: '/member',
      name: 'member',
      component: () => import('../views/Member.vue'),
      meta: {
        requiresAuth: true, // <-- Protect Member route if needed
      },
    },
    {
      path: '/@:username/:slug',
      name: 'PostDetail',
      component: () => import('../views/PostDetail.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/post/:id', // Example route parameter for post ID
      name: 'PostDetails',
      component: () => import('../views/PostDetail.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/add-new-post', // Choose your desired URL path
      name: 'AddNewPost',
      component: () => import('../views/AddNewPost.vue'),
      meta: {
        fullPage: false,
        requiresAuth: true,
      },
    },
    {
      path: '/edit-post/:id/:slug',
      name: 'EditPost',
      component: () => import('../views/EditPost.vue'),
      meta: {
        fullPage: false,
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Signin.vue'),
      meta: {
        hideLayout: true,
        fullPage: true,
      },
    },
    {
      path: '/redirect',
      name: 'AuthCallback',
      component: () => import('../views/AuthCallbackPage.vue'),
      meta: {
        hideLayout: true,
        fullPage: true,
      },
    },
    {
      path: '/chats', // Or whatever path you prefer for the chat page
      name: 'Chats',
      component: () => import('../views/ChatPage.vue'),
      meta: {
        fullPage: true,
        requiresAuth: true, // <-- THIS ROUTE REQUIRES AUTHENTICATION
      },
    },
    {
      path: '/get-started',
      name: 'GetStart',
      component: () => import('../views/GetStartedPage.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/notification',
      name: 'Notification',
      component: () => import('../views/NotificationsPage.vue'),
      meta: {
        fullPage: false,
        requiresAuth: true, // <-- Protect Notification route if needed
      },
    },
    {
      path: '/showcase',
      name: 'Showcase',
      component: () => import('../views/ShowcasePage.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/event',
      name: 'Event',
      component: () => import('../views/EventsPage.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/event/post/:id',
      name: 'EventDetail', // Changed name from 'Event Deatil' for consistency
      component: () => import('../views/EventDetailPage.vue'),
      meta: {
        fullPage: false,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0 }
  },
})

// --- Navigation Guard ---
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (!userStore.userData && !userStore.loadingUser) {
    //await userStore.loadUserAndToken()
  }

  const requiresAuth = to.meta.requiresAuth
  const isLoggedIn = userStore.isLogged

  if (requiresAuth && !isLoggedIn) {
    console.log(`Redirecting to /login from ${to.path} (requires auth, not logged in)`)
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if ((to.name === 'Login' || to.name === 'GetStart') && isLoggedIn) {
    console.log(`Redirecting from ${to.path} to / (already logged in)`)
    next({ name: 'home' }) // Or a more appropriate dashboard route
  } else {
    next()
  }
})

export default router
