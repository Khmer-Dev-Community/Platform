<template>
  <div class="min-h-screen flex bg-gray-100 dark:bg-gray-900">
    <div
      class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white dark:bg-gray-800"
    >
      <div class="max-w-md w-full">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
          Log in to your account
        </h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="sr-only">Email or username</label>
            <input
              type="text"
              id="email"
              v-model="email"
              placeholder="EMAIL OR USERNAME"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm"
              required
            />
          </div>

          <div class="relative">
            <label for="password" class="sr-only">Password</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              placeholder="* * * * * * * *"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-sm pr-10"
              required
            />
            <button
              type="button"
              @click="toggleShowPassword"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>

          <button
            type="submit"
            class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Log in
          </button>
        </form>

        <div class="text-center mt-4">
          <a href="#" class="text-sm text-purple-600 dark:text-purple-400 hover:underline"
            >Forgot password?</a
          >
        </div>
        <div class="my-6 space-y-3">
          <button
            disabled
            readOnly
            class="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <i class="fab fa-google w-5 h-5 mr-3"></i>
            Continue with Google
          </button>
          <button
            @click="handleGithubLogin"
            class="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <i class="fab fa-github w-5 h-5 mr-3"></i>
            Continue with Github
          </button>
          <button
            class="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <i class="fab fa-twitter w-5 h-5 mr-3"></i> Continue with X
          </button>
          <button
            class="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <i class="fab fa-facebook-f w-5 h-5 mr-3"></i>
            Continue with Facebook
          </button>
          <button
            class="w-full flex items-center justify-center px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <i class="fab fa-apple w-5 h-5 mr-3"></i>
            Continue with Apple
          </button>
        </div>

        <div class="text-center text-sm text-gray-600 dark:text-gray-400">
          <span>New to Reply? </span>
          <a href="#" class="text-purple-600 dark:text-purple-400 hover:underline">Sign up</a>
        </div>
        <div class="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
          This site is protected by reCAPTCHA Enterprise and the Google
          <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
          and
          <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
          apply.
        </div>
      </div>
    </div>

    <div
      class="hidden lg:flex lg:w-1/2 bg-black flex-col items-center justify-center p-12 relative overflow-hidden"
    >
      <div class="absolute top-8 left-8 text-orange-500 text-4xl">
        <div class="w-8 h-8 bg-orange-500 rounded-sm"></div>
      </div>
      <div class="text-white text-center z-10">
        <p class="text-4xl font-semibold mb-4">Idea to app, fast</p>
      </div>
      <img
        src="https://static.vecteezy.com/system/resources/previews/048/216/761/non_2x/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
        alt="Earth"
        class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 opacity-70 w-full max-w-xl object-cover"
        style="clip-path: ellipse(50% 50% at 50% 100%)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/module/users'

const email = ref('')
const password = ref('')
const showPassword = ref(false) // Reactive state to toggle password visibility

const userStore = useUserStore()
const router = useRouter()

const API_BASE_URL = 'http://localhost:3000' // IMPORTANT: Set your backend API base URL here

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

onMounted(async () => {
  await userStore.loadUserAndToken()
  if (userStore.isLogged) {
    console.log('User is logged in:', userStore.userData?.name)
    router.push('/') // Or '/dashboard' if you have one
  } else {
    console.log('User is not logged in.')
  }
})

const handleLogin = async () => {
  console.log('Attempting login with:', {
    email: email.value,
    // password: password.value, // Never log raw password in production
  })

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth02/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email.value, password: password.value }),
    })

    const data = await response.json()

    if (response.ok) {
      // Assuming your backend sends back { token: "...", user: { ... } }
      await userStore.setToken(data.token)
      await userStore.setUser(data.user)
      await userStore.setIsLogged(true) // Explicitly set logged status
      console.log('Login successful!', userStore.userData)
      router.push('/') // Redirect to homepage or dashboard
    } else {
      console.error('Login failed:', data.message || 'Unknown error')
      alert(data.message || 'Login failed! Please check your credentials.')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('An error occurred during login. Please try again.')
  }
}

// New method for GitHub Login
const handleGithubLogin = () => {
  console.log('Initiating GitHub login...')
  window.location.href = `${API_BASE_URL}/api/auth02/github/login`
}
const logout = async () => {
  await userStore.clearUser()
  console.log('Logged out!')
  // Optionally redirect to login page after logout
  router.push('/login')
}
</script>
<style scoped></style>
