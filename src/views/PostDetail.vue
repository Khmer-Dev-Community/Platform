<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-2 p-1 px-2">
    <div class="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-4">
      <button
        @click="$router.back()"
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 flex items-center space-x-2"
      >
        <i class="fas fa-arrow-left"></i>
        <span>Back to Feed</span>
      </button>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <img
            :src="post.avatar"
            :alt="post.username + ' Avatar'"
            class="w-10 h-10 rounded-full object-cover"
          />
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

      <div v-if="post.image" class="mb-4">
        <img
          :src="post.image"
          :alt="post.title"
          class="w-full h-auto object-cover rounded-lg shadow-sm"
        />
      </div>

      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">{{ post.title }}</h1>
      <p
        v-if="post.description"
        class="text-gray-700 dark:text-gray-300 text-base mb-4 leading-relaxed"
      >
        {{ post.description }}
      </p>
      <a
        v-if="post.link"
        :href="post.link"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 dark:text-blue-400 hover:underline text-sm break-all mb-4 block"
      >
        {{ post.link }}
      </a>

      <div
        class="flex items-center space-x-6 text-gray-600 dark:text-gray-400 text-sm border-t border-b border-gray-200 dark:border-gray-700 py-3 mb-6"
      >
        <span class="flex items-center space-x-1">
          <i class="fas fa-eye"></i>
          <span>{{ post.detailViews }} Views</span>
        </span>
        <span class="flex items-center space-x-1">
          <i class="fas fa-arrow-up"></i>
          <span>{{ formatCount(post.upvotes) }} Upvotes</span>
        </span>
        <span class="flex items-center space-x-1">
          <i class="far fa-comment-alt"></i>
          <span>{{ formatCount(post.comments) }} Comments</span>
        </span>
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Leave a Comment</h2>
        <textarea
          v-model="newCommentText"
          placeholder="Write your comment here..."
          rows="3"
          class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        ></textarea>
        <div class="flex justify-end mt-3">
          <button
            @click="addComment"
            :disabled="!newCommentText.trim()"
            class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </div>
      </div>

      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
        Discussion ({{ formatCount(post.discussion.length) }})
      </h2>
      <div class="space-y-6">
        <CommentItem
          v-for="comment in post.discussion"
          :key="comment.id"
          :comment="comment"
          :currentReplyingToId="currentReplyingToId"
          @start-reply="startReply"
          @add-reply="handleAddReply"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fakePostDetail } from '@/services/data/fakePostDetail.ts' // Adjust path
import CommentItem from '@/components/CommentItem.vue' // New component for individual comments

// Reactive state for the post data
const post = ref(fakePostDetail)
const newCommentText = ref('')
const currentReplyingToId = ref(null) // Stores the ID of the comment/reply being replied to

// Function to format numbers (e.g., K for thousands)
const formatCount = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// --- Commenting Logic ---
const addComment = () => {
  if (newCommentText.value.trim() === '') return

  const newComment = {
    id: 'comment-' + Date.now(), // Simple unique ID
    avatar: 'https://randomuser.me/api/portraits/men/99.jpg', // Placeholder for current user's avatar
    username: 'Current_User', // Placeholder for current user's username
    timeAgo: 'Just now',
    content: newCommentText.value.trim(),
    upvotes: 0,
    replies: [],
  }

  post.value.discussion.unshift(newComment) // Add to the beginning of the discussion array
  newCommentText.value = '' // Clear input
  post.value.comments++ // Increment total comments count
}

// --- Reply Logic ---
const startReply = (commentId) => {
  currentReplyingToId.value = commentId
  // You might want to scroll to the comment input or give it focus here
}

const handleAddReply = ({ parentId, replyContent }) => {
  if (replyContent.trim() === '') return

  const newReply = {
    id: 'reply-' + Date.now(),
    avatar: 'https://randomuser.me/api/portraits/men/99.jpg', // Current user's avatar
    username: 'Current_User', // Current user's username
    timeAgo: 'Just now',
    content: replyContent.trim(),
    upvotes: 0,
    replies: [], // Replies to replies are possible in this structure
  }

  const findAndAddReply = (comments, targetId, reply) => {
    for (const comment of comments) {
      if (comment.id === targetId) {
        comment.replies.push(reply)
        return true
      }
      if (comment.replies && comment.replies.length > 0) {
        if (findAndAddReply(comment.replies, targetId, reply)) {
          return true
        }
      }
    }
    return false
  }

  findAndAddReply(post.value.discussion, parentId, newReply)
  currentReplyingToId.value = null // Clear reply state
  post.value.comments++ // Increment total comments count
}

onMounted(() => {
  // In a real application, you would fetch post data based on a route parameter here
  // e.g., const postId = useRoute().params.id;
  // fetchPost(postId).then(data => post.value = data);
})
</script>

<style scoped>
/* No specific scoped styles needed here if using only Tailwind utility classes */
</style>
