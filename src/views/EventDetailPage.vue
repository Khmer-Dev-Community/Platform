<template>
  <div class="event-detail-page dark:bg-gray-900 min-h-screen p-1 md:p-1">
    <div
      class="bg-blue-600 dark:bg-blue-800 text-white rounded-lg p-6 md:p-8 shadow-md mb-8 relative overflow-hidden"
    >
      <div class="absolute -bottom-10 -right-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
      <div class="absolute -top-5 left-10 w-16 h-16 bg-white opacity-10 rounded-full"></div>
      <h1 class="text-3xl md:text-4xl font-bold mb-2">Office Hours & Orientation</h1>
      <p class="text-lg">Free Weekly Sessions</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-4">
          <button
            @click="goBack"
            class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-xl"
          >
            <i class="fas fa-arrow-left"></i>
          </button>
          <div class="flex items-center">
            <div class="bg-orange-500 text-white p-2 rounded mr-2">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <span class="text-gray-800 dark:text-gray-100 font-semibold text-lg">Events</span>
          </div>
        </div>
        <button
          class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-lg"
        >
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>

      <div class="mb-6">
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-2">Wed, Jul 30, 12:00am</p>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Orientation + Office Hours
        </h2>
        <span
          class="inline-block bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-4"
        >
          Zoom
        </span>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Whether you're new to Xano & want to learn how to get started, or you need help with a
          specific issue with a project you're building in Xano, we've got you covered!
        </p>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">Join us on Tuesdays!</p>

        <div class="flex items-center space-x-3 mb-6">
          <img
            src="https://i.pravatar.cc/40?img=7"
            alt="Daniel Petro"
            class="w-8 h-8 rounded-full border-2 border-white"
          />
          <img
            src="https://i.pravatar.cc/40?img=8"
            alt="Kartik Grewal"
            class="w-8 h-8 rounded-full border-2 border-white -ml-3"
          />
          <img
            src="https://i.pravatar.cc/40?img=9"
            alt="Louis Machado"
            class="w-8 h-8 rounded-full border-2 border-white -ml-3"
          />
        </div>

        <button
          class="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          RSVP
        </button>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
        <div
          class="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm mb-4"
        >
          <span class="flex items-center">
            <i class="fas fa-reply mr-2"></i> {{ comments.length }}
            {{ comments.length === 1 ? 'reply' : 'replies' }}
          </span>
          <div class="flex space-x-4">
            <button class="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
              <i class="fas fa-thumbs-up mr-2"></i> Like
            </button>
            <button class="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
              <i class="fas fa-bookmark mr-2"></i> Follow
            </button>
            <button class="flex items-center hover:text-blue-600 dark:hover:text-blue-400">
              <i class="fas fa-share-alt mr-2"></i> Share
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <div class="flex items-start mb-3">
              <img
                :src="comment.authorAvatar"
                :alt="comment.authorName + ' Avatar'"
                class="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-gray-800 dark:text-gray-100">{{
                    comment.authorName
                  }}</span>
                  <button
                    class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-lg"
                  >
                    <i class="fas fa-ellipsis-h"></i>
                  </button>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{
                  comment.timePosted
                }}</span>
                <p class="text-gray-700 dark:text-gray-300 mt-1">{{ comment.text }}</p>
                <div
                  class="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2 space-x-3"
                >
                  <button @click="toggleLike(comment)" class="hover:underline flex items-center">
                    <i
                      :class="comment.likedByMe ? 'fas fa-heart text-red-500' : 'far fa-heart'"
                      class="mr-1"
                    ></i>
                    {{ comment.likes }} Like
                  </button>
                  <button @click="toggleReplyInput(comment.id)" class="hover:underline">
                    Reply
                  </button>
                </div>
              </div>
            </div>

            <div v-if="replyingTo === comment.id" class="flex items-center mt-4 ml-10">
              <img
                :src="currentUser.avatar"
                alt="Your Avatar"
                class="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div class="flex-1 relative">
                <input
                  type="text"
                  v-model="newReplyText"
                  @keyup.enter="postReply(comment.id)"
                  placeholder="Write a reply..."
                  class="w-full p-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  @click="postReply(comment.id)"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>

            <div v-if="comment.replies && comment.replies.length > 0" class="ml-10 mt-4 space-y-4">
              <div
                v-for="reply in comment.replies"
                :key="reply.id"
                class="flex items-start bg-gray-100 dark:bg-gray-750 rounded-lg p-3"
              >
                <img
                  :src="reply.authorAvatar"
                  :alt="reply.authorName + ' Avatar'"
                  class="w-7 h-7 rounded-full mr-3 object-cover"
                />
                <div class="flex-1">
                  <div class="flex justify-between items-center">
                    <span class="font-semibold text-gray-800 dark:text-gray-100 text-sm">{{
                      reply.authorName
                    }}</span>
                    <button
                      class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-sm"
                    >
                      <i class="fas fa-ellipsis-h"></i>
                    </button>
                  </div>
                  <span class="text-xs text-gray-500 dark:text-gray-400">{{
                    reply.timePosted
                  }}</span>
                  <p class="text-gray-700 dark:text-gray-300 text-sm mt-1">{{ reply.text }}</p>
                  <div
                    class="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2 space-x-3"
                  >
                    <button @click="toggleLike(reply)" class="hover:underline flex items-center">
                      <i
                        :class="reply.likedByMe ? 'fas fa-heart text-red-500' : 'far fa-heart'"
                        class="mr-1"
                      ></i>
                      {{ reply.likes }} Like
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-start mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
        >
          <img
            :src="currentUser.avatar"
            alt="Your Avatar"
            class="w-10 h-10 rounded-full mr-3 object-cover mt-1"
          />
          <div class="flex-1">
            <textarea
              v-model="newCommentText"
              @keyup.enter.exact="postComment"
              placeholder="What are your thoughts?"
              rows="3"
              class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            ></textarea>
            <div class="flex justify-between items-center">
              <div class="flex space-x-3 text-gray-500 dark:text-gray-300">
                <button class="hover:text-gray-700 dark:hover:text-gray-100">
                  <i class="fas fa-bold"></i>
                </button>
                <button class="hover:text-gray-700 dark:hover:text-gray-100">
                  <i class="fas fa-italic"></i>
                </button>
                <button class="hover:text-gray-700 dark:hover:text-gray-100">
                  <i class="fas fa-at"></i>
                </button>
                <button class="hover:text-gray-700 dark:hover:text-gray-100">
                  <i class="fas fa-code"></i>
                </button>
                <button class="hover:text-gray-700 dark:hover:text-gray-100">
                  <i class="fas fa-link"></i>
                </button>
              </div>
              <button
                @click="postComment"
                :disabled="!newCommentText.trim()"
                class="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
                :class="{ 'opacity-50 cursor-not-allowed': !newCommentText.trim() }"
              >
                <i class="fas fa-paper-plane mr-2"></i> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // To go back

const router = useRouter()

// Dummy current user for posting comments/replies
const currentUser = ref({
  id: 'user123',
  name: 'Current User',
  avatar: 'https://i.pravatar.cc/40?img=15', // Example avatar for the current user
})

// State for new comment/reply text
const newCommentText = ref('')
const newReplyText = ref('')
const replyingTo = ref(null) // Stores the ID of the comment being replied to

// Reactive array for comments
const comments = ref([
  {
    id: 'c1',
    authorName: 'Pichar 99',
    authorAvatar: 'https://i.pravatar.cc/40?img=10',
    timePosted: 'a few seconds ago',
    text: 'How is good ?',
    likes: 0,
    likedByMe: false,
    replies: [
      {
        id: 'r1-1',
        authorName: 'Alice Johnson',
        authorAvatar: 'https://i.pravatar.cc/40?img=13',
        timePosted: 'just now',
        text: "It's great! Very informative sessions.",
        likes: 1,
        likedByMe: false,
      },
    ],
  },
  {
    id: 'c2',
    authorName: 'Bob Williams',
    authorAvatar: 'https://i.pravatar.cc/40?img=14',
    timePosted: '2 hours ago',
    text: 'I found the last session incredibly helpful. Looking forward to this one!',
    likes: 5,
    likedByMe: true,
    replies: [],
  },
])

// --- Methods ---

const goBack = () => {
  router.back() // Navigates to the previous page in history
}

const postComment = () => {
  if (newCommentText.value.trim()) {
    const newComment = {
      id: 'c' + Date.now(), // Simple unique ID
      authorName: currentUser.value.name,
      authorAvatar: currentUser.value.avatar,
      timePosted: 'just now',
      text: newCommentText.value.trim(),
      likes: 0,
      likedByMe: false,
      replies: [],
    }
    comments.value.unshift(newComment) // Add to the beginning of the array
    newCommentText.value = '' // Clear input
  }
}

const toggleReplyInput = (commentId) => {
  replyingTo.value = replyingTo.value === commentId ? null : commentId
  newReplyText.value = '' // Clear reply input when toggling
}

const postReply = (parentCommentId) => {
  if (newReplyText.value.trim()) {
    const parentComment = comments.value.find((c) => c.id === parentCommentId)
    if (parentComment) {
      const newReply = {
        id: 'r' + Date.now(), // Simple unique ID for reply
        authorName: currentUser.value.name,
        authorAvatar: currentUser.value.avatar,
        timePosted: 'just now',
        text: newReplyText.value.trim(),
        likes: 0,
        likedByMe: false,
      }
      if (!parentComment.replies) {
        parentComment.replies = []
      }
      parentComment.replies.push(newReply) // Add reply
      newReplyText.value = '' // Clear input
      replyingTo.value = null // Hide reply input
    }
  }
}

const toggleLike = (item) => {
  if (item.likedByMe) {
    item.likes--
  } else {
    item.likes++
  }
  item.likedByMe = !item.likedByMe
}
</script>

<style scoped>
/* Add any specific styles if needed, though Tailwind classes should handle most */
/* Dark mode for the slightly darker background of nested replies */
.dark .bg-gray-750 {
  background-color: #3f4a5a; /* A shade between gray-700 and gray-800, adjust as needed */
}
</style>
