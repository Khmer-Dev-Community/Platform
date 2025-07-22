<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-1">
    <div class="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">Create New Post</h1>

      <form @submit.prevent="submitPost">
        <div class="mb-5">
          <label
            for="postTitle"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Post Title</label
          >
          <input
            type="text"
            id="postTitle"
            v-model="post.title"
            placeholder="A compelling title for your post..."
            class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        <div class="mb-5">
          <label
            for="postDescription"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Description</label
          >
          <textarea
            id="postDescription"
            v-model="post.description"
            placeholder="Share your thoughts, experiences, or insights here..."
            rows="6"
            class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          ></textarea>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Image (Optional)</label
          >
          <div
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
            @click="triggerFileInput"
            :class="{ 'border-purple-500 bg-purple-50': isDragging }"
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-purple-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="space-y-1 text-center">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="flex text-sm text-gray-600 dark:text-gray-400">
                <p>Drag and drop or</p>
                <span class="ml-1 font-medium text-purple-600 hover:text-purple-500">
                  upload a file
                </span>
                <input
                  ref="fileInput"
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="onFileChange"
                  accept="image/*"
                />
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <div v-if="post.imagePreview" class="mt-4 flex items-center space-x-4">
            <img
              :src="post.imagePreview"
              alt="Image preview"
              class="w-32 h-32 object-cover rounded-md shadow-sm"
            />
            <button
              @click="removeImage"
              type="button"
              class="text-red-500 hover:text-red-700 text-sm font-semibold"
            >
              Remove Image
            </button>
          </div>
        </div>

        <div class="mb-5">
          <label
            for="postLink"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >External Link (Optional)</label
          >
          <input
            type="url"
            id="postLink"
            v-model="post.link"
            placeholder="e.g., https://yourarticle.com"
            class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
        </div>

        <div class="mb-6">
          <label
            for="postTags"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Tags (comma-separated)</label
          >
          <input
            type="text"
            id="postTags"
            v-model="tagInput"
            @keydown.enter.prevent="addTag"
            @blur="addTag"
            placeholder="Add tags like: programming, frontend, design"
            class="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in post.tags"
              :key="index"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-2 -mr-0.5 h-4 w-4 rounded-full flex items-center justify-center text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M1 1l6 6m0-6L1 6"
                  />
                </svg>
              </button>
            </span>
            <span
              v-if="post.tags.length === 0 && tagInput.length === 0"
              class="text-gray-500 dark:text-gray-400 text-sm"
              >No tags added yet.</span
            >
          </div>
        </div>

        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="cancelPost"
            class="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // For navigation after post

const router = useRouter()

// Reactive state for the new post data
const post = ref({
  title: '',
  description: '',
  imageFile: null, // Stores the actual File object
  imagePreview: null, // Stores the URL for image preview
  link: '',
  tags: [],
})

const tagInput = ref('') // For handling the tag input field
const isDragging = ref(false) // For drag-and-drop visual feedback
const fileInput = ref(null) // Reference to the hidden file input

// --- Image Upload Handlers ---
const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileChange = (event) => {
  const file = event.target.files[0]
  handleFile(file)
}

const onDragOver = () => {
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (event) => {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  handleFile(file)
}

const handleFile = (file) => {
  if (file && file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
    // Max 10MB
    post.value.imageFile = file
    const reader = new FileReader()
    reader.onload = (e) => {
      post.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    alert('Please upload a valid image (PNG, JPG, GIF) under 10MB.')
    post.value.imageFile = null
    post.value.imagePreview = null
  }
}

const removeImage = () => {
  post.value.imageFile = null
  post.value.imagePreview = null
  if (fileInput.value) {
    // Reset file input to allow re-uploading same file
    fileInput.value.value = ''
  }
}

// --- Tag Handlers ---
const addTag = () => {
  const tagsToAdd = tagInput.value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '')
  tagsToAdd.forEach((newTag) => {
    if (!post.value.tags.includes(newTag)) {
      post.value.tags.push(newTag)
    }
  })
  tagInput.value = '' // Clear input after adding
}

const removeTag = (index) => {
  post.value.tags.splice(index, 1)
}

const submitPost = () => {
  console.log('New Post Data:', {
    title: post.value.title,
    description: post.value.description,
    imageFileName: post.value.imageFile ? post.value.imageFile.name : 'No image',
    link: post.value.link,
    tags: post.value.tags,
  })

  alert('Post submitted! (Check console for data)')
  // Optionally, redirect to the home page or the new post's detail page
  router.push('/') // Assuming '/' is your main feed
}

const cancelPost = () => {
  // Confirm with user if they have unsaved changes
  if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
    router.back() // Go back to the previous page
  }
}
</script>

<style scoped></style>
