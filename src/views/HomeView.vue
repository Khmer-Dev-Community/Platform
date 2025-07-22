<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 border border-gray-200 dark:border-gray-700"
  >
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-2">
        <img :src="post.avatar" alt="User Avatar" class="w-8 h-8 rounded-full object-cover" />
        <div class="text-sm">
          <span class="font-semibold text-gray-800 dark:text-gray-100">{{ post.username }}</span>
          <span class="text-gray-500 dark:text-gray-400"> • {{ post.timeAgo }}</span>
        </div>
      </div>
      <button
        v-if="!post.isFollowing"
        class="bg-purple-500 hover:bg-purple-600 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-colors"
      >
        Follow +
      </button>
      <button
        v-else
        class="border border-purple-500 text-purple-500 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium transition-colors"
      >
        Following
      </button>
    </div>

    <div class="flex items-start mb-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">
          {{ post.title }}
        </h3>
        <p
          v-if="post.description"
          class="text-gray-700 dark:text-gray-300 text-sm mb-2 leading-relaxed"
        >
          {{ post.description }}
        </p>
        <a
          v-if="post.link"
          :href="post.link"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all"
        >
          {{ post.link }}
        </a>
      </div>
      <div v-if="post.image" class="ml-4 flex-shrink-0">
        <img :src="post.image" :alt="post.title" class="w-24 h-24 object-cover rounded-md" />
      </div>
    </div>

    <div class="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm">
      <button
        class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <i class="fas fa-arrow-up"></i>
        <span>{{ formatCount(post.upvotes) }}</span>
      </button>
      <button
        class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <i class="far fa-comment-alt"></i>
        <span>{{ formatCount(post.comments) }}</span>
      </button>
      <button
        class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <i class="fas fa-share"></i>
        <span>Share</span>
      </button>
      <button
        class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <i class="far fa-bookmark"></i>
        <span></span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true,
    // Define the shape of the post object for better prop validation and clarity
    default: () => ({
      id: '',
      avatar: 'https://via.placeholder.com/32/32', // Default avatar
      username: 'user_name',
      timeAgo: 'X hr ago',
      title: 'Post Title',
      description: null, // Can be null for posts with just a title/link
      link: null, // URL for external link
      image: null, // URL for thumbnail image
      upvotes: 0,
      comments: 0,
      isFollowing: false,
    }),
  },
})

// Helper function to format large numbers (e.g., 8,2K)
const formatCount = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
/* No specific scoped styles needed if using only Tailwind utility classes */
</style>
