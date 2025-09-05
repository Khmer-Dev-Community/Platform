<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-2 p-1 px-2">
    <div class="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-2 lg:p-6">
      <button
        @click="$router.back()"
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 flex items-center space-x-2"
      >
        <i class="fas fa-arrow-left"></i>
        <span>Back to Feed</span>
      </button>

      <div v-if="post">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-0">
            <img
              :src="post.author?.avatar_url"
              :alt="post.auth?.first_name + ' Avatar'"
              class="w-8 h-8 rounded-full object-cover"
            />
            <div class="text-sm">
              <span class="font-semibold text-gray-800 dark:text-gray-100">{{
                post.author?.first_name
              }}</span
              ><br />
              @{{ post.author?.username }}
              <span class="text-gray-500 dark:text-gray-400">
                • {{ timeAgo(post.created_at) }}</span
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

        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">{{ post.Title }}</h1>
        <div
          v-if="post.description"
          class="text-gray-700 dark:text-gray-300 text-base mb-4 leading-relaxed"
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
              class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

<style >
.github-markdown-body{
  padding:4px!important
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { PostService } from '@/services/post.service';
import CommentItem from '@/components/CommentItem.vue';
import VMdEditorViewer from '@kangc/v-md-editor/lib/preview';
import { useSelectedPostStore } from '@/stores/emit/post.emit';

const selectedPostStore = useSelectedPostStore();
const route = useRoute();
const post = ref(null);
const newCommentText = ref('');
const currentReplyingToId = ref(null);

const formatCount = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num ? num.toString() : '0';
};

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + ' years ago';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days ago';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago';
  }
  return 'just now';
};

const addComment = () => {
  if (newCommentText.value.trim() === '') return;
  const newComment = {
    id: 'comment-' + Date.now(),
    avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
    username: 'Current_User',
    timeAgo: 'Just now',
    content: newCommentText.value.trim(),
    upvotes: 0,
    replies: [],
  };
  post.value.discussion.unshift(newComment);
  newCommentText.value = '';
  post.value.comments++;
};
const getFeedPostDetail = async () => {
  try {
    const username = route.params.username;
    const slug = route.params.slug;
    const response = await PostService().getPostContentBySlug(slug); 
    if (response?.data.statusCode === 200) {
      post.value = response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};
const getFeedPostDetailByID = async () => {
  try {
    const id = route.params.id;
    const response = await PostService().getPostContentByID(id);
    if (response?.data.statusCode === 200) {
      post.value = response.data.data;
    }
  } catch (err) {
    console.error(err);
  }
};

const startReply = (commentId) => {
  currentReplyingToId.value = commentId;
};

const handleAddReply = ({ parentId, replyContent }) => {
  if (replyContent.trim() === '') return;
  const newReply = {
    id: 'reply-' + Date.now(),
    avatar: 'https://randomuser.me/api/portraits/men/99.jpg',
    username: 'Current_User',
    timeAgo: 'Just now',
    content: replyContent.trim(),
    upvotes: 0,
    replies: [],
  };

  const findAndAddReply = (comments, targetId, reply) => {
    for (const comment of comments) {
      if (comment.id === targetId) {
        comment.replies.push(newReply);
        return true;
      }
      if (comment.replies && comment.replies.length > 0) {
        if (findAndAddReply(comment.replies, targetId, reply)) {
          return true;
        }
      }
    }
    return false;
  };
  findAndAddReply(post.value.discussion, parentId, newReply);
  currentReplyingToId.value = null;
  post.value.comments++;
};

// Check for data in the store on component mount
onMounted(() => {
  if (selectedPostStore.selectedPost) {
    post.value = selectedPostStore.selectedPost;
  } else {
    getFeedPostDetail();
  }
});
</script>