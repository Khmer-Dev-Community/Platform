<template>
  <a
    href="#"
    class="flex items-center space-x-5 pl-5 hover:text-gray-900 relative rounded-md"
    :class="item.active ? 'text-gray-900 bg-gray-100 rounded-md px-3 py-2 font-normal' : ''"
  >
    <i :class="item.icon + ' text-lg w-5'"></i>
    <span>{{ item.text }}</span>
    <span
      v-if="item.badge"
      class="absolute right-0 top-0 -translate-x-1/2 translate-y-1/2 bg-purple-200 text-purple-700 text-xs font-semibold rounded-full px-2"
      >{{ item.badge }}</span
    >
  </a>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    validator: (value) => {
      return 'text' in value && 'icon' in value
    },
  },
})
</script>
