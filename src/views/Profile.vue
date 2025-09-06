<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-2">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 relative">
        <button
          v-if="isOwnProfile"
          @click="openEditProfileDialog"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <el-icon style="font-size: 1.5rem;"><Tools /></el-icon>
        </button>

        <div class="flex items-center space-x-6 mb-4">
          <img
            :src="userProfile?.avatar_url"
            alt="User Avatar"
            class="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
          />
          <div>
            <h1 class="text-2xl font-bold dark:text-gray-50">
              {{ userProfile.fname }} {{ userProfile?.lname }}
            </h1>
            <p class="text-purple-600 dark:text-purple-400 text-sm">
              @{{ userProfile?.username }}
            </p>
          </div>
        </div>

        <button
          v-if="isOwnProfile"
          @click="openEditProfileDialog"
          class="bg-gray-200 dark:bg-gray-900 hover:bg-gray-500 text-blue dark:text-white font-semibold py-1 px-4 rounded-full text-sm transition-colors mb-2"
        >
          <i class="fas fa-edit mr-2"></i> Edit Profile
        </button>

        <p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          {{
            userProfile?.description ||
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
                userProfile?.createdAt
                  ? new Date(userProfile.createdAt).toLocaleDateString('en-US', {
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
     
      :before-close="handleCloseDialog"
      custom-class="dark:bg-gray-800 dark:text-gray-100 w-full lg:w-[600px]"
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
import { ref, computed, watchEffect, reactive, onMounted } from 'vue'
import { useUserStore, type UserData } from '@/stores/module/users'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ProfileService } from '@/services/profile.service'
import { useRoute } from 'vue-router'

const userStore = useUserStore() // Pinia store instance
const route = useRoute()
const activeTab = ref('posts') // Default active tab
const userProfile = ref<UserData>({} as UserData) // Use UserData type
// Dialog and Form State
const isEditProfileDialogOpen = ref(false)
const editFormData = ref<UserData>({} as UserData) // Initialize with an empty object, will be populated
const editProfileFormRef = ref<FormInstance>() // Reference to the ElForm component for validation

// Check if the displayed profile belongs to the logged-in user
const isOwnProfile = computed(() => {
  return  userStore.userData?.username === route.params.username;
});

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

// Get user profile based on route parameter
const handleGetProfile = async () => {
  const username: any = route.params.username
  if (!username) {
    // Handle case where username is not in the route
    ElMessage.error('Username not found in route parameters.')
    return;
  }
  
  // Check if we are viewing our own profile, if so, use the store data
  if (isOwnProfile.value) {
    userProfile.value = userStore.userData || {} as UserData;
    // Pre-populate form data for a smooth edit experience
    editFormData.value = JSON.parse(JSON.stringify(userStore.userData));
  } else {
    // Fetch profile from the API for other users
    const response = await ProfileService().getUserProfile(username)
    if (response?.data.statusCode === 200) {
      userProfile.value = response.data.data
    } else {
      ElMessage.error('Failed to load user profile.')
      // Optionally, redirect to a 404 page
    }
  }
}

// Function to open the edit profile dialog
const openEditProfileDialog = () => {
  // Ensure this can only be called for the authenticated user's profile
  if (!isOwnProfile.value) {
    return;
  }

  if (userStore.userData) {
    // Ensure edit form data is always a fresh copy of the store data
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
        isEditProfileDialogOpen.value = false
        // Update userProfile reactive ref with the new data from the store
        userProfile.value = userStore.userData || {} as UserData;
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
      editProfileFormRef.value?.resetFields()
    })
    .catch(() => {
      // User cancelled closing the dialog
    })
}

// Watch for route changes to fetch new profile data
watchEffect(() => {
  handleGetProfile()
})
</script>

<style scoped>
.el-form-dialog .el-form-item {
  margin-bottom: 20px;
}
</style>