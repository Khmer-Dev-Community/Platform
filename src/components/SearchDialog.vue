<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-[#ffffffd9] dark:bg-[#101828d4] bg-opacity-75 md:bg-opacity-50 flex items-start justify-center z-[999]"
      @click.self="closeDialog"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mt-20 p-6 relative transform transition-all duration-300 ease-out scale-95 opacity-0"
        :class="{ 'scale-100 opacity-100': isVisible }"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-dialog-title"
        tabindex="-1"
      >
        <h2 id="search-dialog-title" class="sr-only">Search Biosynthesis</h2>

        <div class="relative mb-4">
          <input
            ref="searchInput"
            v-model="searchTermInternal"
            @input="emitSearch"
            @keydown.esc="closeDialog"
            @keydown.enter="performSearch"
            type="search"
            placeholder="Type to search..."
            class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 py-3 pl-12 pr-4 text-lg text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            aria-label="Search input"
          />
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <i class="fas fa-search text-xl"></i>
          </span>
        </div>

        <div v-if="searchTermInternal" class="text-gray-600 dark:text-gray-300">
          <p>Searching for: "{{ searchTermInternal }}"</p>
        </div>
        <div v-else class="text-gray-400 dark:text-gray-500 text-center py-8">
          Start typing to find topics and discussions.
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  searchTerm: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:searchTerm', 'close', 'search'])

const searchInput = ref(null)
const searchTermInternal = ref(props.searchTerm)

// Watch for external changes to searchTerm prop
watch(
  () => props.searchTerm,
  (newValue) => {
    searchTermInternal.value = newValue
  },
)

// Watch for visibility changes to focus input and reset search term
watch(
  () => props.isVisible,
  (newVal) => {
    if (newVal) {
      // Reset search term when dialog opens
      searchTermInternal.value = ''
      emit('update:searchTerm', '')

      // Use nextTick to ensure the input is rendered before focusing
      setTimeout(() => {
        // Using setTimeout as nextTick might not be enough for transition
        searchInput.value?.focus()
      }, 100) // Small delay to allow transition to complete
    }
  },
)

const emitSearch = () => {
  emit('update:searchTerm', searchTermInternal.value)
}

const closeDialog = () => {
  emit('close')
  searchTermInternal.value = '' // Clear search term on close
  emit('update:searchTerm', '')
}

const performSearch = () => {
  // Logic for what happens when Enter is pressed
  // You might navigate to a search results page or filter a list in the parent
  emit('search', searchTermInternal.value)
  // Optionally close dialog after search
  // closeDialog();
}

onMounted(() => {
  // Add global event listener for Escape key to close dialog
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && props.isVisible) {
      closeDialog()
    }
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Specific transition for the modal content itself (scale and opacity) */
.fade-enter-active .transform,
.fade-leave-active .transform {
  transition:
    transform 0.3s ease-out,
    opacity 0.3s ease-out;
}
.fade-enter-from .transform,
.fade-leave-to .transform {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}
.fade-enter-to .transform,
.fade-leave-from .transform {
  transform: translateY(0) scale(1);
  opacity: 1;
}
</style>
