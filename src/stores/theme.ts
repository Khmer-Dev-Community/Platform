// stores/theme.ts
import { defineStore } from 'pinia'

interface ThemeState {
  isDark: boolean // Explicitly define as boolean
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => {
    // 1. Read theme preference from localStorage
    const storedTheme = localStorage.getItem('theme')
    let initialIsDark: boolean

    // 2. Determine the initial boolean state for isDark
    if (storedTheme === 'dark') {
      initialIsDark = true
    } else if (storedTheme === 'light') {
      initialIsDark = false
    } else {
      // 3. If no theme is stored, default to system preference (e.g., OS dark mode setting)
      initialIsDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      // Optionally, you might want to save this default to localStorage immediately
      localStorage.setItem('theme', initialIsDark ? 'dark' : 'light')
    }
    if (initialIsDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    return {
      isDark: initialIsDark,
    }
  },
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      const themeToSet = this.isDark ? 'dark' : 'light'
      this.setTheme(themeToSet) // Use setTheme to apply and save
    },
    setTheme(theme: 'light' | 'dark') {
      this.isDark = theme === 'dark'
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('theme', theme)
    },
  },
})
