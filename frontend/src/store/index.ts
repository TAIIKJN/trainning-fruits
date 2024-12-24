import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    login() {
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
    }
  }
})