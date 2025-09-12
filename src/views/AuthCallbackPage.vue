<template>
  <div class="auth-callback-page flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center p-6 bg-white rounded-lg shadow-md">
      <svg
        class="animate-spin h-10 w-10 text-indigo-500 mx-auto mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
      </svg>
      <p class="text-lg text-gray-700 font-semibold">Logging you in...</p>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/module/users'
import { AuthService } from '@/services/auth.service'
import { showToast } from 'vant'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const errorMessage = ref<string | null>(null)

onMounted(async () => {
  const errorParam = route.query.error as string
  if (errorParam) {
    errorMessage.value = `Login failed: ${decodeURIComponent(errorParam)}. Please try again.` // <--- ENSURE THIS LINE ENDS WITH A SEMICOLON (if using semicolons)
    setTimeout(() => {
      router.push('/login')
    }, 3000)
    return
  }

  console.log('AuthCallbackPage: Attempting to load user data...')
  try {
    AuthService()
      .AuthProfile()
      .then(async (response) => {
        showToast('Logged!')
        if ((response.data.statusCode = 200)) {
          userStore.setUser(response.data.data)
          userStore.isLogged = true
          router.push('/')
        }
      })
    if (userStore.isLogged) {
      console.log('AuthCallbackPage: User successfully logged in. Redirecting...')
      const redirectPath = (route.query.redirect as string) || '/'
      router.push(redirectPath)
    } else {
      console.log(
        'AuthCallbackPage: User not logged in after loadUserAndToken. Redirecting to login.',
      )
      // cookies.remove('kdc.secure.token', { path: '/' })
    }
  } catch (e) {
    console.error('AuthCallbackPage: Error during user data loading:', e)
    errorMessage.value = 'An unexpected error occurred during login. Please try again.'
    router.push('/login')
  }
})
</script>

<style scoped>
.auth-callback-page {
  background-color: #f3f4f6;
}
</style>
