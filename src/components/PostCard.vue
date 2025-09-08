<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg lg:shadow-1 p-4 mb-4 border border-gray-100 dark:border-gray-700 -mt-6"
  >
    <div class="flex items-center justify-between mb-3">
      <div class="flex items-center space-x-2">
        <img
          :src="post.author?.avatar_url"
          :alt="post.auth?.first_name + ' Avatar'"
          class="w-8 h-8 rounded-full object-cover"
        />
        <div class="text-sm">
          <router-link :to="`/@${post.author?.username}`" class="cursor-pointer bg-transparent">
            <span class="font-semibold text-gray-800 dark:text-gray-100">{{
              post.author?.first_name
            }}</span></router-link
          ><br />
          <router-link :to="`/@${post.author?.username}`" class="cursor-pointer bg-transparent">
            @{{ post.author?.username }}
          </router-link>

          <span class="text-gray-500 dark:text-gray-400">
            • {{ proxy.$timeAgo(post.created_at) }}</span
          >
        </div>
      </div>
      <button
        type="button"
        v-if="!post.isFollowing"
        class="bg-blue-500 dark:bg-gray-600 px-3 py-1 rounded-full text-xs rounded-full block cursor-pointer hover:bg-blue-600"
        style="color: white; font-size: 13px"
      >
        Follow +
      </button>
      <button
        v-else
        class="border border-purple-500 text-purple-500 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-small transition-colors"
      >
        Following
      </button>
    </div>

    <div class="flex items-start mb-4 block cursor-pointer" @click="selectPost(post)">
      <div class="flex-1">
        <h3 class="text-base lg:font-semibold text-gray-900 dark:text-gray-50 mb-1">
          {{ post.title }}
        </h3>

        <p
          v-if="post.meta"
          class="text-gray-700 dark:text-gray-300 text-sm mb-2 leading-relaxed line-clamp-4 mt-5 hidden lg:block"
        >
          {{ post.meta }}
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

      <div v-if="post.featured_image_url" class="ml-1 lg:ml-20 flex-shrink-0">
        <img
          :src="post.featured_image_url"
          :alt="post.title"
          class="w-20 h-20 object-cover rounded-md lg:w-56 lg:h-36"
        />
      </div>
    </div>
    <div class="flex -mt-4">
      <span
        class="inline-flex items-center justify-center p-2 h-5 bg-gray-100 dark:bg-gray-600 rounded-full mr-2"
        v-for="(tag, index) in post.tags"
        :key="index"
      >
        <span class="text-gray-400 text-xs">{{ tag }}</span>
      </span>
    </div>
    <div
      class="flex items-center justify-between space-x-2 text-gray-600 dark:text-gray-400 text-sm lg:border-t1 border-gray-200 dark:border-gray-700 p-0 mt-2 -mt-0 lg:mt-1 -pr-6"
    >
      <div class="flex items-start space-x-2">
        <span
          @click.stop="handleUpvote(post)"
          class="flex text-xs items-center space-x-1 hover:text-blue-500 bg-gray-200 px-3 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
        >
          <van-icon name="good-job-o" />
          <span>{{ proxy.$formatCount(post?.reaction_count) }} {{ post.reaction }}</span>
        </span>
        <span
          @click.stop="handleCommentClick(post)"
          class="flex text-xs items-center space-x-1 hover:text-blue-500 bg-gray-200 px-3 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
        >
          <i class="far fa-comment-alt"></i>
          <span>{{ proxy.$formatCount(post?.discussion?.length) }}</span>
        </span>
        <span
          @click="SharePost(post)"
          class="flex text-xs items-center space-x-1 hover:text-blue-500 bg-gray-200 px-3 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
        >
          <van-icon name="share-o" />
          <span>Share</span>
        </span>
        <span
          @click.stop="handleBookmark(post)"
          class="flex items-center text-xs space-x-1 hover:text-blue-500 bg-gray-200 px-2 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
        >
          <el-icon><CollectionTag /></el-icon>Save
        </span>
      </div>
      <div class="flex items-center">
        <span
          class="flex items-center text-xs space-x-1 hover:text-blue-500 px-2 py-1 dark:hover:text-blue-400 transition-colors rounded-full block cursor-pointer hover:bg-gray-100 dark:bg-gray-700"
        >
          {{ proxy.$formatCount(post?.view_count) || '0' }} View
        </span>
      </div>
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
import { defineProps, getCurrentInstance, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSelectedPostStore } from '@/stores/emit/post.emit'
import { showToast } from 'vant'
const { proxy } = getCurrentInstance()
const selectedPostStore = useSelectedPostStore()
const router = useRouter() // Initialize useRouter
const showShare = ref(false)

const shareData = {
  title: '',
  description: '',
}
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
    icon: ' https://cdn-icons-png.flaticon.com/256/5326/5326787.png',
  },
]
const props = defineProps({
  post: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      avatar: 'https://via.placeholder.com/32/32',
      username: 'user_name',
      timeAgo: 'X hr ago',
      title: 'Post Title',
      description: null,
      link: null,
      image: null,
      upvotes: 0,
      comments: 0,
      isFollowing: false,
      view_count: 0,
      meta: null,
    }),
  },
})
const selectPost = (post) => {
  selectedPostStore.setSelectedPost(post)
  router.push({
    name: 'PostDetail',
    params: {
      username: post.author.username, // Assuming post.author.username exists
      slug: post.slug,
    },
  })
}
const onSelect = (option) => {
  showToast(option.name)
  showShare.value = false
}
const SharePost = (post) => {
  console.log(post)
  shareData.title = post.title
  shareData.description = post.meta
  showShare.value = true
}
const toggleFollow = (post) => {
  console.log(`Toggling follow for ${post.username}. Current status: ${post.isFollowing}`)
}

const handleUpvote = (post) => {
  console.log(`Upvoting post: ${post.title}`)
  // Emit event or dispatch action to increment upvotes
}

const handleCommentClick = (post) => {
  console.log(`Viewing comments for post: ${post.title}`)
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
.van-popup--bottom {
  width: 500px !important;
}
</style>
