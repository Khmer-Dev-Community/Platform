<template>
  <div class="flex items-start space-x-3 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
    <img
      :src="comment.avatar"
      :alt="comment.username + ' Avatar'"
      class="w-8 h-8 rounded-full object-cover"
    />
    <div class="flex-1">
      <div class="flex items-baseline space-x-2 mb-1">
        <span class="font-semibold text-gray-800 dark:text-gray-100 text-sm">{{
          comment.username
        }}</span>
        <span class="text-gray-500 dark:text-gray-400 text-xs">{{ comment.timeAgo }}</span>
      </div>
      <p class="text-gray-700 dark:text-gray-300 text-sm mb-2">{{ comment.content }}</p>

      <div class="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-xs">
        <button
          class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <i class="fas fa-arrow-up"></i>
          <span>{{ comment.upvotes }}</span>
        </button>
        <button
          @click="startReplying"
          class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <i class="fas fa-reply"></i>
          <span>Reply</span>
        </button>
      </div>

      <div v-if="currentReplyingToId === comment.id" class="mt-4">
        <textarea
          v-model="replyText"
          placeholder="Write your reply..."
          rows="2"
          class="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        ></textarea>
        <div class="flex justify-end mt-2 space-x-2">
          <button
            @click="cancelReply"
            class="px-4 py-1 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="submitReply"
            :disabled="!replyText.trim()"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Reply
          </button>
        </div>
      </div>

      <div
        v-if="comment.replies && comment.replies.length > 0"
        class="pl-8 mt-4 space-y-4 border-l border-gray-200 dark:border-gray-700"
      >
        <CommentItem
          v-for="reply in comment.replies"
          :key="reply.id"
          :comment="reply"
          :currentReplyingToId="currentReplyingToId"
          @start-reply="startReply"
          @add-reply="handleAddReply"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  currentReplyingToId: {
    type: String,
    default: null, // The ID of the comment/reply currently being replied to in the whole discussion tree
  },
})

const emit = defineEmits(['start-reply', 'add-reply'])

const replyText = ref('')

const startReplying = () => {
  // Emit to parent that this comment is being replied to
  emit('start-reply', props.comment.id)
  // Clear any existing reply text for this specific input
  replyText.value = ''
}

const submitReply = () => {
  if (replyText.value.trim()) {
    emit('add-reply', {
      parentId: props.comment.id,
      replyContent: replyText.value.trim(),
    })
    replyText.value = '' // Clear after submitting
  }
}

const cancelReply = () => {
  replyText.value = '' // Clear text
  emit('start-reply', null) // Indicate no one is being replied to
}

// Re-expose the startReply and handleAddReply events from nested components
// This allows replies to replies to propagate up to PostDetail.vue
const startReply = (id) => {
  emit('start-reply', id)
}

const handleAddReply = (payload) => {
  emit('add-reply', payload)
}
</script>

<style scoped>
/* No specific scoped styles needed if using only Tailwind utility classes */
</style>
