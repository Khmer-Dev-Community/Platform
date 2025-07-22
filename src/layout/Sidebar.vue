<template>
  <el-aside
    class="flex flex-col min-h-[90vh] bg-white dark:bg-gray-700 dark:text-white rounded-md space-y-1 p-2 w-full -ml-5 text-gray-700 text-sm font-normal select-none"
  >
    <SidebarNavItem v-for="item in HomeNavItems" :key="item.text" :item="item" />
    <el-title class="text-base font-semibold" tag="b"> Welcome</el-title>
    <SidebarNavItem v-for="item in WelcomNavItems" :key="item.text" :item="item" />
    <el-title class="text-base font-semibold" tag="b"> Community</el-title>
    <SidebarNavItem v-for="item in communityNavItems" :key="item.text" :item="item" />
    <el-title class="text-base font-semibold" tag="b"> Product Updates</el-title>
    <SidebarNavItem v-for="item in releaseNavItems" :key="item.text" :item="item" />

    <el-title class="text-base font-semibold mt-4" tag="b"> Popular Tags</el-title>
  </el-aside>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import SidebarNavItem from './SidebarNavItem.vue'

const props = defineProps({
  navItems: {
    type: Array,
    required: true,
  },
})
const HomeNavItems = computed(() => {
  return props.navItems.filter((item) => item.tag === 'home')
})
const WelcomNavItems = computed(() => {
  return props.navItems.filter((item) => item.tag === 'welcome')
})
// Computed property to filter navItems for 'community' tag
const communityNavItems = computed(() => {
  return props.navItems.filter((item) => item.tag === 'community')
})

// Computed property to filter navItems for 'release' tag
const releaseNavItems = computed(() => {
  return props.navItems.filter((item) => item.tag === 'release')
})
</script>
