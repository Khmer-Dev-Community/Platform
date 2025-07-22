<template>
  <router-link
    :to="item.route"
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
import { defineProps, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    // Add more detailed prop validation if needed
    default: () => ({
      text: 'Default Item',
      icon: 'fas fa-question-circle',
      route: '/',
      badge: null,
    }),
  },
})

const route = useRoute()

const isActive = computed(() => {
  if (typeof props.item.route === 'object' && props.item.route.name) {
    return route.name === props.item.route.name
  }
  // Fallback to path matching if route is a string path
  if (typeof props.item.route === 'string') {
    // For exact match:
    return route.path === props.item.route
  }
  return false
})

const activateItem = () => {}
</script>

<style scoped></style>
