<template>
  <el-dialog v-model="visible" title="Select Color" width="300">
    <div class="color-picker-container">
      <el-color-picker v-model="selectedColor" show-alpha />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleCancel">Cancel</el-button>
        <el-button type="primary" @click="handleConfirm">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'selectColor'])

const visible = ref(props.modelValue)
const selectedColor = ref('#409EFF')

watch(
  () => props.modelValue,
  (newValue) => {
    visible.value = newValue
  },
)

const handleCancel = () => {
  emit('update:modelValue', false)
}

const handleConfirm = () => {
  emit('selectColor', selectedColor.value)
  emit('update:modelValue', false)
}
</script>

<style scoped>
.color-picker-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
