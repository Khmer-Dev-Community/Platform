<template>
  <div
    class="flex items-center justify-between space-x-2 text-gray-600 dark:text-gray-400 text-sm lg:border-t1 border-gray-200 dark:border-gray-700 p-0 mt-2 -mt-0 lg:mt-1 -pr-6"
  >
    <div class="flex items-start space-x-2">
      <span
        @click.stop="handleUpvote"
        class="flex text-xs items-center space-x-1 hover:text-blue-500 bg-gray-200 px-3 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
      >
        <van-icon name="good-job-o" :class="{ 'text-blue-500': localHasUserReacted }" />
        <span>{{ formatCount(localReactionCount) }}</span>
      </span>
      <span
        @click.stop="handleCommentClick"
        class="flex text-xs items-center space-x-1 hover:text-blue-500 bg-gray-200 px-3 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
      >
        <i class="far fa-comment-alt"></i>
        <span>{{ formatCount(post?.comment_count) }}</span>
      </span>
      <span
        @click="handleShare"
        class="flex text-xs items-center space-x-1 hover:text-blue-500 bg-gray-200 px-3 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
      >
        <van-icon name="share-o" />
        <span>Share</span>
      </span>
      <span
        @click.stop="handleBookmark"
        class="flex items-center text-xs space-x-1 hover:text-blue-500 bg-gray-200 px-2 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
      >
        <el-icon><CollectionTag /></el-icon>Save
      </span>
    </div>
    <div class="flex items-center">
      <span
        class="flex items-center text-xs space-x-1 hover:text-blue-500 px-2 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
      >
        {{ formatCount(post?.view_count) || '0' }} View
      </span>
    </div>

    <van-share-sheet
      v-model:show="showShare"
      :title="shareData.title"
      :options="options"
      @select="onSelect"
      class="w-36 items-center"
      :description="shareData.description"
      style="
        max-width: 600px;
        justify-content: center;
        align-items: center;
        left: 50%;
        transform: translate(-50%);
      "
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, reactive, watch } from 'vue'
import { showToast } from 'vant'
import { ReactionService } from '@/services/reaction.service'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  hasUserReacted: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['upvote', 'comment', 'bookmark', 'update-reaction-status'])

const showShare = ref(false)
const shareData = ref({
  title: '',
  description: '',
})

const options = [
  {
    name: 'Facebook',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/960px-Facebook_Logo_%282019%29.png',
  },
  {
    name: 'Instagram',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1024px-Instagram-Icon.png',
  },
  {
    name: 'X',
    icon: 'https://wp.logos-download.com/wp-content/uploads/2023/12/X_Logo_app_icon.svg?dl',
  },
  {
    name: 'Telegram',
    icon: 'https://cdn3.iconfinder.com/data/icons/social-media-chamfered-corner/154/telegram-512.png',
  },
  {
    name: 'Copy Link',
    icon: 'https://cdn-icons-png.flaticon.com/256/5326/5326787.png',
  },
]

const localReactionCount = ref(props.post.reaction_count)
const localHasUserReacted = ref(props.hasUserReacted)

watch(
  () => props.post.reaction_count,
  (newCount) => {
    localReactionCount.value = newCount
  },
)

watch(
  () => props.hasUserReacted,
  (newValue) => {
    localHasUserReacted.value = newValue
  },
)

const handleUpvote = async () => {
  const data = {
    post_id: props.post.id,
    reaction_type: 'like',
  }
  try {
    // Check local state to determine the action
    if (localHasUserReacted.value) {
      // The user is un-liking the post
      localReactionCount.value--
      localHasUserReacted.value = false
    } else {
      // The user is liking the post
      localReactionCount.value++
      localHasUserReacted.value = true
    }

    // Call the API
    await ReactionService().createPostReaction(props.post.id, data)

    // Emit the event to the parent to update the source of truth
    emit('update-reaction-status', {
      postID: props.post.id,
      hasUserReacted: localHasUserReacted.value,
    })
  } catch (error) {
    console.error('Failed to update reaction:', error)
    showToast('Failed to react to post.')
  }
}

const handleCommentClick = () => {
  emit('comment', props.post)
}
const handleBookmark = () => {
  emit('bookmark', props.post)
}
const handleShare = () => {
  shareData.value.title = props.post.title
  shareData.value.description = props.post.meta
  showShare.value = true
}

const formatCount = (count) => {
  if (count === undefined || count === null) {
    return '0'
  }
  return count
}

const onSelect = (option) => {
  showToast(option.name)
  showShare.value = false
}
</script>

<style scoped></style>
