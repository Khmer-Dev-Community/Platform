<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 border border-gray-100 dark:border-gray-700"
  >
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-2">
        <img
          :src="post.avatar"
          :alt="post.username + ' Avatar'"
          class="w-8 h-8 rounded-full object-cover"
        />
        <div class="text-sm">
          <span class="font-semibold text-gray-800 dark:text-gray-100">{{ post.username }}</span>
          <span class="text-gray-500 dark:text-gray-400"> • {{ post.timeAgo }}</span>
        </div>
      </div>
      <button
        v-if="!post.isFollowing"
        @click.stop="toggleFollow(post)"
        class="bg-purple-500 hover:bg-purple-600 text-white dark:text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-colors"
      >
        Follow +
      </button>
      <button
        v-else
        @click.stop="toggleFollow(post)"
        class="border border-purple-500 text-purple-500 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium transition-colors"
      >
        Following
      </button>
    </div>

    <router-link :to="{ name: 'PostDetail', params: { id: post.id } }" class="block cursor-pointer">
      <div class="flex items-start mb-4">
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-1">
            {{ post.title }}
          </h3>
          <p
            v-if="post.description"
            class="text-gray-700 dark:text-gray-300 text-sm mb-2 leading-relaxed line-clamp-3"
          >
            {{ post.description }}
          </p>
          <a
            v-if="post.link"
            :href="post.link"
            @click.stop
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
    </router-link>

    <div class="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm">
      <button
        @click.stop="handleUpvote(post)"
        class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <i class="fas fa-arrow-up"></i>
        <span>{{ formatCount(post.upvotes) }}</span>
      </button>
      <button
        @click.stop="handleCommentClick(post)"
        class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <i class="far fa-comment-alt"></i>
        <span>{{ formatCount(post.comments) }}</span>
      </button>
      <button
        @click.stop="handleShare(post)"
        class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <i class="fas fa-share"></i>
        <span>Share</span>
      </button>
      <button
        @click.stop="handleBookmark(post)"
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
import { useRouter } from 'vue-router' // Import useRouter

const props = defineProps({
  post: {
    type: Object,
    required: true,
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

const router = useRouter() // Initialize useRouter

// Helper function to format large numbers (e.g., 8,2K)
const formatCount = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// --- Action handlers for engagement buttons ---
const toggleFollow = (post) => {
  // In a real app, you would emit an event or dispatch an action to a store
  // to update the `isFollowing` status and persist it.
  // For now, let's just log it.
  console.log(`Toggling follow for ${post.username}. Current status: ${post.isFollowing}`)
  // If you need immediate visual feedback, the 'post' prop would need to be mutable
  // (e.g., if you're using a shallow copy or a store that updates the original object)
  // or you'd need to emit an event to the parent to update the array.
  // post.isFollowing = !post.isFollowing; // This directly modifies prop, generally not recommended
}

const handleUpvote = (post) => {
  console.log(`Upvoting post: ${post.title}`)
  // Emit event or dispatch action to increment upvotes
}

const handleCommentClick = (post) => {
  console.log(`Viewing comments for post: ${post.title}`)
  // Option 1: Navigate to post detail and scroll to comments (more complex)
  // Option 2: Simply navigate to post detail (current implementation will do this via router-link)
  // router.push({ name: 'PostDetail', params: { id: post.id } }); // This is what router-link does
}

const handleShare = (post) => {
  console.log(`Sharing post: ${post.title}`)
  // Implement share functionality (e.g., Web Share API)
}

const handleBookmark = (post) => {
  console.log(`Bookmarking post: ${post.title}`)
  // Emit event or dispatch action to toggle bookmark status
}
</script>

<style scoped>
/* No specific scoped styles needed if using only Tailwind utility classes */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
