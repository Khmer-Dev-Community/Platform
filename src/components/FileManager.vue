<template>
  <el-dialog v-model="visible" title="File Manager" width="800" @close="handleClose">
    <div class="file-manager-container">
      <el-upload
        class="upload-demo"
        drag
        :action="uploadURL"
        multiple
        :on-success="handleUploadSuccess"
      >
        <el-icon class="el-icon--upload"><i-ep-upload-filled /></el-icon>
        <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        <template #tip>
          <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
        </template>
      </el-upload>

      <el-divider>Or select from existing files</el-divider>
      <div class="file-list-grid">
        <div v-for="image in images" :key="image.id" class="file-item" @click="selectImage(image)">
          <img :src="image.url" :alt="image.name" class="file-image" />
          <div class="file-name">{{ image.name }}</div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const uploadURL = ref(import.meta.env.VITE_MINIO_URL + '/profile')
const listFilesURL = ref(import.meta.env.VITE_MINIO_URL + '/your-api/list-files')

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'selectImage'])

const visible = ref(props.modelValue)

const images = ref([])

watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue
  },
)

/**
 * Fetches the list of existing images from your backend API.
 */
const fetchImages = async () => {
  try {
    const response = await axios.get(listFilesURL.value)
    if (response.data && response.data.data) {
      images.value = response.data.data.map((item) => ({
        id: item.id,
        name: item.fileName,
        url: item.fileUrl,
      }))
    }
  } catch (error) {
    ElMessage.error('Failed to load images from the server.')
    console.error(error)
  }
}

/**
 * Handles a successful file upload and adds the new image to the list.
 */
const handleUploadSuccess = (response, file, fileList) => {
  if (response && response.data && response.data.file_name) {
    const newImage = {
      id: Date.now(),
      name: file.name,
      url: response.data.file_name,
    }
    images.value.push(newImage)
    ElMessage.success('Image uploaded successfully! 🎉')
  } else {
    ElMessage.error('Upload failed: Server did not return a valid URL.')
    console.error('Server response:', response)
  }
}

/**
 * Handles closing the dialog.
 */
const handleClose = () => {
  emit('update:modelValue', false)
}

/**
 * Selects an image and closes the dialog.
 */
const selectImage = (image) => {
  emit('selectImage', image.url)
  handleClose()
}
</script>

<style scoped>
.file-manager-container {
  padding: 20px;
}
.file-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 20px;
}
.file-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  padding: 10px;
  transition: all 0.2s ease;
}
.file-item:hover {
  border-color: #409eff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.file-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}
.file-name {
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
