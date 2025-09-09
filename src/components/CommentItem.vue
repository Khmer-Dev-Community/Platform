<template>
  <div
    class="flex items-start space-x-3 bg-gray-10 dark:bg-gray-10 p-4 shadow-none border-b border-gray-50 dark:border-gray-700 -mt-5"
  >
    <img
      :src="comment?.author?.avatar_url"
      :alt="comment?.author?.username + ' Avatar'"
      class="w-8 h-8 rounded-full object-cover"
    />
    <div class="flex-1">
      <div class="flex items-baseline space-x-2 mb-1">
        <span class="text-gray-800 dark:text-gray-100 text-base">{{
          comment?.author.first_name
        }}</span>
        <p class="text-gray-800 dark:text-gray-100 text-sm">@{{ comment?.author.username }}</p>
        <span class="text-gray-500 dark:text-gray-400 text-xs">{{
          proxy.$timeAgo(comment?.created_at)
        }}</span>
      </div>
      <p class="text-gray-700 dark:text-gray-400 text-sm mb-2 mt-2">{{ comment.content }}</p>

      <div class="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-xs mt-2">
        <button
          class="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <i class="fas fa-arrow-up"></i>
          <span>{{ comment.upvotes }}</span>
        </button>
        <button
          v-if="level < 3"
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
          :level="level + 1"
          :currentReplyingToId="currentReplyingToId"
          @start-reply="startReply"
          @add-reply="handleAddReply"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, getCurrentInstance } from 'vue'

// 🟢 Re-import CommentItem for recursion
import CommentItem from './CommentItem.vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
  // 🟢 Accept the new `level` prop
  level: {
    type: Number,
    required: true,
    default: 1,
  },
  currentReplyingToId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['start-reply', 'add-reply'])

const replyText = ref('')

const startReplying = () => {
  emit('start-reply', props.comment.id)
  replyText.value = ''
}

const submitReply = () => {
  if (replyText.value.trim()) {
    emit('add-reply', {
      parentId: props.comment.id,
      replyContent: replyText.value.trim(),
    })
    replyText.value = ''
  }
}

const cancelReply = () => {
  replyText.value = ''
  emit('start-reply', null)
}

const startReply = (id) => {
  emit('start-reply', id)
}

const handleAddReply = (payload) => {
  emit('add-reply', payload)
}
</script>
