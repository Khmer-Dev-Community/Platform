<template>
  <div class="showcase-page bg-gray-100 dark:bg-gray-900 min-h-screen p-6 md:p-10">
    <div
      class="bg-blue-600 dark:bg-blue-800 text-white rounded-lg p-6 md:p-8 shadow-md mb-8 relative overflow-hidden"
    >
      <div
        class="absolute top-0 right-0 w-24 h-24 bg-blue-700 dark:bg-blue-900 rounded-bl-full opacity-30"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 dark:bg-purple-700 rounded-tr-full opacity-20"
      ></div>

      <div class="flex items-center mb-4">
        <img
          src="https://picsum.photos/id/90/60/60"
          alt="Showcase Icon"
          class="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <h1 class="text-3xl md:text-4xl font-bold">Community Showcase</h1>
      </div>
      <p class="text-lg mb-6 max-w-2xl">
        Explore innovative projects and applications built by the community using Xano, and share
        your own creations!
      </p>
      <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          class="bg-white text-blue-600 dark:text-blue-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
        >
          Add Project
        </button>
        <button
          class="bg-transparent border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 dark:hover:text-blue-800 transition-colors duration-200 flex items-center justify-center"
        >
          <i class="fas fa-check-circle mr-2"></i> Following
        </button>
        <button
          class="bg-transparent border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 dark:hover:text-blue-800 transition-colors duration-200 flex items-center justify-center"
        >
          <i class="fas fa-bell mr-2"></i> Subscribe
        </button>
        <button
          class="bg-transparent border border-white text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-600 dark:hover:text-blue-800 transition-colors duration-200"
        >
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>
      <div class="mt-6 flex items-center space-x-2">
        <img
          src="https://i.pravatar.cc/40?img=10"
          alt="Avatar"
          class="w-8 h-8 rounded-full border-2 border-white"
        />
        <img
          src="https://i.pravatar.cc/40?img=11"
          alt="Avatar"
          class="w-8 h-8 rounded-full border-2 border-white -ml-3"
        />
        <img
          src="https://i.pravatar.cc/40?img=12"
          alt="Avatar"
          class="w-8 h-8 rounded-full border-2 border-white -ml-3"
        />
        <span class="text-white text-sm">5.2K+ members showcasing projects</span>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-8">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
      >
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center">
            <img
              :src="project.authorAvatar"
              :alt="project.authorName + ' Avatar'"
              class="w-8 h-8 rounded-full mr-3 object-cover"
            />
            <div>
              <div class="font-semibold text-gray-800 dark:text-gray-100">
                {{ project.authorName }}
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ project.timePosted }}</div>
            </div>
          </div>
          <button
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <i class="fas fa-ellipsis-h"></i>
          </button>
        </div>

        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ project.title }}</h3>
        <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {{ project.description }}
          <a
            v-if="project.learnMoreLink"
            :href="project.learnMoreLink"
            class="text-blue-600 dark:text-blue-400 hover:underline"
            >Learn more.</a
          >
        </p>

        <div
          v-if="project.images && project.images.length > 0"
          :class="{
            'grid gap-4 mb-4': true,
            'grid-cols-1 md:grid-cols-2': project.images.length > 1,
          }"
        >
          <img
            v-for="(image, idx) in project.images"
            :key="idx"
            :src="image"
            alt="Project Screenshot"
            class="rounded-lg object-cover w-full h-auto"
          />
        </div>

        <button
          v-if="project.seeMore"
          class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold mb-4"
        >
          See more
        </button>

        <div class="flex flex-wrap gap-2 mb-4">
          <span
            v-for="(tag, idx) in project.tags"
            :key="idx"
            class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
            >{{ tag }}</span
          >
        </div>

        <div
          class="flex items-center justify-between border-t border-b dark:border-gray-700 py-3 mb-4"
        >
          <div class="flex space-x-4">
            <button
              class="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <i class="fas fa-thumbs-up mr-2"></i> {{ project.likes }} Likes
            </button>
            <button
              class="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <i class="fas fa-comment mr-2"></i> {{ project.comments.length }} Comments
            </button>
            <button
              class="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <i class="fas fa-share-alt mr-2"></i> Share
            </button>
          </div>
        </div>

        <div class="flex items-start mb-4">
          <img
            :src="currentUser.avatar"
            alt="User Avatar"
            class="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <input
            type="text"
            v-model="newCommentTexts[project.id]"
            @keyup.enter="postComment(project)"
            placeholder="What are your thoughts?"
            class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="postComment(project)"
            :disabled="!newCommentTexts[project.id] || !newCommentTexts[project.id].trim()"
            class="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
            :class="{
              'opacity-50 cursor-not-allowed':
                !newCommentTexts[project.id] || !newCommentTexts[project.id].trim(),
            }"
          >
            Send
          </button>
        </div>

        <div v-if="project.comments && project.comments.length > 0">
          <div v-for="comment in project.comments" :key="comment.id" class="flex items-start mt-4">
            <img
              :src="comment.authorAvatar"
              :alt="comment.authorName + ' Avatar'"
              class="w-8 h-8 rounded-full mr-3 object-cover"
            />
            <div class="flex-1">
              <div class="font-semibold text-gray-800 dark:text-gray-100">
                {{ comment.authorName }}
                <span
                  v-if="comment.authorRole"
                  class="text-blue-600 dark:text-blue-400 ml-1 text-sm"
                  >{{ comment.authorRole }}</span
                >
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {{ comment.timePosted }}
              </div>
              <p class="text-gray-700 dark:text-gray-300">{{ comment.text }}</p>

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
                <button @click="toggleReplyInput(project.id, comment.id)" class="hover:underline">
                  Reply
                </button>
              </div>

              <div
                v-if="replyingTo.projectId === project.id && replyingTo.commentId === comment.id"
                class="flex items-center mt-4 -ml-2"
              >
                <img
                  :src="currentUser.avatar"
                  alt="Your Avatar"
                  class="w-7 h-7 rounded-full mr-3 object-cover"
                />
                <div class="flex-1 relative">
                  <input
                    type="text"
                    v-model="newReplyText"
                    @keyup.enter="postReply(project.id, comment.id)"
                    placeholder="Write a reply..."
                    class="w-full p-2 pr-12 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    @click="postReply(project.id, comment.id)"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
                  >
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>

              <div
                v-if="comment.replies && comment.replies.length > 0"
                class="ml-10 mt-4 space-y-4"
              >
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
            <button
              class="ml-auto text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hidden"
            >
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Dummy current user for posting comments/replies
const currentUser = ref({
  id: 'user123',
  name: 'Current User',
  avatar: 'https://i.pravatar.cc/40?img=50', // Example avatar for the current user
})

// State for new comment/reply text
const newCommentTexts = ref({}) // Use an object to store comment text per project ID
const newReplyText = ref('')
const replyingTo = ref({ projectId: null, commentId: null }) // Stores the ID of the comment being replied to

const projects = ref([
  {
    id: 1,
    authorName: 'DocuGenerate Team',
    authorAvatar: 'https://i.pravatar.cc/40?img=4',
    timePosted: '5 days ago',
    title: 'Automate PDF Creation in Your Xano Backend with DocuGenerate',
    description:
      "Hey Xano community! Are you tired of manually creating documents or struggling with complex PDF generation? We're excited to share the DocuGenerate snippet that’s now available in the Xano marketplace - it’s a game-changer for document automation! DocuGenerate lets you transform Word templates into dynamic documents with just a few clicks. Think invoices, contracts, reports, certificates - all generated automatically from your Xano data.",
    learnMoreLink: '#',
    images: [
      'https://picsum.photos/id/237/600/400', // Placeholder image
      'https://picsum.photos/id/238/600/400',
    ],
    seeMore: true,
    tags: ['api', 'automation', 'create pdf', 'docx to pdf'],
    likes: 125,
    comments: [
      {
        id: 'c1-1',
        authorName: 'Daniel Petro',
        authorAvatar: 'https://i.pravatar.cc/40?img=6',
        authorRole: 'Xano Team',
        timePosted: 'a month ago',
        text: 'This is a fantastic integration! Super useful for client reports.',
        likes: 10,
        likedByMe: false,
        replies: [
          {
            id: 'r1-1-1',
            authorName: 'Sarah Jenkins',
            authorAvatar: 'https://i.pravatar.cc/40?img=15',
            timePosted: '3 weeks ago',
            text: "I've been looking for something like this for ages! Great work.",
            likes: 3,
            likedByMe: false,
          },
        ],
      },
      {
        id: 'c1-2',
        authorName: 'Community User',
        authorAvatar: 'https://i.pravatar.cc/40?img=16',
        timePosted: '2 days ago',
        text: 'Does this work with custom fonts?',
        likes: 2,
        likedByMe: true,
        replies: [],
      },
    ],
    shares: 20,
  },
  {
    id: 2,
    authorName: 'AppBuilder Pro',
    authorAvatar: 'https://i.pravatar.cc/40?img=7',
    timePosted: '1 week ago',
    title: 'Build a Real-time Chat App with Xano and Vue 3',
    description:
      "Learn how to leverage Xano's powerful backend and real-time capabilities to create a fully functional chat application from scratch. This tutorial covers database setup, API endpoints, and frontend integration with Vue 3 and WebSockets.",
    learnMoreLink: '#',
    images: [
      'https://picsum.photos/id/239/600/400', // Placeholder image
    ],
    seeMore: false,
    tags: ['realtime', 'chat app', 'websockets', 'vue.js', 'backend'],
    likes: 340,
    comments: [
      {
        id: 'c2-1',
        authorName: 'Michael Brown',
        authorAvatar: 'https://i.pravatar.cc/40?img=17',
        timePosted: '5 days ago',
        text: 'The WebSocket setup was surprisingly easy with Xano. Thanks for the detailed guide!',
        likes: 8,
        likedByMe: false,
        replies: [],
      },
    ],
    shares: 55,
  },
  {
    id: 3,
    authorName: 'DataViz Wiz',
    authorAvatar: 'https://i.pravatar.cc/40?img=8',
    timePosted: '2 days ago',
    title: 'Interactive Dashboard with Xano & D3.js',
    description:
      'Transform your Xano data into stunning, interactive visualizations using D3.js. This project demonstrates how to fetch complex datasets from Xano APIs and render them into dynamic charts and graphs for powerful insights.',
    learnMoreLink: '#',
    images: ['https://picsum.photos/id/240/600/400'],
    seeMore: true,
    tags: ['data visualization', 'dashboard', 'd3.js', 'analytics'],
    likes: 180,
    comments: [], // No comments for this one initially
    shares: 15,
  },
  {
    id: 4,
    authorName: 'AI Innovator',
    authorAvatar: 'https://i.pravatar.cc/40?img=9',
    timePosted: '3 hours ago',
    title: 'Integrating OpenAI GPT with Xano for Content Generation',
    description:
      "Discover how to build an AI-powered content generation tool by connecting OpenAI's GPT models with your Xano backend. Generate articles, summaries, and creative text based on user inputs stored and managed by Xano.",
    learnMoreLink: '#',
    images: [
      'https://picsum.photos/id/241/600/400',
      'https://picsum.photos/id/242/600/400',
      'https://picsum.photos/id/243/600/400',
    ],
    seeMore: false,
    tags: ['ai', 'openai', 'gpt', 'content generation', 'machine learning'],
    likes: 450,
    comments: [
      {
        id: 'c4-1',
        authorName: 'Emily White',
        authorAvatar: 'https://i.pravatar.cc/40?img=18',
        timePosted: '1 hour ago',
        text: "This is mind-blowing! I'm definitely going to try this for my blog.",
        likes: 15,
        likedByMe: false,
        replies: [
          {
            id: 'r4-1-1',
            authorName: 'ChatGPT Fan',
            authorAvatar: 'https://i.pravatar.cc/40?img=19',
            timePosted: '30 minutes ago',
            text: 'The possibilities are endless with this setup!',
            likes: 7,
            likedByMe: true,
          },
        ],
      },
    ],
    shares: 90,
  },
])

// --- Methods ---

const postComment = (project) => {
  const commentText = newCommentTexts.value[project.id]
  if (commentText && commentText.trim()) {
    const newComment = {
      id: `c${project.id}-${Date.now()}`, // Unique ID for comment within project
      authorName: currentUser.value.name,
      authorAvatar: currentUser.value.avatar,
      timePosted: 'just now',
      text: commentText.trim(),
      likes: 0,
      likedByMe: false,
      replies: [],
    }
    if (!project.comments) {
      project.comments = []
    }
    project.comments.unshift(newComment) // Add to the beginning of the array
    newCommentTexts.value[project.id] = '' // Clear input for this project
  }
}

const toggleReplyInput = (projectId, commentId) => {
  if (replyingTo.value.projectId === projectId && replyingTo.value.commentId === commentId) {
    replyingTo.value = { projectId: null, commentId: null } // Hide if already open for this comment
  } else {
    replyingTo.value = { projectId, commentId } // Show for this comment
    newReplyText.value = '' // Clear reply input when toggling
  }
}

const postReply = (projectId, parentCommentId) => {
  if (newReplyText.value.trim()) {
    const project = projects.value.find((p) => p.id === projectId)
    const parentComment = project?.comments.find((c) => c.id === parentCommentId)

    if (parentComment) {
      const newReply = {
        id: `r${projectId}-${parentCommentId}-${Date.now()}`, // Unique ID for reply
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
      replyingTo.value = { projectId: null, commentId: null } // Hide reply input
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
