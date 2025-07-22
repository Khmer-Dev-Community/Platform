<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow p-3 border border-gray-200 dark:border-gray-700"
  >
    <div class="flex items-start justify-between mb-2">
      <div class="flex items-center space-x-2">
        <img
          :src="member.avatar"
          :alt="member.name + ' Avatar'"
          class="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700"
        />
        <div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-gray-50">{{ member.name }}</h2>
          <p class="text-purple-600 dark:text-purple-400 text-sm">@{{ member.username }}</p>
          <p class="text-gray-700 dark:text-gray-300 text-sm mt-1">{{ member.jobTitle }}</p>
        </div>
      </div>
      <button
        v-if="!member.isFollowing"
        @click="toggleFollow"
        class="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-5 rounded-full text-sm transition-colors"
      >
        Follow
      </button>
      <button
        v-else
        @click="toggleFollow"
        class="border border-purple-600 text-purple-600 dark:text-purple-400 font-semibold py-1 px-6 rounded-full text-sm transition-colors"
      >
        Following
      </button>
    </div>

    <div class="flex flex-wrap gap-2 mb-4">
      <span
        v-for="badge in member.badges"
        :key="badge"
        class="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs px-3 py-1 rounded-full font-base"
      >
        {{ badge }}
      </span>
    </div>

    <div
      class="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm space-x-4 mb-2"
    >
      <span class="flex items-center space-x-1">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{ member.location }}</span>
      </span>
      <span class="flex items-center space-x-1">
        <i class="far fa-calendar-alt"></i>
        <span>Joined {{ member.joinDate }}</span>
      </span>
    </div>

    <div class="flex justify-around text-center border-t pt-4 border-gray-200 dark:border-gray-700">
      <div>
        <p class="font-bold text-lg text-gray-900 dark:text-gray-50">
          {{ formatCount(member.followers) }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">Followers</p>
      </div>
      <div>
        <p class="font-bold text-lg text-gray-900 dark:text-gray-50">
          {{ formatCount(member.following) }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">Following</p>
      </div>
      <div>
        <p class="font-bold text-lg text-gray-900 dark:text-gray-50">
          {{ formatCount(member.posts) }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">Posts</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  member: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      avatar: 'https://via.placeholder.com/64',
      name: 'Member Name',
      username: 'memberusername',
      jobTitle: 'Job Title',
      badges: [],
      location: 'Location',
      joinDate: 'Date',
      followers: 0,
      following: 0,
      posts: 0,
      isFollowing: false,
    }),
  },
})

// Define the custom events that this component can emit
const emit = defineEmits(['update:followingStatus'])

const toggleFollow = () => {
  // Emit an event with the member's ID and the new following status
  emit('update:followingStatus', {
    memberId: props.member.id,
    newStatus: !props.member.isFollowing,
  })
}

// Helper function to format large numbers (e.g., 1.2K)
const formatCount = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}
</script>

<style scoped>
/* No specific scoped styles needed if using only Tailwind utility classes */
</style>
