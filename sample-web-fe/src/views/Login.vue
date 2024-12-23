<template>
    <div class="login-container">
      <a-form @submit="handleSubmit">
        <a-form-item>
          <a-input v-model="username" placeholder="Username" />
        </a-form-item>
        <a-form-item>
          <a-input v-model="password" type="password" placeholder="Password" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">Login</a-button>
        </a-form-item>
      </a-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMainStore } from '../store'
  
  const router = useRouter()
  const store = useMainStore()
  const username = ref('')
  const password = ref('')
  
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    store.isLoggedIn = true
    router.push('/home')
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 50px;
  }
  </style>