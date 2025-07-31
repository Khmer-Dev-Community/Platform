<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-2">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 relative">
        <button
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M11.078 2.25c-.917 0-1.605.438-1.748 1.107-.352 1.61-1.637 2.766-3.076 3.011L4.5 7.25c-.538.086-1 .59-1 1.25V12.75c0 .66.462 1.164 1 1.25l1.754.293c.352 1.61 1.637 2.766 3.076 3.011.143.669.831 1.107 1.748 1.107h1.844c.917 0 1.605-.438 1.748-1.107.352-1.61 1.637 2.766 3.076-3.011l1.754-.293c.538-.086 1-.59 1-1.25V8.5c0-.66-.462-1.164-1-1.25l-1.754-.293c-.352-1.61-1.637-2.766-3.076-3.011-.143-.669-.831-1.107-1.748-1.107H11.078zM9.75 8.625a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="flex items-center space-x-6 mb-4">
          <img
            :src="userStore.userData?.avatar_url"
            alt="User Avatar"
            class="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
          />
          <div>
            <h1 class="text-2xl font-bold dark:text-gray-50">
              {{ userStore.userData?.fname }} {{ userStore.userData?.lname }}
            </h1>
            <p class="text-purple-600 dark:text-purple-400 text-sm">
              @{{ userStore.userData?.username }}
            </p>
          </div>
        </div>
        <button
          @click="openEditProfileDialog"
          class="bg-gray-200 dark:bg-gray-900 hover:bg-gray-500 text-blue dark:text-white font-semibold py-1 px-4 rounded-full text-sm transition-colors mb-2"
        >
          <i class="fas fa-edit mr-2"></i> Edit Profile
        </button>
        <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {{
            userStore.userData?.description ||
            'Full Stack Developer passionate about building amazing user experiences and scalable applications. Always learning, always coding.'
          }}
        </p>
        <div
          class="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm space-x-4 mb-4"
        >
          <span class="flex items-center space-x-1">
            <i class="fas fa-map-marker-alt"></i>
            <span>San Francisco, CA</span>
          </span>
          <span class="flex items-center space-x-1">
            <i class="far fa-calendar-alt"></i>
            <span
              >Joined
              {{
                userStore.userData?.createdAt
                  ? new Date(userStore.userData.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })
                  : 'N/A'
              }}</span
            >
          </span>
          <a
            href="#"
            class="flex items-center space-x-1 hover:underline text-blue-600 dark:text-blue-400"
          >
            <i class="fas fa-link"></i>
            <span>yourwebsite.com</span>
          </a>
        </div>

        <div class="flex flex-wrap gap-2 mb-4">
          <span
            class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-medium"
            >React Expert</span
          >
          <span
            class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-medium"
            >TypeScript</span
          >
          <span
            class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-3 py-1 rounded-full font-medium"
            >Node.js</span
          >
          <span
            class="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 text-xs px-3 py-1 rounded-full font-medium"
            >Top Contributor</span
          >
        </div>

        <div class="flex justify-around text-center mt-6">
          <div>
            <p class="font-bold text-xl text-gray-900 dark:text-gray-50">{{ formatCount(156) }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Posts</p>
          </div>
          <div>
            <p class="font-bold text-xl text-gray-900 dark:text-gray-50">{{ formatCount(2400) }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Followers</p>
          </div>
          <div>
            <p class="font-bold text-xl text-gray-900 dark:text-gray-50">{{ formatCount(890) }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Following</p>
          </div>
          <div>
            <p class="font-bold text-xl text-gray-900 dark:text-gray-50">{{ formatCount(5200) }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Likes</p>
          </div>
        </div>
      </div>

      <div class="flex border-b border-gray-200 dark:border-gray-700">
        <button
          @click="activeTab = 'posts'"
          :class="{
            'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold':
              activeTab === 'posts',
          }"
          class="flex-1 py-3 text-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <i class="fas fa-clipboard-list mr-2"></i> Posts
        </button>
        <button
          @click="activeTab = 'following'"
          :class="{
            'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold':
              activeTab === 'following',
          }"
          class="flex-1 py-3 text-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <i class="fas fa-users mr-2"></i> Following
        </button>
        <button
          @click="activeTab = 'liked'"
          :class="{
            'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold':
              activeTab === 'liked',
          }"
          class="flex-1 py-3 text-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <i class="fas fa-heart mr-2"></i> Liked
        </button>
        <button
          @click="activeTab = 'about'"
          :class="{
            'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold':
              activeTab === 'about',
          }"
          class="flex-1 py-3 text-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <i class="fas fa-info-circle mr-2"></i> About
        </button>
      </div>

      <div class="p-6">
        <div v-if="activeTab === 'posts'">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Your Posts</h3>
          <div class="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
              Building scalable React applications with TypeScript
            </h4>
            <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Here's what I've learned after 5 years of React development...
            </p>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
                >React</span
              >
              <span
                class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
                >TypeScript</span
              >
              <span
                class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
                >Frontend</span
              >
            </div>
            <div class="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
              <span>2 days ago</span>
              <div class="flex items-center space-x-4">
                <span class="flex items-center space-x-1">
                  <i class="fas fa-arrow-up"></i><span>234</span>
                </span>
                <span class="flex items-center space-x-1">
                  <i class="far fa-comment-alt"></i><span>45</span>
                </span>
              </div>
            </div>
          </div>

          <div class="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
              My experience with microservices architecture
            </h4>
            <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Transitioning from monolith to microservices taught me valuable lessons...
            </p>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
                >Architecture</span
              >
              <span
                class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
                >Backend</span
              >
              <span
                class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full"
                >DevOps</span
              >
            </div>
            <div class="flex justify-between items-center text-gray-500 dark:text-gray-400 text-sm">
              <span>1 week ago</span>
              <div class="flex items-center space-x-4">
                <span class="flex items-center space-x-1">
                  <i class="fas fa-arrow-up"></i><span>189</span>
                </span>
                <span class="flex items-center space-x-1">
                  <i class="far fa-comment-alt"></i><span>32</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'following'">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">
            People You Follow
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            List of users you are following would appear here.
          </p>
        </div>

        <div v-if="activeTab === 'liked'">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Liked Content</h3>
          <p class="text-gray-600 dark:text-gray-400">Content you have liked would appear here.</p>
        </div>

        <div v-if="activeTab === 'about'">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">About Me</h3>
          <p class="text-gray-600 dark:text-gray-400">
            This section would contain more detailed information about the user, their interests,
            etc.
          </p>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="isEditProfileDialogOpen"
      title="Edit Profile"
      width="600px"
      :before-close="handleCloseDialog"
      custom-class="dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-xl"
    >
      <el-form
        ref="editProfileFormRef"
        :model="editFormData"
        :rules="formRules"
        label-width="120px"
        class="el-form-dialog"
      >
        <el-form-item label="First Name" prop="fname">
          <el-input v-model="editFormData.fname" placeholder="First Name"></el-input>
        </el-form-item>
        <el-form-item label="Last Name" prop="lname">
          <el-input v-model="editFormData.lname" placeholder="Last Name"></el-input>
        </el-form-item>
        <el-form-item label="Username" prop="username">
          <el-input v-model="editFormData.username" placeholder="Username" disabled></el-input>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Username cannot be changed.</p>
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="editFormData.email" placeholder="Email" disabled></el-input>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed.</p>
        </el-form-item>
        <el-form-item label="Phone" prop="phone">
          <el-input v-model="editFormData.phone" placeholder="Phone Number"></el-input>
        </el-form-item>
        <el-form-item label="Sex" prop="sex">
          <el-radio-group v-model="editFormData.sex">
            <el-radio label="male">Male</el-radio>
            <el-radio label="female">Female</el-radio>
            <el-radio label="other">Other</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            v-model="editFormData.description"
            type="textarea"
            :rows="4"
            placeholder="Tell us about yourself..."
          ></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCloseDialog">Cancel</el-button>
          <el-button
            type="primary"
            @click="handleEditProfileSubmit"
            :loading="userStore.loadingUser"
          >
            {{ userStore.loadingUser ? 'Saving...' : 'Save Changes' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, reactive } from 'vue'
import { useUserStore, type UserData } from '@/stores/module/users'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const userStore = useUserStore() // Pinia store instance

const activeTab = ref('posts') // Default active tab

// Dialog and Form State
const isEditProfileDialogOpen = ref(false)
const editFormData = ref<UserData>({} as UserData) // Initialize with an empty object, will be populated
const editProfileFormRef = ref<FormInstance>() // Reference to the ElForm component for validation

// Form Validation Rules
const formRules = reactive<FormRules>({
  fname: [{ required: true, message: 'Please enter your first name', trigger: 'blur' }],
  lname: [{ required: true, message: 'Please enter your last name', trigger: 'blur' }],
  phone: [{ required: true, message: 'Please enter your phone number', trigger: 'blur' }],
  sex: [{ required: true, message: 'Please select your sex', trigger: 'change' }],
  description: [{ required: false, message: 'Please provide a description', trigger: 'blur' }],
})

// Helper function to format large numbers (e.g., 2.4K)
const formatCount = (num: number): string => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Function to open the edit profile dialog
const openEditProfileDialog = () => {
  if (userStore.userData) {
    // Deep copy user data to form data to prevent direct mutation of store state
    editFormData.value = JSON.parse(JSON.stringify(userStore.userData))
    isEditProfileDialogOpen.value = true
  } else {
    ElMessage.warning('User data not loaded yet.')
  }
}

// Function to handle form submission
const handleEditProfileSubmit = async () => {
  if (!editProfileFormRef.value) return

  try {
    const valid = await editProfileFormRef.value.validate()
    if (valid) {
      // Create a partial update object, sending only mutable fields
      const updatedProfile: Partial<UserData> = {
        fname: editFormData.value.fname,
        lname: editFormData.value.lname,
        phone: editFormData.value.phone,
        sex: editFormData.value.sex,
        description: editFormData.value.description,
      }

      const success = await userStore.updateUserProfile(updatedProfile)

      if (success) {
        ElMessage.success('Profile updated successfully!')
        isEditProfileDialogOpen.value = false // Close dialog on success
      } else {
        ElMessage.error('Failed to update profile. Please try again.')
      }
    } else {
      ElMessage.warning('Please complete all required fields.')
    }
  } catch (error) {
    console.error('Error during profile update submission:', error)
    ElMessage.error('An unexpected error occurred during update.')
  }
}

// Function to close and reset the dialog
const handleCloseDialog = () => {
  ElMessageBox.confirm('Are you sure to close this dialog without saving?', 'Confirm', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(() => {
      isEditProfileDialogOpen.value = false
      editProfileFormRef.value?.resetFields() // Reset form validation and fields
    })
    .catch(() => {
      // User cancelled closing the dialog
    })
}

// Watch for changes in userStore.userData to ensure the component reacts (optional, but good for reactivity)
watchEffect(() => {
  // If user data changes in store while dialog is open, update form data
  if (isEditProfileDialogOpen.value && userStore.userData) {
    editFormData.value = JSON.parse(JSON.stringify(userStore.userData))
  }
})
</script>

<style scoped>
/* Add any custom styles here if needed */
/* Element Plus dialog and form styling can be customized via global CSS or Element Plus theming */
.el-form-dialog .el-form-item {
  margin-bottom: 20px; /* Adjust spacing */
}
</style>
