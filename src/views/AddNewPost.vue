<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-1 mb-20 mt-4">
    <div class="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h1 class="text-base lg:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
        Create New Post
      </h1>

      <el-form ref="DialogFormRef" :model="post">
        <div class="mb-2">
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
            class="w-full p-3 h-[40px] text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:text-white bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            required
          />
        </div>

        <div class="mb-5">
          <label
            for="postDescription"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Description</label
          >
          <v-md-editor
            ref="myVMdEditor"
            mode="edit"
            v-model="post.description"
            height="400px"
            left-toolbar=" h bold italic strikethrough quote customImageUploadButton code "
            right-toolbar="preview fullscreen "
            :toolbar="customToolbarConfig"
            placeholder="Your content ..."
            class="rounded-lg overflow-hidden border dark:bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            @upload-image="handleVMdEditorUploadImage"
          >
          </v-md-editor>
          <input
            ref="editorFileInput"
            type="file"
            accept="image/*"
            @change="onEditorFileChange"
            style="display: none"
          />
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >Featured Image (Optional)</label
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
            class="w-full p-3 h-[40px] text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
            class="w-full p-3 h-[40px] rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
            type="button"
            @click="submitPost"
            class="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
          >
            Post
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import axios from 'axios'
import { PostService } from '@/services/post.service'
import { ElMessage } from 'element-plus'
const router = useRouter()
const themeStore = useThemeStore()
const DialogFormRef = ref()
const post = ref({
  title: '',
  description: '',
  imageFile: null,
  imagePreview: null,
  link: '',
  tags: [],
})

const tagInput = ref('')
const isDragging = ref(false)
const fileInput = ref(null)
const { proxy } = getCurrentInstance()
const editorFileInput = ref(null)
const myVMdEditor = ref(null)

const customToolbarConfig = {
  customImageUploadButton: {
    title: 'Upload Image',
    icon: 'v-md-icon-img',
    action(editor) {
      console.log('Toolbar config action triggered.')
      triggerEditorImageUpload()
    },
  },
}

const handleVMdEditorUploadImage = async (event, insertImageCallback, files) => {
  console.log('--- VMdEditor Image Upload Triggered ---')

  const file = files[0]
  if (!file) {
    console.warn('VMdEditor: No file selected or received.')
    return
  }
  const formData = new FormData()
  formData.append('image', file)

  try {
    const uploadUrl = 'YOUR_IMAGE_UPLOAD_API_ENDPOINT' // <<< IMPORTANT: Replace this with your actual backend image upload URL
    const response = await axios.post(uploadUrl, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (response.data && response.data.url) {
      const imageUrl = response.data.url
      const imageAlt = file.name
      insertImageCallback({ url: imageUrl, desc: imageAlt })
      console.log('--- VMdEditor Image Upload SUCCESS & Inserted ---')
    } else {
      console.error('VMdEditor: Image upload failed: Backend did not return a valid URL.')
      alert(
        'Image upload failed: Server did not provide an image URL. Please check console for details.',
      )
    }
  } catch (error) {
    console.error('--- VMdEditor Image Upload ERROR ---', error)
    alert(`Image upload failed! Check console for details.`)
  }
}
const triggerEditorImageUpload = () => {
  console.log('Custom image upload button (from action) clicked!')
  if (editorFileInput.value) {
    console.log('Triggering hidden file input click.')
    editorFileInput.value.click()
  } else {
    console.error('editorFileInput ref is null.')
  }
}

const onEditorFileChange = (event) => {
  console.log("Hidden file input 'change' event triggered!")
  const files = event.target.files
  if (files.length > 0) {
    if (myVMdEditor.value && typeof myVMdEditor.value?.insertImage === 'function') {
      handleVMdEditorUploadImage(null, myVMdEditor.value.insertImage, [files[0]])
    } else {
      console.error('VMdEditor instance or its insertImage method is not available.')
      alert('Editor is not ready to insert images. Please try again or refresh.')
    }
    event.target.value = ''
  } else {
    console.log('No file selected by user in the dialog.')
  }
}

// --- Existing Logic for the Post's Featured Image (Drag & Drop / File Input) ---
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
    fileInput.value.value = ''
  }
}

// --- Existing Logic for Tags ---
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
  tagInput.value = ''
}
const removeTag = (index) => {
  post.value.tags.splice(index, 1)
}

// --- Post Submission and Cancel ---
const submitPost = async () => {
  DialogFormRef.value?.validate(async (valid) => {
    if (!valid) return
    try {
      const apiMethod = PostService().createPostContent
      console.log(post.value)
      const response = await apiMethod(post.value)
      console.log(response.data.statusCode)
      if (response?.data?.statusCode === 200) {
        ElMessage.success('Success')
      } else {
        ElMessage.error(response?.data?.message || 'An unexpected error occurred.')
      }
    } catch (error) {
      console.error(error)
      ElMessage.error(proxy?.$t('alerts.failure') || 'An unexpected error occurred')
    }
  })
}

const cancelPost = () => {
  if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
    router.back()
  }
}
</script>

<style>
/* Existing V-MD-Editor dark mode styles and general styles */
.dark .v-md-editor {
  background-color: #374151;
  border-color: #4b5563;
  color: #d1d5db;
}
.dark .v-md-editor .v-md-editor__toolbar {
  background-color: #1f2937;
  border-bottom-color: #4b5563;
}
.dark .v-md-editor .v-md-editor__editor {
  background-color: #1f2937;
  color: #d1d5db !important;
}
.dark .v-md-editor .v-md-editor__editor-wrapper .CodeMirror {
  background-color: #1f2937;
  color: #d1d5db !important;
}
.dark .v-md-editor .v-md-editor__editor-wrapper .CodeMirror-scroll .CodeMirror-lines {
  color: #d1d5db !important;
}
.dark .v-md-editor .v-md-editor__editor-wrapper .CodeMirror .CodeMirror-placeholder {
  color: #9ca3af !important;
}
.v-md-textarea-editor pre,
.v-md-textarea-editor textarea {
  color: #45474b;
}
.dark .v-md-textarea-editor pre,
.dark .v-md-textarea-editor textarea {
  color: #ffffff !important;
  padding: 5px;
}
.dark .v-md-editor .v-md-editor__toolbar-item {
  color: #d1d5db;
  padding: 5px;
}
.v-md-editor__preview {
  display: none !important;
}
</style>
