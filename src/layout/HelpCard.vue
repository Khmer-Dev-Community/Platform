<template>
  <article
    class="bg-white rounded-lg p-6 shadow-sm border border-transparent hover:border-gray-200 transition select-none"
  >
    <div
      class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4"
      :aria-label="card.iconLabel"
      role="img"
    >
      <i :class="card.icon + ' text-lg'"></i>
    </div>
    <h2 class="font-semibold text-gray-900 mb-2 text-base">
      {{ card.title }}
    </h2>
    <p class="text-gray-500 text-sm mb-4 leading-relaxed">
      {{ card.description }}
    </p>
    <div class="flex items-center text-gray-400 text-xs space-x-2">
      <i class="far fa-file-alt"></i>
      <span>{{ card.articles }} articles in this collection</span>
    </div>
  </article>
</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
    validator: (value) => {
      return 'title' in value && 'description' in value && 'articles' in value && 'icon' in value
    },
  },
})
</script>
