<template>
  <div class="container mx-auto p-0 w-74 h-[90vh]">
    <h1 class="text-base font-bold mb-2">Recent Posts</h1>
    <div class="space-y-3 text-sm">
      <!-- Post 1 -->
      <div class="bg-white p-2 rounded-lg shadow text-sm">
        <div class="flex items-center mb-2">
          <span
            class="inline-flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mr-2"
          >
            <span class="text-orange-600 font-bold">B</span>
          </span>
          <span class="text-gray-600">r/bitcoin · 12 yr. ago</span>
        </div>
        <p class="text-gray-800 text-sm">
          Disprove Me: How I Figured Out Who Satoshi Nakamoto Is In Less Than 14...
        </p>
        <div class="text-sm text-gray-500 mt-2">12 upvotes · 78 comments</div>
      </div>

      <!-- Post 2 -->
      <div class="bg-white p-2 rounded-lg shadow">
        <div class="flex items-center mb-2">
          <span
            class="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mr-2"
          >
            <span class="text-blue-600 font-bold">P</span>
          </span>
          <span class="text-gray-600">r/PWA · 5 yr. ago</span>
        </div>
        <p class="text-gray-800">
          My PWA sometimes shows the little Chrome icon when added to the Home...
        </p>
        <div class="text-sm text-gray-500 mt-2">12 upvotes · 2 comments</div>
      </div>

      <!-- Post 3 -->
      <div class="bg-white p-2 rounded-lg shadow">
        <div class="flex items-center mb-2">
          <span
            class="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-2"
          >
            <span class="text-green-600 font-bold">S</span>
          </span>
          <span class="text-gray-600">r/selfhosted · 12 days ago</span>
        </div>
        <p class="text-gray-800">Open source Web client for the Jellyfin and Arr</p>
        <div class="text-sm text-gray-500 mt-2">1 upvote</div>
      </div>

      <!-- Post 4 -->
      <div class="bg-white p-2 rounded-lg shadow">
        <div class="flex items-center mb-2">
          <span
            class="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-2"
          >
            <span class="text-green-600 font-bold">S</span>
          </span>
          <span class="text-gray-600">r/selfhosted · 11 days ago</span>
        </div>
        <p class="text-gray-800">Advice on home server/has build</p>
        <div class="text-sm text-gray-500 mt-2">1 upvote · 4 comments</div>
      </div>

      <!-- Post 5 -->
      <div class="bg-white p-2 rounded-lg shadow">
        <div class="flex items-center mb-2">
          <span
            class="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-2"
          >
            <span class="text-green-600 font-bold">S</span>
          </span>
          <span class="text-gray-600">r/selfhosted · 8 days ago</span>
        </div>
        <p class="text-gray-800">Cross-Platform Grafana Alloy Quickstart: One-Command...</p>
        <div class="text-sm text-gray-500 mt-2">2 comments</div>
      </div>

      <!-- Post 6 -->
      <div class="bg-white p-2 rounded-lg shadow">
        <div class="flex items-center mb-2">
          <span
            class="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mr-2"
          >
            <span class="text-green-600 font-bold">S</span>
          </span>
          <span class="text-gray-600">r/selfhosted · 9 days ago</span>
        </div>
        <p class="text-gray-800">Iso -> a super minimal dashboard with isometric icons</p>
        <div class="text-sm text-gray-500 mt-2">12 upvotes · 46 comments</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostFeed',
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
