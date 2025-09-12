<template>
  <div class="mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-none relative">
    <div class="absolute top-4 right-4">
      <div class="relative">
        <button
          @click="emits('toggle-menu', id)"
          class="text-gray-500 px-2 py-1 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none rounded-full block cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 -mt-3 -mr-2"
        >
          <i class="fas fa-ellipsis-h"></i>
        </button>

        <div
          v-if="isOpen"
          class="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-0 ring-black ring-opacity-5 z-10"
        >
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              v-if="owner && userStore.isLogged"
              @click="EditPost"
              class="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              role="menuitem"
            >
              <i class="fas fa-edit mr-2"></i> Edit
            </button>
            <button
              v-if="owner && userStore.isLogged"
              @click="action('delete')"
              class="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              role="menuitem"
            >
              <i class="fas fa-trash-alt mr-2"></i> Delete
            </button>
            <button
              @click="action('report')"
              class="w-full text-left px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              role="menuitem"
            >
              <i class="fas fa-flag mr-2"></i> Report
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex space-x-4 items-start mb-4 block cursor-pointer" @click="selectPost(post)">
      <div class="flex-1">
        <div class="flex items-center space-x-2">
          <img
            :src="author_profile"
            :alt="author + ' Avatar'"
            class="w-8 h-8 rounded-full object-cover"
          />
          <div class="text-sm dark:bg-gray-800">
            <router-link :to="`/@${post.author?.username}`" class="cursor-pointer bg-transparent">
              <span class="font-semibold text-gray-800 dark:text-gray-100 dark:bg-gray-800">{{
                post.author?.first_name
              }}</span></router-link
            ><br />
            <router-link
              :to="`/@${post.author?.username}`"
              class="cursor-pointer bg-transparent dark:bg-gray-800"
            >
              <span class="dark:bg-gray-800 dark:text-gray-100"> @{{ post.author?.username }}</span>
            </router-link>

            <span class="text-gray-500 dark:text-gray-400">
              • {{ proxy.$timeAgo(post.created_at) }}</span
            >
          </div>
        </div>
        <h2 class="text-sm lg:text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
          {{ title }}
        </h2>
        <p
          class="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed line-clamp-3 lg:line-clamp-4"
        >
          {{ content }}
        </p>
      </div>

      <div v-if="featured" class="flex-shrink-0 mt-3 w-36 lg:w-56 justify-end">
        <img :src="featured" :alt="title" class="w-full h-24 lg:h-36 object-cover rounded-md" />
      </div>
    </div>
    <div class="flex flex-wrap gap-2 mb-3">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
      >
        {{ tag }}
      </span>
    </div>
    <PostActions
      :post="post"
      :saved="isSaved"
      :has-user-reacted="hasUserReacted"
      @unbookmark-success="handleUnbookmarkSuccess"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useSelectedPostStore } from '@/stores/emit/post.emit'
import PostActions from '@/components/PostAction.vue'

import { useUserStore } from '@/stores/module/users'
const selectedPostStore = useSelectedPostStore()
const { proxy } = getCurrentInstance()
const userStore = useUserStore()
const router = useRouter()
const props = defineProps({
  author: {
    type: String,
    required: true,
  },
  author_profile: {
    type: String,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  featured: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  date: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  post: {
    type: Object,
    required: true,
  },
  owner: {
    type: Boolean,
    default: false,
  },
  isSaved: {
    type: Boolean,
    default: false,
  },
  hasUserReacted: {
    type: Boolean,
    default: false,
  },
})

// The emitted events
const emits = defineEmits(['toggle-menu', 'action', 'remove-post'])
const handleUnbookmarkSuccess = (event) => {
  emits('remove-post', event)
}

const action = async (type) => {
  if (type === 'delete') {
    emits('action', { type, id: props.id })
  } else {
    emits('action', { type, id: props.id })
  }
}

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

const EditPost = (post) => {
  router.push({
    name: 'EditPost',
    params: {
      id: props.id,
      slug: props.post.slug,
    },
  })
}
</script>

<style scoped>
/* Styles remain the same */
</style>
