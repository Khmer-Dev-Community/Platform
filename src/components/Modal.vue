<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click="closeOnBackdrop && close()"
    >
      <div
        class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
        ></div>

        <!-- Modal Panel -->
        <div
          class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg"
          @click.stop
        >
          <!-- Header -->
          <div v-if="$slots.header" class="flex items-center justify-between mb-4">
            <slot name="header"></slot>
            <button
              @click="close()"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <i data-feather="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Content -->
          <div class="mb-6">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="flex justify-end space-x-3">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'

interface Props {
  isOpen: boolean
  closeOnBackdrop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  close: []
}>()

const close = () => {
  emit('close')
}

// Handle escape key
const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    close()
  }
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  },
)

onMounted(() => {})
</script>
