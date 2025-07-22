<template>
  <div
    :class="{
      'chat-page': true,
      'flex flex-col md:flex-row bg-gray-100 dark:bg-gray-800 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow p-0 border border-gray-200 dark:border-gray-700':
        !isFullScreen,
      'fixed inset-0 z-50 flex flex-col md:flex-row bg-gray-100 dark:bg-gray-800': isFullScreen,
    }"
    :style="isFullScreen ? { width: '100vw', height: '100vh' } : { height: 'calc(100vh - 80px)' }"
  >
    <aside
      :class="{ hidden: isChatOpen && isMobile, flex: !isChatOpen || !isMobile }"
      class="w-full md:w-80 bg-white dark:bg-gray-700 p-4 border-r border border-gray-200 dark:border-gray-600 flex-shrink-0 flex flex-col"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">Chats</h2>
        <div class="flex items-center space-x-2">
          <button
            class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-lg"
          >
            <el-icon><More /></el-icon>
          </button>
          <button
            @click="startNewChat"
            class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-lg"
          >
            <el-icon><Plus /></el-icon>
          </button>
        </div>
      </div>

      <div class="flex border-b border-gray-200 dark:border-gray-600 mb-4">
        <button
          @click="activeChatTab = 'chats'"
          :class="[
            'px-4 py-2 text-sm font-medium transition-colors duration-200',
            {
              'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400':
                activeChatTab === 'chats',
              'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200':
                activeChatTab !== 'chats',
            },
          ]"
        >
          Chats
        </button>
        <button
          @click="activeChatTab = 'archived'"
          :class="[
            'px-4 py-2 text-sm font-medium transition-colors duration-200',
            {
              'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400':
                activeChatTab === 'archived',
              'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200':
                activeChatTab !== 'archived',
            },
          ]"
        >
          Archived Chats
        </button>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar">
        <div
          v-if="activeChatTab === 'chats' && !hasActiveChat"
          class="text-center py-8 text-gray-500 dark:text-gray-400"
        >
          <p class="font-semibold">No Chats</p>
          <p class="text-sm mt-2">
            You can start a chat by clicking on the new chat button and start a conversation.
          </p>
        </div>
        <div v-else-if="activeChatTab === 'chats'">
          <button
            v-for="chat in chatsData"
            :key="chat.id"
            @click="selectChat(chat)"
            :class="[
              'flex items-center w-full p-3 rounded-lg text-left mb-2 transition-colors duration-200',
              'hover:bg-gray-50 dark:hover:bg-gray-600',
              {
                'bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-white':
                  selectedChat && selectedChat.id === chat.id,
              },
            ]"
          >
            <img
              :src="chat.avatar"
              alt="User Avatar"
              class="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <div class="flex-1">
              <div class="font-semibold text-gray-800 dark:text-gray-100">{{ chat.name }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                {{ chat.lastMessage }}
              </div>
            </div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ chat.time }}</div>
          </button>
        </div>
        <div
          v-else-if="activeChatTab === 'archived' && archivedChats.length === 0"
          class="text-center py-8 text-gray-500 dark:text-gray-400"
        >
          <p class="font-semibold">No Archived Chats</p>
        </div>
        <div v-else-if="activeChatTab === 'archived'"></div>
      </div>
    </aside>

    <main
      :class="{ hidden: !isChatOpen && isMobile, flex: isChatOpen || !isMobile }"
      class="flex-1 flex flex-col bg-white dark:bg-gray-800"
    >
      <div
        class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600"
      >
        <div class="flex items-center">
          <button
            @click="closeChatOnMobile"
            v-if="isMobile"
            class="mr-3 text-gray-500 dark:text-gray-300"
          >
            <i class="fas fa-arrow-left"></i>
          </button>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {{ selectedChat ? selectedChat.name : 'New message' }}
          </h2>
        </div>
        <div class="flex items-center space-x-3">
          <button
            @click="toggleFullScreen"
            class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-lg"
          >
            <el-icon v-if="isFullScreen"><Rank /></el-icon>
            <el-icon v-else><FullScreen /></el-icon>

            <!-- <i :class="isFullScreen ? 'fas fa-compress-alt' : 'fas fa-expand-alt'"></i> -->
          </button>
          <button
            @click="closeNewMessage"
            class="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-lg"
          >
            <el-icon><Close /></el-icon>
          </button>
        </div>
      </div>

      <div v-if="!selectedChat" class="p-4 border-b border-gray-200 dark:border-gray-600">
        <div class="relative">
          <input
            type="text"
            placeholder="Search for members"
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <i
            class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          ></i>
          <button
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <i class="fas fa-exchange-alt rotate-90"></i>
          </button>
        </div>
      </div>

      <div
        ref="messagesContainer"
        v-if="selectedChat"
        class="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col"
      >
        <div
          v-for="(msg, index) in selectedChat.messages"
          :key="index"
          :class="{
            'flex justify-end': msg.sender === 'You',
            'flex justify-start': msg.sender !== 'You',
          }"
          class="mb-4"
        >
          <div
            :class="{
              'bg-purple-500 text-white rounded-bl-xl': msg.sender === 'You',
              'bg-gray-200 dark:bg-gray-600 dark:text-gray-100 rounded-br-xl': msg.sender !== 'You',
            }"
            class="max-w-[70%] p-3 rounded-t-xl text-sm shadow"
          >
            <div v-if="msg.sender !== 'You'" class="font-semibold text-xs mb-1">
              {{ msg.sender }}
            </div>

            <p v-if="msg.type === 'text'">{{ msg.text }}</p>
            <p v-else-if="msg.type === 'emoji'" class="text-2xl">{{ msg.emoji }}</p>
            <div
              v-else-if="msg.type === 'file'"
              class="flex items-center space-x-2 text-blue-600 dark:text-blue-300"
            >
              <i class="fas fa-file text-lg"></i>
              <a :href="msg.fileUrl" target="_blank" class="hover:underline">{{ msg.fileName }}</a>
            </div>

            <div class="text-right text-xs mt-1 opacity-75">{{ msg.time }}</div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 flex-col"
      >
        <i class="fas fa-user-friends text-5xl mb-4"></i>
        <p class="text-center">Search for someone and start chatting.</p>
      </div>

      <div
        class="p-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 relative"
      >
        <textarea
          v-model="newMessageText"
          @keydown.enter.exact.prevent="sendMessage('text')"
          placeholder="Type your message..."
          rows="3"
          class="w-full p-2 border border-gray-300 rounded-md resize-none dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          ref="messageInputRef"
        ></textarea>
        <div class="flex items-center justify-between mt-2">
          <div class="flex space-x-3 text-gray-500 dark:text-gray-300">
            <input type="file" ref="fileInput" @change="handleFileUpload" class="hidden" />
            <button @click="triggerFileInput" class="hover:text-gray-700 dark:hover:text-gray-100">
              <i class="fas fa-paperclip"></i>
            </button>
            <button @click="toggleEmojiPicker" class="hover:text-gray-700 dark:hover:text-gray-100">
              <i class="fas fa-smile"></i>
            </button>
          </div>
          <div class="text-right text-gray-500 dark:text-gray-400 text-xs">
            Press <span class="font-semibold text-gray-700 dark:text-gray-200">Enter</span> to send
          </div>
        </div>

        <div v-if="showEmojiPicker" class="absolute bottom-full mb-2 z-20">
          <EmojiPicker :native="true" @select="onEmojiSelect" theme="auto" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import EmojiPicker from 'vue3-emoji-picker'

// --- Responsive State ---
const isMobile = ref(window.innerWidth < 768)
const isChatOpen = ref(false) // Controls visibility of main chat window on mobile

const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) {
    isChatOpen.value = true // Always show chat on desktop
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  handleResize() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// --- Full Screen State ---
const isFullScreen = ref(false)

const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value
  // Manage body overflow to prevent scrollbars when full screen
  if (isFullScreen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = '' // Reset to default
  }
}

// --- Chat Data and Logic ---
const activeChatTab = ref('chats')
const selectedChat = ref(null)
const newMessageText = ref('')
const messagesContainer = ref(null) // Ref for the messages area div
const messageInputRef = ref(null) // Ref for the textarea to manage focus/cursor

// Dummy chat data for demonstration
const chatsData = ref([
  {
    id: 1,
    name: 'Alice Smith',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Hey, how are you doing?',
    time: '10:30 AM',
    messages: [
      { sender: 'Alice Smith', type: 'text', text: 'Hi there!', time: '10:28 AM' },
      {
        sender: 'You',
        type: 'text',
        text: 'Hey Alice! I am good, how about you?',
        time: '10:29 AM',
      },
      {
        sender: 'Alice Smith',
        type: 'text',
        text: 'Doing great, thanks for asking! 😊',
        time: '10:30 AM',
      },
    ],
  },
  {
    id: 2,
    name: 'Bob Johnson',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Can we meet tomorrow? 😄',
    time: 'Yesterday',
    messages: [
      {
        sender: 'You',
        type: 'text',
        text: 'Sure, what time works for you?',
        time: 'Yesterday 5:00 PM',
      },
      {
        sender: 'Bob Johnson',
        type: 'text',
        text: 'How about 10 AM? 😄',
        time: 'Yesterday 5:05 PM',
      },
      { sender: 'You', type: 'emoji', emoji: '👍', time: 'Yesterday 5:06 PM' }, // Example of an emoji message
    ],
  },
  {
    id: 3,
    name: 'Charlie Brown',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'Received your file.',
    time: '2 days ago',
    messages: [
      {
        sender: 'Charlie Brown',
        type: 'text',
        text: 'Just wanted to confirm receipt of the document.',
        time: '2 days ago',
      },
      {
        sender: 'You',
        type: 'file',
        fileName: 'document.pdf',
        fileUrl: '/path/to/document.pdf',
        time: '2 days ago',
      },
    ],
  },
])

const archivedChats = ref([])

const hasActiveChat = computed(() => chatsData.value.length > 0)

const selectChat = (chat) => {
  selectedChat.value = chat
  isChatOpen.value = true
  nextTick(() => {
    scrollToBottom()
    messageInputRef.value.focus() // Focus input when chat selected
  })
}

const startNewChat = () => {
  selectedChat.value = null
  isChatOpen.value = true
  nextTick(() => {
    messageInputRef.value.focus() // Focus input for new message
  })
}

const closeNewMessage = () => {
  selectedChat.value = null
  if (isMobile.value) {
    isChatOpen.value = false
  }
}

const closeChatOnMobile = () => {
  isChatOpen.value = false
  selectedChat.value = null
}

const sendMessage = (type = 'text', content = {}) => {
  if (type === 'text' && newMessageText.value.trim() === '') return
  if (type !== 'text' && !selectedChat.value) {
    alert('Please select a chat to send this type of content.')
    return
  }

  const messagePayload = {
    sender: 'You',
    type: type,
    time: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    ...content,
  }

  if (type === 'text') {
    messagePayload.text = newMessageText.value.trim()
  }

  if (selectedChat.value) {
    selectedChat.value.messages.push(messagePayload)
    if (type === 'text') {
      selectedChat.value.lastMessage = messagePayload.text
    } else if (type === 'emoji') {
      selectedChat.value.lastMessage = `[Emoji] ${messagePayload.emoji}`
    } else if (type === 'file') {
      selectedChat.value.lastMessage = `[File] ${messagePayload.fileName}`
    }
    selectedChat.value.time = messagePayload.time

    nextTick(() => {
      scrollToBottom()
    })
  } else {
    alert(
      `No recipient selected. Message: ${type === 'text' ? messagePayload.text : JSON.stringify(messagePayload)}`,
    )
  }

  if (type === 'text') {
    newMessageText.value = ''
  }
  showEmojiPicker.value = false // Close picker after sending a message
}

// --- Emoji Picker Logic ---
const showEmojiPicker = ref(false)

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
  // If showing, ensure textarea is focused after next render cycle
  if (showEmojiPicker.value) {
    nextTick(() => {
      messageInputRef.value.focus()
    })
  }
}

// Handle emoji selection from the picker
const onEmojiSelect = (emoji) => {
  if (emoji && emoji.i) {
    // emoji.i contains the actual emoji character
    const textarea = messageInputRef.value
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      // Insert emoji at cursor position
      newMessageText.value =
        newMessageText.value.substring(0, start) + emoji.i + newMessageText.value.substring(end)
      // Move cursor after the inserted emoji and keep focus
      nextTick(() => {
        textarea.selectionStart = textarea.selectionEnd = start + emoji.i.length
        textarea.focus() // Keep focus on the textarea
      })
    }
  }
}

// --- File Upload Logic ---
const fileInput = ref(null)

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const dummyFileUrl = URL.createObjectURL(file)

  sendMessage('file', { fileName: file.name, fileUrl: dummyFileUrl })

  event.target.value = '' // Clear the input so same file can be selected again
}

// --- Scroll to Bottom ---
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
/* Custom Scrollbar for better appearance on overflow-y-auto elements */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Dark mode scrollbar */
.dark .custom-scrollbar::-webkit-scrollbar-track {
  background: #333;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #555;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #777;
}

/* line-clamp utility (already defined or use plugin) */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Override vue3-emoji-picker styles if needed, or adjust z-index */
/* You might need to adjust the picker's position or width */
.v3-emoji-picker {
  max-width: 320px; /* Adjust as needed */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
/* For dark mode */
.dark .v3-emoji-picker {
  background-color: #374151; /* gray-700 */
}
</style>
