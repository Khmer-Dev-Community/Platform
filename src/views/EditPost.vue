<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-1 mb-20 mt-4">
    <div class="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow- p-4 min-h-[600px]">
      <button
        @click="$router.back()"
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 flex items-center space-x-2"
      >
        <i class="fas fa-arrow-left"></i>
        <span> Edit Post </span>
      </button>

      <el-form v-if="OwnerPost" ref="DialogFormRef" :model="post">
        <!-- Title -->
        <div class="mb-2">
          <label
            for="postTitle"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Post Title
          </label>
          <el-input
            type="text"
            id="postTitle"
            v-model="post.title"
            placeholder="A compelling title for your post..."
            class="w-full h-[40px] text-base rounded-lg dark:border-gray-600 dark:text-white bg-gray-50 dark:bg-gray-700 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            required
            maxlength="200"
            show-word-limit
          />
        </div>
        <!-- Slug-->
        <div class="mb-2">
          <label
            for="postTitle"
            class="block text-sm font-large text-gray-700 dark:text-gray-300 mb-2"
          >
            Slug (Optional)
          </label>
          <el-input
            type="text"
            id="postTitle"
            v-model="post.slug"
            placeholder="e.g., my-content-title "
            class="w-full h-[40px] text-lg rounded-lg dark:border-gray-600 dark:text-white bg-gray-50 dark:bg-gray-700 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            maxlength="200"
            show-word-limit
          />
        </div>

        <!-- Description (Markdown Editor) -->
        <div class="mb-5">
          <label
            for="postDescription"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Body
          </label>
          <v-md-editor
            ref="myVMdEditor"
            mode="edit"
            v-model="post.description"
            height="400px"
            left-toolbar="h bold italic strikethrough tip emoji ul ol customImageUploadButton  code "
            right-toolbar="preview fullscreen "
            :toolbar="customToolbarConfig"
            placeholder="Your content ..."
            class="rounded-lg overflow-hidden border dark:bg-gray-700 border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors mt-64"
            @upload-image="handleVMdEditorUploadImage"
          >
            <template v-slot:customImageUploadButton>
              <el-button @click="showFileManager = true" title="File Manager">
                <el-icon><i-ep-folder-opened /></el-icon>
              </el-button>
            </template>
          </v-md-editor>
          <ColorPicker v-model="showColorPicker" @select-color="insertSelectedColor" />
          <FileManagerDialog v-model="showFileManager" @select-image="insertSelectedImage" />
        </div>

        <!-- Featured Image Upload -->
        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Featured Image (Optional)
          </label>
          <el-upload
            v-model:file-list="fileList"
            :class="{ 'hide-upload-card': fileList.length >= 1 }"
            :action="uploadURL"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible" title="Image Preview">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </div>
        <!-- Slug-->
        <div class="mb-2">
          <label
            for="postTitle"
            class="block text-sm font-large text-gray-700 dark:text-gray-300 mb-2"
          >
            Meta Decription
          </label>
          <el-input
            type="textarea"
            id="postTitle"
            v-model="post.meta"
            placeholder="e.g., my-content-title "
            class="w-full text-lg rounded-lg dark:border-gray-600 dark:text-white bg-gray-50 dark:bg-gray-700 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            maxlength="300"
            :autosize="{ minRows: 3, maxRows: 5 }"
            show-word-limit
          />
        </div>
        <!-- External Link -->
        <div class="mb-5">
          <label
            for="postLink"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            External Link (Optional)
          </label>
          <el-input
            type="text"
            id="postLink"
            v-model="post.link"
            placeholder="e.g., https://yourarticle.com"
            class="w-full h-[40px] text-sm border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            maxlength="80"
            show-word-limit
          />
        </div>

        <!-- Tags -->
        <div class="mb-6">
          <label
            for="postTags"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Tags (comma-separated)
          </label>
          <el-input
            type="text"
            id="postTags"
            v-model="tagInput"
            @keydown.enter.prevent="addTag"
            @blur="addTag"
            maxlength="20"
            show-word-limit
            placeholder="Add tags like: programming, frontend, design"
            class="w-full h-[40px] rounded-lg dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
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
            >
              No tags added yet.
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="cancelPost"
            class="px-6 py-2 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            v-if="OwnerPost"
            type="button"
            @click="submitPost"
            class="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
          >
            Save
          </button>
        </div>
      </el-form>
      <div v-else class="flex items-center justify-center h-56">
        <div class="flex-row">
          <el-icon style="font-size: 10rem"><Pouring /></el-icon> <br />
          <h1>Content not found</h1>
          <br />
          <button
            class="bg-gray-200 cursor-pointer rounded-lg px-6 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 flex items-center space-x-2"
          >
            <router-link to="/">
              <span
                ><el-icon><DArrowLeft /></el-icon> Back Home <el-icon><DArrowRight /></el-icon>
              </span>
            </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import axios from 'axios'
import { PostService } from '@/services/post.service'
import { ElMessage, ElMessageBox } from 'element-plus'
import FileManagerDialog from '@/components/FileManager.vue'
import ColorPicker from '@/components/ColorPicker.vue'
import { Plus } from '@element-plus/icons-vue'

const router = useRouter()
const themeStore = useThemeStore()
const DialogFormRef = ref()
const showFileManager = ref(false)
const showColorPicker = ref(false)
const editorInstanceForColor = ref(null)
const colorType = ref(null)
const route = useRoute()
const OwnerPost = ref(false)
const post = ref({
  title: '',
  description: '',
  imageFile: null,
  featured_image_url: null,
  link: '',
  tags: [],
})

const uploadURL = ref(import.meta.env.VITE_MINIO_URL + '/profile')
const fileList = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const tagInput = ref('')
const instance = getCurrentInstance()
const proxy = instance.proxy
const myVMdEditor = ref(null)

// save last insertImageCallback
let insertImageCallbackRef = null

const customToolbarConfig = {
  customImageUploadButton: {
    title: 'Upload Image',
    icon: 'v-md-icon-img',
    action() {
      showFileManager.value = true
    },
  },
  A: {
    title: 'Text Color',
    icon: 'v-md-icon-text-color', // replace with your icon
    action(editorInstance) {
      editorInstanceForColor.value = editorInstance.cm || editorInstance.codemirror
      colorType.value = 'text'
      showColorPicker.value = true
    },
  },
  B: {
    title: 'Background Color',
    icon: 'v-md-icon-background-color', // replace with your icon
    action(editorInstance) {
      editorInstanceForColor.value = editorInstance.cm || editorInstance.codemirror
      colorType.value = 'background'
      showColorPicker.value = true
    },
  },
}

// from FileManagerDialog
const insertSelectedImage = (url) => {
  if (insertImageCallbackRef) {
    insertImageCallbackRef({ url, desc: '' })
  } else {
    post.value.description += `\n![image](${url})\n`
  }
  showFileManager.value = false
}
const insertSelectedColor = (color) => {
  const editor = editorInstanceForColor.value
  if (!editor) {
    ElMessage.error('Editor instance not available.')
    return
  }

  const selection = editor.getSelection()
  if (!selection) {
    ElMessage.warning('Please select some text first.')
    return
  }

  const wrappedText =
    colorType.value === 'text'
      ? `<span style="color:${color};">${selection}</span>`
      : `<span style="background-color:${color};">${selection}</span>`

  editor.replaceSelection(wrappedText)
}

const openColorPicker = (type, editorInstance) => {
  // editorInstance is VMdEditor wrapper
  editorInstanceForColor.value = editorInstance.cm || editorInstance.codemirror
  colorType.value = type
  showColorPicker.value = true
}

// built-in upload handler
const handleVMdEditorUploadImage = async (event, insertImageCallback, files) => {
  insertImageCallbackRef = insertImageCallback
  const file = files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('image', file)

  try {
    const response = await axios.post(uploadURL.value, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    if (response.data?.url) {
      insertImageCallback({ url: response.data.url, desc: file.name })
    } else {
      ElMessage.error('Server did not return image URL.')
    }
  } catch (err) {
    console.error(err)
    ElMessage.error('Upload failed.')
  }
}

// --- Featured Image Upload Logic ---
const beforeUpload = (rawFile) => {
  const isJPGorPNG = ['image/jpeg', 'image/png'].includes(rawFile.type)
  const isLt2M = rawFile.size / 1024 / 1024 < 2
  if (!isJPGorPNG) {
    ElMessage.error('Upload picture must be JPG or PNG format!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('Upload picture size can not exceed 2MB!')
    return false
  }
  return true
}

const handleChange = async (uploadFile, uploadFiles) => {
  if (!beforeUpload(uploadFile.raw)) {
    const index = uploadFiles.findIndex((f) => f.uid === uploadFile.uid)
    if (index !== -1) uploadFiles.splice(index, 1)
    return
  }
  if (uploadFiles.length > 1) {
    uploadFiles.splice(0, uploadFiles.length - 1)
  }
  const formData = new FormData()
  formData.append('file', uploadFile.raw)
  try {
    const response = await axios.post(uploadURL.value, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    if (response.data?.statusCode === 200) {
      const imageUrl = response.data.data.file_name
      uploadFile.url = imageUrl
      post.value.featured_image_url = imageUrl
      uploadFile.status = 'success'
      ElMessage.success('File uploaded successfully! 🎉')
    } else {
      ElMessage.error(response.data?.message || 'Upload failed.')
      fileList.value = []
    }
  } catch (err) {
    ElMessage.error('Upload failed. Please try again.')
    fileList.value = []
  }
}

const handleExceed = () => ElMessage.warning('You can only upload a maximum of 1 image.')
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

const getFeedPostDetailByID = async () => {
  try {
    const id = route.params.id
    const response = await PostService().getPostContentByID(id)

    if (response?.data.statusCode === 200) {
      post.value = response.data.data
      const imageUrl = response.data.data.featured_image_url
      // Check if an image URL exists before adding it to fileList
      if (imageUrl) {
        // Create a file object with the required properties
        const existingFile = {
          name: 'post-image', // You can set a default name
          url: imageUrl,
        }
        fileList.value = [existingFile]
        dialogImageUrl.value = imageUrl
      } else {
        fileList.value = []
        dialogImageUrl.value = ''
      }
      console.log(response.data.author_id)
      if (proxy.$userData.value.id == response.data.data.author_id) {
        OwnerPost.value = true
      }
    }
  } catch (err) {
    console.error(err)
  }
}
const handleRemove = () => {
  post.value.featured_image_url = null
}

const addTag = () => {
  const tagsToAdd = tagInput.value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '')
  tagsToAdd.forEach((newTag) => {
    if (!post.value.tags.includes(newTag)) post.value.tags.push(newTag)
  })
  tagInput.value = ''
}
const removeTag = (index) => post.value.tags.splice(index, 1)

const submitPost = async () => {
  if (!DialogFormRef.value) return
  DialogFormRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      const apiMethod = PostService().updatePostContent
      const response = await apiMethod(post.value)
      console.log(response.status)
      if (response?.status == 200) {
        ElMessageBox.confirm('Message,Your post was updated', 'Success', {
          confirmButtonText: 'New Post',
          cancelButtonText: 'View',
          type: 'success',
        })
          .then(() => {
            router.push({
              name: 'AddNewPost',
            })
          })
          .catch(() => {
            router.push({
              name: 'PostDetail',
              params: {
                username: response.data.author.username,
                slug: response.data.slug,
              },
            })
          })
      } else {
        ElMessage.error(response?.data?.message || 'Unexpected error.')
      }
    } catch (err) {
      console.info(err)
    }
  })
}

const cancelPost = () => {
  if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
    router.back()
  }
}
onMounted(() => {
  getFeedPostDetailByID()
})
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

.hide-upload-card .el-upload--picture-card {
  display: none;
}

/* Dark Mode Overrides */
html.dark .el-upload--picture-card,
html.dark .el-upload-list__item {
  background-color: #374151; /* A darker background for the card */
  border-color: #4b5563; /* A darker border */
}

html.dark .el-upload--picture-card:hover,
html.dark .el-upload-list__item:hover {
  border-color: #6b7280; /* A slightly lighter border on hover */
}

html.dark .el-upload--picture-card .el-icon,
html.dark .el-upload-list__item-actions {
  color: #d1d5db; /* Light gray color for icons */
}

html.dark .el-upload-list__item-actions .el-icon {
  color: #d1d5db; /* Ensure icons within the actions container are also light */
}
.v-md-editor--fullscreen {
  margin-top: 60px !important;
}
.my-custom-message {
  z-index: 99999 !important;
}
:root {
  --el-message-z-index: 9999;
}
</style>
