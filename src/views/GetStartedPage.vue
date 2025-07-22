<template>
  <div class="get-started-page p-1 md:p-1 bg-gray-100 dark:bg-gray-900 min-h-screen">
    <div
      class="bg-blue-600 dark:bg-gray-700 rounded-lg p-6 md:p-8 shadow-md mb-8 relative overflow-hidden"
    >
      <div
        class="absolute top-0 right-0 w-24 h-24 bg-blue-700 dark:bg-blue-900 rounded-bl-full opacity-30"
      ></div>
      <h1 class="text-white text-3xl md:text-4xl font-bold mb-3">Welcome to the The Community!</h1>
      <p class="text-white text-lg mb-6 max-w-2xl">
        The ultimate place to find support, connection with fellow users, and stay up-to-date with
        all things .
      </p>
      <button
        class="bg-white dark:bg-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-200 shadow-lg"
      >
        Introduce yourself
      </button>
    </div>

    <div
      class="bg-white dark:bg-gray-800 rounded-lg p-6 md:p-8 shadow-md text-gray-800 dark:text-gray-100"
    >
      <p class="mb-6 leading-relaxed">
        Our aim is to foster a supportive and productive environment where builders of all levels
        can share knowledge, solve problems, and discuss technical topics related to Community. To
        ensure a great experience for everyone, please follow these simple guidelines:
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        1. Introduce Yourself! (Your First Step)
      </h2>
      <p class="mb-4 pl-4 border-l-4 border-blue-500 dark:border-blue-600">
        Welcome aboard! We’re excited to have you here. The best way to get started and connect with
        others is by heading over to the
        <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >introductions space</a
        >.
      </p>
      <p class="mb-6">
        Tell us a bit about yourself, what you’re building (or hope to build!) with Community, and
        what you’re hoping to learn or share in the community.
      </p>

      <h2 class="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        2. Community Guidelines & Best Practices
      </h2>
      <p class="mb-4">
        Once you’ve introduced yourself, keep these points in mind as you explore and participate:
      </p>

      <div class="mb-6 pl-4">
        <div class="flex items-start mb-3">
          <i class="fas fa-search text-purple-500 mr-3 mt-1"></i>
          <div>
            <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Search First</h3>
            <p class="text-gray-700 dark:text-gray-300">
              There’s a wealth of knowledge already here! Before posting a new question, please use
              the search bar.
            </p>
          </div>
        </div>

        <div class="flex items-start mb-3">
          <i class="fas fa-question-circle text-red-500 mr-3 mt-1"></i>
          <div>
            <h3 class="font-semibold text-lg text-gray-900 dark:text-white">Ask Effectively</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-2">
              Need help? Let’s get you the <em class="font-italic">right</em> help quickly! When
              posting a question:
            </p>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 ml-4">
              <li>Use a clear and descriptive title.</li>
              <li>Provide context: What are you trying to achieve?</li>
              <li>Explain what you’ve already tried.</li>
              <li>
                Include relevant details (screenshots, error messages, relevant setup) but
                <strong class="font-bold">avoid sharing sensitive data</strong>.
              </li>
            </ul>
          </div>
        </div>

        <div class="flex items-start mb-3">
          <i class="fas fa-heart text-yellow-500 mr-3 mt-1"></i>
          <div>
            <h3 class="font-semibold text-lg text-gray-900 dark:text-white">
              Be Helpful and Respectful
            </h3>
            <p class="text-gray-700 dark:text-gray-300">
              Offer clear, concise answers. If a question is unclear, ask for more information
              politely. Treat all members with respect. No trolling, belittling, or personal
              attacks. Remember, we’re all here to learn and build together.
            </p>
          </div>
        </div>
      </div>

      <h2 class="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        Ready to Dive In?
      </h2>
      <ul class="list-disc list-inside text-gray-800 dark:text-gray-100 mb-6 pl-4">
        <li class="mb-2">
          <strong class="font-semibold">Ask or Answer:</strong> Head to the
          <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >Get Help</a
          >
          or
          <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >Discuss</a
          >
          spaces.
        </li>
        <li>
          <strong class="font-semibold">Need Official Docs?</strong> For detailed product
          information, visit the
          <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Documentation</a
          >.
        </li>
      </ul>

      <p class="text-lg text-gray-700 dark:text-gray-300">
        We’re glad you’re here. Happy building!
      </p>
    </div>
  </div>
</template>

<script setup>
// No specific reactive data or methods are needed for this static content page.
// If links were dynamic or content fetched, you'd add script logic here.
</script>

<style scoped>
/* Add any specific styles if needed, though Tailwind classes should handle most */
/* For example, if you wanted custom list item markers or unique font treatments */
</style>
