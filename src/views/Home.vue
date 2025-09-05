<template>
  <div class="home-view p-0">
    <div class="mb-8 relative overflow-hidden mt-5">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }"
        @mouseenter="stopSlideshow"
        @mouseleave="startSlideshow"
      >
        <div
          v-for="(card, index) in infoCards"
          :key="index"
          :class="`flex-shrink-0 w-1/${cardsToShow} px-2`"
        >
          <InfoCard
            :title="card.title"
            :date="card.date"
            :description="card.description"
            :image-bg="card.imageBg"
          />
        </div>
      </div>

      <button
        @click="prevSlide"
        v-if="infoCards.length > cardsToShow"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-900 bg-opacity-50 text-white p-2 h-8 rounded-full z-10 ml-2 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <el-icon><Back /></el-icon>
      </button>
      <button
        @click="nextSlide"
        v-if="infoCards.length > cardsToShow"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-900 bg-opacity-50 text-white p-2 h-8 rounded-full z-10 mr-2 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <el-icon><Right /></el-icon>
      </button>

      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <span
          v-for="n in Math.ceil(infoCards.length / cardsToShow)"
          :key="`dot-${n - 1}`"
          @click="goToSlide(n - 1)"
          :class="{
            'w-2 h-2 rounded-full bg-white opacity-50 cursor-pointer': true,
            'opacity-100 !bg-purple-500': Math.floor(currentIndex / cardsToShow) === n - 1,
          }"
        ></span>
      </div>
    </div>

    <section class="mb-8">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Latest Posts</h2>
      <div class="space-y-4">
        <PostCard v-for="post in latestPosts" :key="post.id" :post="post" />
        <button
          class="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Show more
        </button>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Recent Activity</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PostCard v-for="activity in recentActivity" :key="activity.id" :post="activity" />
      </div>
      <button
        class="mt-4 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Show more
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import PostCard from '@/components/PostCard.vue'
import InfoCard from '@/components/InfoCard.vue'
import { fakePosts } from '@/services/data/fakePosts'
import { PostService } from '@/services/post.service'
// Configuration for how many cards to show at once
const cardsToShow = 3
const infoCards = ref([
  {
    title: "It's Now Easier Than Ever to Hire the Right Xano Expert",
    date: '06/17/2025',
    description:
      "We've seen a big uptick in businesses scaling their projects with Xano, and many of them are looking for the right experts to help. Our directory of partners has been a solid resource, but we knew we could do more. So...",
    imageBg: 'bg-blue-600',
  },
  {
    title: "We're hiring a Solutions Architect!",
    date: '06/17/2025',
    description:
      "Hey Xano community! We're looking for an amazing Solutions Architect to join our growing team. Ready to help shape the future of visual backend development? Get the full job description and application here.",
    imageBg: 'bg-indigo-600',
  },
  {
    title: 'R1,68 - FL _K',
    date: '05/29/2025',
    description: 'Introduce connect favorite Xanor, you the Xano',
    imageBg: 'bg-purple-600',
  },
  {
    title: 'New Feature Rollout: Enhanced Analytics',
    date: '07/01/2025',
    description:
      'Discover the power of our newly integrated analytics dashboard. Get deeper insights into your community engagement and content performance.',
    imageBg: 'bg-green-600',
  },
  {
    title: 'Community Guidelines Update',
    date: '07/10/2025',
    description:
      "We've revised our community guidelines to foster a more positive and inclusive environment. Please review the updated rules to ensure a harmonious experience for everyone.",
    imageBg: 'bg-red-600',
  },
])

const latestPosts = ref([])
const getNewFeed = async () => {
  try {
    const response = await PostService().getPostContent()
    console.log(response.data.data)
    if (response?.data.statusCode === 200) {
      latestPosts.value = response.data.data
      console.log(latestPosts.value)
    }
  } catch (err) {
    console.log(err.Name)
  }
}
const currentIndex = ref(0)
let slideshowInterval = null

const totalSlides = Math.ceil(infoCards.value.length / cardsToShow)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % totalSlides
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + totalSlides) % totalSlides
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startSlideshow = () => {
  stopSlideshow()
  if (infoCards.value.length > cardsToShow) {
    // Only auto-advance if there are more cards than can be displayed
    slideshowInterval = setInterval(() => {
      nextSlide()
    }, 5000)
  }
}

const stopSlideshow = () => {
  if (slideshowInterval) {
    clearInterval(slideshowInterval)
    slideshowInterval = null
  }
}

onMounted(() => {
  startSlideshow()
  getNewFeed()
})

onUnmounted(() => {
  stopSlideshow()
})

//const latestPosts = ref(fakePosts.slice(0, 3))
const recentActivity = ref(fakePosts.slice(3, 6))
</script>

<style scoped>
/*
  The `w-1/3` class (or w-1/N where N is cardsToShow)
  means each card takes up 1/3 of the flex container's width.
  The outer container should manage its own width.
*/

/* Custom utility for hiding scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
