<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-2 p-1 px-2">
    <div
      class="mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-none overflow-hidden p-2 lg:p-6"
    >
      <button
        @click="$router.back()"
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 flex items-center space-x-2"
      >
        <i class="fas fa-arrow-left"></i>
        <span> Back </span>
      </button>

      <div v-if="post">
        <div
          class="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700 py-2 -mt-2"
        >
          <div class="flex items-center space-x-0">
            <img
              :src="post.author?.avatar_url"
              :alt="post.auth?.first_name + ' Avatar'"
              class="w-8 h-8 rounded-full object-cover"
            />
            <div class="text-sm">
              <router-link :to="`/@${post.author?.username}`" class="cursor-pointer bg-transparent">
                <span class="font-semibold text-gray-800 dark:text-gray-100 text-base ml-2">{{
                  post.author?.first_name
                }}</span></router-link
              ><br />
              <router-link
                :to="`/@${post.author?.username}`"
                class="cursor-pointer bg-transparent text-sm ml-2"
              >
                @{{ post.author?.username }}
              </router-link>

              <span class="text-gray-500 dark:text-gray-400">
                • {{ proxy.$timeAgo(post.created_at) }}</span
              >
            </div>
          </div>
          <button
            v-if="!post.isFollowing"
            class="bg-blue-500 dark:bg-gray-600 px-3 py-1 rounded-full text-sm font-small"
            style="color: white"
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

        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">{{ post.title }}</h1>
        <div
          v-if="post.description"
          class="text-gray-700 dark:text-gray-400 text-base mb-4 leading-relaxed"
        >
          <v-md-editor-viewer :text="post.description"></v-md-editor-viewer>
        </div>
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
            <span>{{ post?.view_count }} Views</span>
          </span>
          <span class="flex items-center space-x-1">
            <i class="fas fa-arrow-up"></i>
            <span>{{ post?.likes }} Upvotes</span>
          </span>
          <span class="flex items-center space-x-1">
            <i class="far fa-comment-alt"></i>
            <span>{{ formatCount(post.comments) }} Comments</span>
          </span>
        </div>

        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
            Leave a Comment
          </h2>
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
              class="bg-blue-500 dark:bg-gray-600 px-4 py-2 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              style="color: white"
            >
              Post Comment
            </button>
          </div>
        </div>

        <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
          Discussion ({{ formatCount(post?.discussion?.length) }})
        </h2>
        <div class="space-y-6">
          <CommentItem
            v-for="comment in post.discussion"
            :key="comment.id"
            :comment="comment"
            :level="1"
            :currentReplyingToId="currentReplyingToId"
            @start-reply="startReply"
            @add-reply="handleAddReply"
          />
        </div>
      </div>
      <div v-else class="text-center text-gray-500 dark:text-gray-400 mt-20">
        <i class="fas fa-spinner fa-spin text-4xl"></i>
        <p class="mt-4">Loading post...</p>
      </div>
    </div>
  </div>
</template>

<style>
.github-markdown-body {
  padding: 4px !important;
}
</style>

<script setup>
import { ref, onMounted, computed, getCurrentInstance, h } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { PostService } from '@/services/post.service'
import CommentItem from '@/components/CommentItem.vue'
import VMdEditorViewer from '@kangc/v-md-editor/lib/preview'
import { useSelectedPostStore } from '@/stores/emit/post.emit'
import { CommentService } from '@/services/comment.service'

const instance = getCurrentInstance()
const proxy = instance?.proxy

const selectedPostStore = useSelectedPostStore()
const router = useRoute()
const route = useRouter()
const post = ref(null)
const newCommentText = ref('')
const currentReplyingToId = ref(null)

const formatCount = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num ? num.toString() : '0'
}

const addComment = async () => {
  try {
    if (proxy.$userData?.value?.id == undefined) {
      ElMessageBox({
        title: 'Message',
        message: h('p', null, [h('span', null, 'Please login before you leave comment')]),
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Cancel',
        customClass: 'dark my-custom-message-box',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            route.push('/login')
            done()
          } else {
            done()
          }
        },
      })
      return
    }
    if (newCommentText.value.trim() === '') return
    const newComment = {
      post_id: post.value.id,
      author_id: proxy.$userData.value.id,
      content: newCommentText.value.trim(),
      upvotes: 0,
      author: proxy.$userData.value,
    }
    const response = await CommentService().createPostComment(post.value.id, newComment)
    post.value.discussion.push(response.data.data)
    //post.value.discussion.unshift(newComment)
    post.value.discussion.sort((a, b) => b.id - a.id)
    console.log(post.value.discussion)
    newCommentText.value = ''
    post.value.comments++
  } catch (err) {
    console.error(err)
  }
}

const getFeedPostDetail = async () => {
  try {
    const slug = router.params.slug
    const response = await PostService().getPostContentBySlug(slug)
    if (response?.data.statusCode === 200) {
      post.value = response.data.data
    }
  } catch (err) {
    console.error(err)
  }
}
const getFeedPostDetailByID = async () => {
  try {
    const id = route.params.id
    const response = await PostService().getPostContentByID(id)
    if (response?.data.statusCode === 200) {
      post.value = response.data.data
    }
  } catch (err) {
    console.error(err)
  }
}

const startReply = (commentId) => {
  currentReplyingToId.value = commentId
}

const handleAddReply = async ({ parentId, replyContent }) => {
  console.log(replyContent)
  if (replyContent.trim() === '') return
  const newReply = {
    post_id: post.value.id,
    author_id: proxy.$userData.value.id,
    content: replyContent.trim(),
    upvotes: 0,
    parent_comment_id: parentId,
    replies: [],
    avatar_url: proxy.$userData.value.avatar_url,
  }
  newReply.author = proxy.$userData.value

  const response = await CommentService().createPostComment(post.value.id, newReply)
  const newReplyToSend = response.data.data
  //newReplyToSend.auth
  const findAndAddReply = (comments, targetId, reply) => {
    for (const comment of comments) {
      if (comment.id === targetId) {
        comment.replies.push(newReplyToSend)
        comment.replies.sort((a, b) => b.id - a.id)
        console.log(newReplyToSend)
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
  currentReplyingToId.value = null
  post.value.comments++
}

// Check for data in the store on component mount
onMounted(() => {
  if (selectedPostStore.selectedPost) {
    post.value = selectedPostStore.selectedPost
  } else {
    getFeedPostDetail()
  }
})
</script>
