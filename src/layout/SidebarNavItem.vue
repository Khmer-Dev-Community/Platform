<template>
  <router-link
    :to="computedRoute"
    :class="[
      'flex items-center space-x-1 p-2 rounded-lg transition-colors duration-200',
      'hover:bg-purple-100 hover:text-purple-700',
      'dark:hover:bg-gray-600 dark:hover:text-purple-400',
      {
        'bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-white font-semibold': isActive,
      },
    ]"
    @click="activateItem"
  >
    <i :class="item.icon" class="w-5 h-5 text-md"></i>

    <span class="text-base">{{ item.text }}</span>
    <span
      v-if="item.badge"
      class="ml-auto px-1 py-0.5 text-xs font-semibold bg-purple-200 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-200"
    >
      {{ item.badge }}
    </span>
  </router-link>
</template>

<script setup>
import { defineProps, computed, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/module/users'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: () => ({
      text: 'Default Item',
      icon: 'fas fa-question-circle',
      route: '/',
      badge: null,
    }),
  },
})

const route = useRoute()
const userStore = useUserStore()

const computedRoute = computed(() => {
  if (props.item.route === '@me') {
    return `/@${userStore.userData?.username}`
  }
  // Otherwise, return the standard route string
  return props.item.route
})

const isActive = computed(() => {
  if (typeof props.item.route === 'object' && props.item.route.name) {
    return route.name === props.item.route.name
  }

  if (props.item.route === '/@me') {
    return route.path === `/@${userStore.userData?.username}`
  }
  // Fallback to path matching for all other string routes
  if (typeof props.item.route === 'string') {
    return route.path === props.item.route
  }
  return false
})

const activateItem = () => {}
</script>

<style scoped></style>
