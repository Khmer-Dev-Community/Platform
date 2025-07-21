<template>
  <el-aside
    width="250px"
    class="shadow flex flex-col h-[90vh] bg-white dark:bg-gray-700 dark:text-white rounded-md space-y-5 p-4 w-full -ml-5 text-gray-700 text-sm font-normal select-none"
  >
    <SidebarNavItem v-for="item in navItems" :key="item.text" :item="item"
  /></el-aside>
</template>

<script setup>
import SidebarNavItem from './SidebarNavItem.vue'

defineProps({
  navItems: {
    type: Array,
    required: true,
  },
})
</script>
