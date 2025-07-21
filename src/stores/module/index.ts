export default {
  install(app: any) {
    app.config.globalProperties.$isLoggedIn = false // Add the function to global properties
  },
}
