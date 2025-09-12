<template>
  <el-aside
    width="250px"
    class="flex hidden flex-col min-h-[90vh] bg-white dark:bg-gray-700 dark:text-white rounded-md space-y-1 p-2 -ml-5 text-gray-700 text-sm font-normal select-none"
  >
    <SidebarNavItem v-for="item in HomeNavItems" :key="item.text" :item="item" />
    <el-title v-if="$isLoggedIn" class="text-base font-semibold" tag="b"> Welcome</el-title>
    <span v-if="$isLoggedIn">
      <SidebarNavItem v-for="item in WelcomNavItems" :key="item.text" :item="item" class="mt-១"
    /></span>

    <el-title class="text-base font-semibold" tag="b"> Community</el-title>
    <SidebarNavItem v-for="item in communityNavItems" :key="item.text" :item="item" />

    <el-title class="text-base font-semibold" tag="b"> Product Updates</el-title>
    <SidebarNavItem v-for="item in releaseNavItems" :key="item.text" :item="item" />

    <el-title class="text-base font-semibold mt-4" tag="b"> Popular Tags</el-title>
  </el-aside>
</template>

<script setup>
import { defineProps, computed, getCurrentInstance } from 'vue'
import SidebarNavItem from './SidebarNavItem.vue'
import { useUserStore } from '@/stores/module/users'
const userStore = useUserStore()
const $isLoggedIn = computed(() => userStore.isLogged)
// Avoid using getCurrentInstance and proxy in production if possible.
// A better practice is to pass a user data prop directly.
const instance = getCurrentInstance()
const proxy = instance.proxy

const props = defineProps({
  navItems: {
    // Renamed from navItem for better clarity
    type: Array,
    required: true,
  },
})

const filteredNavItems = computed(() => {
  // Check if $userData exists and has an ID
  if (!userStore.isLogged || !userStore.userData.id) {
    return props.navItems.filter((item) => item.route !== '@me')
  }
  return props.navItems
})

const HomeNavItems = computed(() => {
  return filteredNavItems.value.filter((item) => item.tag === 'home')
})
const WelcomNavItems = computed(() => {
  return filteredNavItems.value.filter((item) => item.tag === 'welcome')
})
// Computed property to filter navItems for 'community' tag
const communityNavItems = computed(() => {
  return filteredNavItems.value.filter((item) => item.tag === 'community')
})

// Computed property to filter navItems for 'release' tag
const releaseNavItems = computed(() => {
  return filteredNavItems.value.filter((item) => item.tag === 'release')
})
</script>
