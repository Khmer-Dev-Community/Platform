<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-2">
    <div class="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-none overflow-hidden">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700 relative">
        <button
          v-if="isOwnProfile"
          @click="openEditProfileDialog"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <el-icon style="font-size: 1.5rem"><Tools /></el-icon>
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
            <p class="text-purple-600 dark:text-purple-400 text-sm">@{{ userProfile?.username }}</p>
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
            <p class="font-bold text-xl text-gray-900 dark:text-gray-50">
              {{ proxy.$formatCount(156) }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Posts</p>
          </div>
          <div>
            <p class="font-bold text-xl text-gray-900 dark:text-gray-50">
              {{ proxy.$formatCount(2400) }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Followers</p>
          </div>
          <div>
            <p class="font-bold text-xl text-gray-900 dark:text-gray-50">
              {{ proxy.$formatCount(890) }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Following</p>
          </div>
          <div>
            <p class="font-bold text-xl text-gray-900 dark:text-gray-50">
              {{ proxy.$formatCount(5200) }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">Likes</p>
          </div>
        </div>
      </div>

      <div class="flex border-b border-gray-200 dark:border-gray-700">
        <button
          @click="navigateToTab('posts')"
          :class="{
            'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold':
              activeTab === 'posts',
          }"
          class="flex-1 py-3 text-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <i class="fas fa-clipboard-list mr-2"></i> Posts
        </button>
        <button
          @click="navigateToTab('following')"
          :class="{
            'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold':
              activeTab === 'following',
          }"
          class="flex-1 py-3 text-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <i class="fas fa-users mr-2"></i> Following
        </button>
        <button
          @click="navigateToTab('liked')"
          :class="{
            'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold':
              activeTab === 'liked',
          }"
          class="flex-1 py-3 text-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <i class="fas fa-heart mr-2"></i> Liked
        </button>
        <button
          @click="navigateToTab('save')"
          :class="{
            'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold':
              activeTab === 'save',
          }"
          class="flex-1 py-3 text-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <el-icon><CollectionTag /></el-icon> Save
        </button>
      </div>

      <div class="p-2 lg:p-6">
        <div v-if="activeTab === 'posts'">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Your Posts</h3>

          <section class="mb-8">
            <div class="space-y-4">
              <PostlistCard
                v-for="(post, index) in latestPosts"
                :key="post.id"
                :id="post.id"
                :title="post.title"
                :content="post?.meta"
                :featured="post.featured_image_url"
                :tags="post.tags"
                :date="proxy.$timeAgo(post.created_at)"
                :upvotes="proxy.$formatCount(post.view_count)"
                :comments="post.comments"
                :isOpen="openMenuId === post.id"
                @toggle-menu="handleToggleMenu"
                @action="handlePostAction"
                :post="post"
                :owner="isOwnProfile"
                :isSave="false"
                :author="post.author.first_name"
                :author_profile="post.author.avatar_url"
              />

              <button
                class="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Show more
              </button>
            </div>
          </section>
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

        <div v-if="activeTab === 'save'">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Post Saved</h3>
          <PostlistCard
            v-for="(i, index) in savePosts"
            :key="i.post.id"
            :id="i.post.id"
            :title="i.post.title"
            :content="i.post.meta"
            :featured="i.post.featured_image_url"
            :tags="i.post.tags"
            :date="proxy.$timeAgo(i.post.created_at)"
            :upvotes="proxy.$formatCount(i.post.view_count)"
            :comments="i.post.comments"
            :isOpen="openMenuId === i.post.id"
            @toggle-menu="handleToggleMenu"
            @action="handlePostAction"
            :post="i.post"
            :owner="isOwnProfile"
            :isSaved="true"
            @remove-post="removePost"
            :author="i.post.author.first_name"
            :author_profile="i.post.author.avatar_url"
          />

          <button
            class="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Show more
          </button>
        </div>
      </div>
    </div>

    <el-dialog
      v-model="isEditProfileDialogOpen"
      title="Edit Profile"
      :before-close="handleCloseDialog"
      custom-class="dark:bg-gray-800 dark:text-gray-100 profile-dialog"
      :show-close="false"
    >
      <template #header="{ close, titleId, titleClass }">
        <div class="flexr">
          <h4 :id="titleId" :class="titleClass">
            <i class="fas fa-arrow-left" @click="close"></i> Edit Profile
          </h4>
        </div>
      </template>
      <el-form
        ref="editProfileFormRef"
        :model="editFormData"
        :rules="formRules"
        label-width="120px"
        class="el-form-dialog"
        label-position="top"
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
import { ref, computed, watchEffect, reactive, onMounted, getCurrentInstance, watch } from 'vue'
import { useUserStore, type UserData } from '@/stores/module/users'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { ProfileService } from '@/services/profile.service'
import { useRoute, useRouter } from 'vue-router'
import { PostService } from '@/services/post.service'
import PostlistCard from '@/components/PostlistCard.vue'
import { SavePostService } from '@/services/saved.post.service'

const { proxy } = getCurrentInstance()

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const activeTab = computed(() => route.params.active || 'posts')
const userProfile = ref<UserData>({} as UserData)
const openMenuId = ref<number | null>(null)
// Dialog and Form State
const isEditProfileDialogOpen = ref(false)
const editFormData = ref<UserData>({} as UserData)
const editProfileFormRef = ref<FormInstance>()
const latestPosts = ref([])
const savePosts = ref([])

// Check if the displayed profile belongs to the logged-in user
const isOwnProfile = computed(() => {
  return userStore.userData?.username === route.params.username
})

// Form Validation Rules
const formRules = reactive<FormRules>({
  fname: [{ required: true, message: 'Please enter your first name', trigger: 'blur' }],
  lname: [{ required: true, message: 'Please enter your last name', trigger: 'blur' }],
  phone: [{ required: true, message: 'Please enter your phone number', trigger: 'blur' }],
  sex: [{ required: true, message: 'Please select your sex', trigger: 'change' }],
  description: [{ required: false, message: 'Please provide a description', trigger: 'blur' }],
})

// Get user profile based on route parameter
const handleGetProfile = async () => {
  const username: any = route.params.username
  if (!username) {
    ElMessage.error('Username not found in route parameters.')
    return
  }
  if (isOwnProfile.value) {
    userProfile.value = userStore.userData || ({} as UserData)
    editFormData.value = JSON.parse(JSON.stringify(userStore.userData))
  } else {
    const response = await ProfileService().getUserProfile(username)
    if (response?.data.statusCode === 200) {
      userProfile.value = response.data.data
    } else {
      ElMessage.error('Failed to load user profile.')
    }
  }
}
const navigateToTab = (active: string) => {
  router.push({
    name: 'profile-active',
    params: {
      username: route.params.username,
      active: active,
    },
  })
}
// Get Post Profile
const handleGetPostcontent = async () => {
  const username: any = route.params.username

  if (!username) {
    ElMessage.error('Username not found in route parameters.')
    return
  }
  const query = {
    limit: 10,
    profile: username,
  }
  const response = await PostService().getPostContent(query)
  if (response?.data.statusCode === 200) {
    latestPosts.value = response.data.data
  } else {
    ElMessage.error('Failed to load user profile.')
  }
}

// Function to open the edit profile dialog
const openEditProfileDialog = () => {
  if (!isOwnProfile.value) {
    return
  }
  if (userStore.userData) {
    editFormData.value = JSON.parse(JSON.stringify(userStore.userData))
    isEditProfileDialogOpen.value = true
  } else {
    ElMessage.warning('User data not loaded yet.')
  }
}

const handleToggleMenu = (id: number) => {
  openMenuId.value = openMenuId.value === id ? null : id
}
const handleGetsavePost = () => {
  const username: any = route.params.username
  SavePostService()
    .getSavePost(username, { limit: 10 })
    .then((response) => {
      console.log(response.data)
      if (response?.status === 200) {
        savePosts.value = response.data
      } else {
        ElMessage.error('Failed to load user profile.')
      }
    })
}
const removePost = (event: any) => {
  console.log('Type of event.postId:', typeof event?.postId)
  const index = savePosts.value.findIndex((p) => p.post_id === event?.postId)
  console.log('Index found:', index)
  if (index !== -1) {
    savePosts.value.splice(index, 1)
    console.log('Post successfully removed.')
  } else {
    console.log('Post not found in array. It may have already been removed.')
  }
}
const handlePostAction = ({ type, postId }: { type: string; postId: number }) => {
  console.log(`Parent received action: ${type} for post ID: ${postId}`)
  openMenuId.value = null // Close menu after an action is selected
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
        userProfile.value = userStore.userData || ({} as UserData)
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

// Watch for route
watch(
  activeTab,
  (newTab) => {
    if (newTab === 'save') {
      handleGetsavePost()
    }
  },
  { immediate: true },
)
watchEffect(() => {
  handleGetProfile()
})
onMounted(() => {
  handleGetPostcontent()
})
</script>

<style scoped>
.el-form-dialog .el-form-item {
  margin-bottom: 20px;
}
</style>
<style scoped>
.el-form-dialog .el-form-item {
  margin-bottom: 20px;
}
:deep(.el-dialog) {
  --el-dialog-width: 95vw;
  margin-top: 80px;
}

@media (min-width: 640px) {
  :deep(.el-dialog) {
    --el-dialog-width: 600px;
  }
}
</style>
