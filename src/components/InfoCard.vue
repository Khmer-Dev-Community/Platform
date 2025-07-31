<template>
  <div
    :class="[imageBg]"
    class="flex-shrink-0 h-[180px] lg:h-[220px] rounded-lg p-2 lg:p-5 text-white flex flex-col justify-between overflow-hidden relative"
  >
    <div class="flex justify-between items-center mb-2">
      <i class="fas fa-bullhorn text-sm lg:text-lg"></i>
      <span class="text-sm opacity-80">{{ date }}</span>
    </div>
    <h3 class="text-sm lg:text-lg font-semibold mb-2 line-clamp-5">
      {{ title }}
    </h3>
    <p class="text-sm opacity-90 mb-2 line-clamp-2 hidden sm:block">
      {{ description }}
    </p>
    <a
      href="#"
      class="inline-flex items-center text-sm font-medium hover:underline hidden sm:block"
    >
      Detail
      <i class="fas fa-arrow-right ml-2 text-xs"></i>
    </a>

    <div
      class="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white opacity-10 transform translate-x-1/3 translate-y-1/3"
    ></div>
    <div
      class="absolute top-0 left-0 w-16 h-16 rounded-full bg-white opacity-10 transform -translate-x-1/2 -translate-y-1/2"
    ></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  imageBg: {
    // This will be used to apply a background color class, e.g., 'bg-blue-600'
    type: String,
    default: 'bg-gray-600',
  },
  // You might add a prop for a specific image if these are not just solid color backgrounds
  // imageUrl: {
  //   type: String,
  //   default: null,
  // }
})
</script>

<style scoped>
/* Add utility for line clamping if not already globally defined or using a plugin */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
