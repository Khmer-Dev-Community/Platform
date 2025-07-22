import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/feed',
      name: 'feed',
      component: HomeView,
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
      },
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/Member.vue'),
    },
    {
      path: '/post/:id', // Example route parameter for post ID
      name: 'PostDetail',
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
      path: '/chats', // Or whatever path you prefer for the chat page
      name: 'Chats',
      component: () => import('../views/ChatPage.vue'),
      meta: {
        fullPage: true,
      },
    },
    {
      path: '/get-started', // Or whatever path you prefer for the chat page
      name: 'GetStart',
      component: () => import('../views/GetStartedPage.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/notification', // Or whatever path you prefer for the chat page
      name: 'Notification',
      component: () => import('../views/NotificationsPage.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/showcase', // Or whatever path you prefer for the chat page
      name: 'Showcase',
      component: () => import('../views/ShowcasePage.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/event', // Or whatever path you prefer for the chat page
      name: 'Event',
      component: () => import('../views/EventsPage.vue'),
      meta: {
        fullPage: false,
      },
    },
    {
      path: '/event/post/:id', // Or whatever path you prefer for the chat page
      name: 'Event Deatil',
      component: () => import('../views/EventDetailPage.vue'),
      meta: {
        fullPage: false,
      },
    },
  ],
})

export default router
