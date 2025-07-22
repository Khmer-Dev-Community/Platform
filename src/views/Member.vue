<template>
  <div class="dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100 py-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-2 lg:px-2">
      <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-50">Members</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Discover and connect with community members
      </p>

      <div
        class="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-2 sm:space-y-0 sm:space-x-2"
      >
        <div class="relative w-full sm:w-2/3">
          <input
            type="text"
            placeholder="Search members..."
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-1 pl-10 pr-4 text-base text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <i class="fas fa-search"></i>
          </span>
        </div>
        <button
          class="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-1 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <i class="fas fa-filter"></i>
          <span>Filter</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <MemberCard
          v-for="member in members"
          :key="member.id"
          :member="member"
          @update:followingStatus="handleUpdateFollowingStatus"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MemberCard from '@/components/MemberCard.vue' // Adjust path if needed

// Dummy data for members - this would typically be fetched from an API
const members = ref([
  {
    id: 'm1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'Alex Chen',
    username: 'alexchen',
    jobTitle: 'Full Stack Developer',
    badges: ['Top Contributor', 'Mentor'],
    location: 'San Francisco, CA',
    joinDate: 'Jan 2023',
    followers: 1200,
    following: 340,
    posts: 89,
    isFollowing: false,
  },
  {
    id: 'm2',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Sarah Johnson',
    username: 'sarahj',
    jobTitle: 'UI/UX Designer',
    badges: ['Design Expert'],
    location: 'New York, NY',
    joinDate: 'Mar 2023',
    followers: 890,
    following: 210,
    posts: 156,
    isFollowing: true,
  },
  {
    id: 'm3',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Mike Rodriguez',
    username: 'mikero',
    jobTitle: 'DevOps Engineer',
    badges: ['Infrastructure Pro'],
    location: 'Austin, TX',
    joinDate: 'Feb 2023',
    followers: 654,
    following: 178,
    posts: 67,
    isFollowing: false,
  },
  {
    id: 'm4',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Emma Wilson',
    username: 'emmaw',
    jobTitle: 'Product Manager',
    badges: ['Product Leader', 'Community Builder'],
    location: 'Seattle, WA',
    joinDate: 'Apr 2023',
    followers: 1450,
    following: 290,
    posts: 123,
    isFollowing: true,
  },
  {
    id: 'm5',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    name: 'David Lee',
    username: 'davidl',
    jobTitle: 'Data Scientist',
    badges: [],
    location: 'Boston, MA',
    joinDate: 'Oct 2022',
    followers: 720,
    following: 150,
    posts: 42,
    isFollowing: false,
  },
  {
    id: 'm6',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Olivia White',
    username: 'oliviaw',
    jobTitle: 'Content Creator',
    badges: ['Community Builder'],
    location: 'Los Angeles, CA',
    joinDate: 'May 2023',
    followers: 1100,
    following: 300,
    posts: 210,
    isFollowing: true,
  },
])

// Handler for the 'update:followingStatus' event
const handleUpdateFollowingStatus = ({ memberId, newStatus }) => {
  const memberIndex = members.value.findIndex((m) => m.id === memberId)
  if (memberIndex !== -1) {
    // Update the isFollowing status for the specific member
    members.value[memberIndex].isFollowing = newStatus

    // Optionally update followers/following counts based on the action
    if (newStatus) {
      // If now following
      members.value[memberIndex].followers++ // Increment followers for the followed member
    } else {
      // If no longer following
      members.value[memberIndex].followers-- // Decrement followers
    }
    // In a real app, you'd likely also update the current user's 'following' count
    // and send this update to your backend API.
  }
}
</script>

<style scoped>
/* No specific scoped styles needed in Member.vue */
</style>
