<template>
  <a-layout class="layout">
    <Navbar v-if="isLoggedIn" />
    <div :style="{ background: '#fff', }">
      <router-view />
   
    </div>
    <Footer />
  </a-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useMainStore } from './store'

const store = useMainStore()
const isLoggedIn = computed(() => store.isLoggedIn)
</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
</style>