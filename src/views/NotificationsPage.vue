<template>
  <div class="notifications-page dark:bg-gray-900 min-h-screen p-1 md:p-1">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">Notifications</h1>
      <div class="flex items-center space-x-4">
        <button
          class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center"
        >
          <i class="fas fa-check mr-2"></i> Mark all as read
        </button>
        <button
          class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          <i class="fas fa-cog"></i>
        </button>
      </div>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
      <div class="text-6xl text-gray-400 dark:text-gray-600 mb-4">
        <i class="fas fa-inbox"></i>
      </div>
      <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Nothing here!</h2>
      <p class="text-gray-600 dark:text-gray-400">You don't have any notifications.</p>
    </div>
  </div>
</template>

<script setup>
// In a real application, you would fetch and display notifications here.
// This page currently represents the "no notifications" state.
</script>

<style scoped>
/* Any specific styles for this page can be added here */
</style>
