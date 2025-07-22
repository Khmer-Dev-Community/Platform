<template>
  <div class="events-page dark:bg-gray-900 min-h-screen p-1 md:p-1">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center">
        <div class="bg-orange-500 text-white p-3 rounded-lg mr-2 h-[45px]">
          <i class="fas fa-calendar-alt text-xl"></i>
        </div>
        <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">Events</h1>
      </div>
      <div class="flex items-center space-x-4">
        <button
          class="bg-transparent border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-md font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
        >
          <i class="fas fa-check-circle mr-2"></i> Joined
        </button>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <i class="fas fa-arrow-right-from-bracket"></i>
        </button>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>
    </div>

    <div class="flex border-b border-gray-200 dark:border-gray-700 mb-6">
      <button
        @click="activeTab = 'upcoming'"
        :class="{
          'px-4 py-2 text-sm font-medium transition-colors duration-200': true,
          'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400': activeTab === 'upcoming',
          'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200':
            activeTab !== 'upcoming',
        }"
      >
        Upcoming events
      </button>
      <button
        @click="activeTab = 'past'"
        :class="{
          'px-4 py-2 text-sm font-medium transition-colors duration-200': true,
          'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400': activeTab === 'past',
          'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200':
            activeTab !== 'past',
        }"
      >
        Past events
      </button>
    </div>

    <div
      v-if="activeTab === 'upcoming'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="event in upcomingEvents"
        :key="event.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <router-link :to="`/event/post/${event.id}`">
          <div
            class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative h-32 flex items-end"
          >
            <div
              class="absolute -bottom-10 -right-10 w-24 h-24 bg-white opacity-10 rounded-full"
            ></div>
            <div class="absolute -top-5 left-10 w-16 h-16 bg-white opacity-10 rounded-full"></div>
            <h3 class="text-xl font-bold">{{ event.title }}</h3>
          </div>
          <div class="p-6">
            <p class="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
              {{ event.subtitle }}
            </p>
            <p class="text-gray-800 dark:text-gray-100 font-semibold mb-3">
              {{ event.sessionName }}
            </p>
            <div class="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
              <i class="fas fa-calendar-alt mr-2"></i> {{ event.date }}, {{ event.time }}
            </div>
            <p class="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
              {{ event.description }}
            </p>
            <button
              class="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              {{ event.buttonText }}
            </button>
          </div>
        </router-link>
      </div>
      <p
        v-if="upcomingEvents.length === 0"
        class="text-center text-gray-500 dark:text-gray-400 col-span-full py-8"
      >
        No upcoming events found.
      </p>
    </div>

    <div
      v-else-if="activeTab === 'past'"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="event in pastEvents"
        :key="event.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden opacity-70"
      >
        <div
          class="bg-gradient-to-r from-gray-500 to-gray-700 p-6 text-white relative h-32 flex items-end"
        >
          <h3 class="text-xl font-bold">{{ event.title }}</h3>
        </div>
        <div class="p-6">
          <p class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
            {{ event.subtitle }}
          </p>
          <p class="text-gray-800 dark:text-gray-100 font-semibold mb-3">{{ event.sessionName }}</p>
          <div class="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
            <i class="fas fa-calendar-alt mr-2"></i> {{ event.date }}, {{ event.time }}
          </div>
          <p class="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {{ event.description }}
          </p>
          <button
            class="w-full bg-gray-400 text-white py-2 rounded-md font-semibold cursor-not-allowed"
          >
            View Details
          </button>
        </div>
      </div>
      <p
        v-if="pastEvents.length === 0"
        class="text-center text-gray-500 dark:text-gray-400 col-span-full py-8"
      >
        No past events found.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('upcoming')

const upcomingEvents = ref([
  {
    id: 1,
    title: 'Office Hours & Orientation',
    subtitle: 'Free Weekly Sessions',
    sessionName: 'Orientation + Office Hours',
    date: 'Wed, Jul 30',
    time: '12:00am',
    description:
      "Whether you're new to KH Community & want to learn how to get started, or you need help with a specific issue with a project you're building in KH Community, we've got you covered! Join us on these free weekly sessions.",
    buttonText: 'RSVP',
  },
  {
    id: 2,
    title: 'Office Hours & Orientation',
    subtitle: 'Free Weekly Sessions',
    sessionName: 'Orientation + Office Hours',
    date: 'Wed, Aug 6',
    time: '12:00am',
    description:
      "Whether you're new to KH Community & want to learn how to get started, or you need help with a specific issue with a project's building in KH Community, we've got you covered! Join us on these free weekly sessions.",
    buttonText: 'RSVP',
  },
  {
    id: 3,
    title: 'Advanced KH Community Workflows',
    subtitle: 'Expert Series',
    sessionName: 'Optimizing Database Queries',
    date: 'Mon, Aug 11',
    time: '02:00pm',
    description:
      'Dive deep into optimizing your KH Community database queries for maximum performance and efficiency. Learn advanced techniques and best practices from KH Community experts.',
    buttonText: 'Register',
  },
])

const pastEvents = ref([
  {
    id: 101,
    title: 'Getting Started with KH Community',
    subtitle: 'Introductory Workshop',
    sessionName: 'KH Community Basics',
    date: 'Wed, Jul 23', // Past date relative to current time
    time: '10:00am',
    description:
      'A comprehensive workshop for beginners to understand the core concepts of KH Community and build their first backend. This session covered API endpoints, database, and functions.',
    buttonText: 'View Recording',
  },
  {
    id: 102,
    title: 'Build a Mobile App Backend',
    subtitle: 'Development Series',
    sessionName: 'Authentication & User Profiles',
    date: 'Wed, Jul 16',
    time: '03:00pm',
    description:
      'Learn how to set up robust authentication and manage user profiles using KH Community for your mobile applications. This session included JWT implementation and secure data handling.',
    buttonText: 'View Recording',
  },
])
</script>

<style scoped>
/*
  Custom line-clamp utility for description.
  Alternatively, you can use Tailwind's @tailwindcss/line-clamp plugin if installed.
*/
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
