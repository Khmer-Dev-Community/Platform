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
        <span>{{ proxy?.$formatCount(localReactionCount) }}</span>
      </span>
      <span
        @click="selectPost(post)"
        class="flex text-xs items-center space-x-1 hover:text-blue-500 bg-gray-200 px-3 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
      >
        <i class="far fa-comment-alt"></i>
        <span>{{ proxy?.$formatCount(post?.comment_count) }}</span>
      </span>
      <span
        @click="handleShare"
        class="flex text-xs items-center space-x-1 hover:text-blue-500 bg-gray-200 px-3 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
      >
        <van-icon name="share-o" />
        <span>Share</span>
      </span>
      <span
        class="flex items-center text-xs space-x-1 hover:text-blue-500 bg-gray-200 px-2 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
      >
        <span v-if="!saved" @click.stop="handleToggleBookmark"
          ><el-icon><CollectionTag /></el-icon>Save</span
        >
        <span v-else class="text-blue-500" @click.stop="handleToggleBookmark"
          ><el-icon><DocumentRemove class="text-blue-500" /></el-icon> Remove</span
        >
      </span>
    </div>
    <div class="flex items-center">
      <span
        class="flex items-center text-xs space-x-1 hover:text-blue-500 px-2 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
      >
        {{ proxy?.$formatCount(post?.view_count) || '0' }} View
      </span>
    </div>

    <van-share-sheet
      :show="showShare"
      @update:show="showShare = $event"
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
import { defineProps, defineEmits, ref, watch, getCurrentInstance } from 'vue'
import { showToast } from 'vant'
import { ReactionService } from '@/services/reaction.service'
import { useSelectedPostStore } from '@/stores/emit/post.emit'
import { useRouter } from 'vue-router'
import { SavePostService } from '@/services/saved.post.service'

const { proxy } = getCurrentInstance()
const selectedPostStore = useSelectedPostStore()
const router = useRouter()

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
  saved: {
    type: Boolean,
    default: false,
  },
  hasUserReacted: {
    type: Boolean,
    required: true,
  },
})

// The emitted events
const emit = defineEmits([
  'upvote',
  'comment',
  'bookmark',
  'update-reaction-status',
  'unbookmark-success',
])

const showShare = ref(false)
const shareData = ref({
  title: '',
  description: '',
})

const options = [
  { name: 'Facebook', icon: '...' },
  { name: 'Instagram', icon: '...' },
  { name: 'X', icon: '...' },
  { name: 'Telegram', icon: '...' },
  { name: 'Copy Link', icon: '...' },
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

const selectPost = (post) => {
  selectedPostStore.setSelectedPost(post)
  router.push({
    name: 'PostDetail',
    params: {
      username: post.author.username,
      slug: post.slug,
    },
  })
}

const handleUpvote = async () => {
  const data = {
    post_id: props.post.id,
    reaction_type: 'like',
  }
  try {
    if (localHasUserReacted.value) {
      localReactionCount.value--
      localHasUserReacted.value = false
    } else {
      localReactionCount.value++
      localHasUserReacted.value = true
    }
    await ReactionService().createPostReaction(props.post.id, data)
    emit('update-reaction-status', {
      postID: props.post.id,
      hasUserReacted: localHasUserReacted.value,
    })
  } catch (error) {
    console.error('Failed to update reaction:', error)
    showToast('Failed to react to post.')
  }
}

// Single function to handle both saving and unsaving
const handleToggleBookmark = async () => {
  try {
    const data = {
      post_id: props.post.id,
      username: proxy?.$userData.username,
    }
    await SavePostService().createSavePost(props.post.id, data)
    if (props.saved) {
      showToast('Post removed!')
      emit('unbookmark-success', { postId: props.post.id })
    } else {
      showToast('Post saved!')
    }
  } catch (error) {
    console.error('Failed to toggle bookmark:', error)
    showToast('Failed to toggle bookmark.')
  }
}

const handleShare = () => {
  shareData.value.title = props.post.title
  shareData.value.description = props.post.meta
  showShare.value = true
}

const onSelect = (option) => {
  showToast(option.name)
  showShare.value = false
}
</script>

<style scoped></style>
