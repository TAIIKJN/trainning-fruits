<template>
  <a-layout class="layout">
    <Navbar  />
    <div class="relative bg-white">
      <div class="absolute top-4 right-4 z-50">
        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" @click="logout">ออกจากระบบ</button>
      </div>
      <router-view />
    </div>
    <Footer />
  </a-layout>
</template>

<script lang="ts" setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import KeycloakService from './services/KeycloakService';

const logout = () => {
  KeycloakService.CallLogOut();
}; 

</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.content {
  background: #fff;
  padding: 24px;
  position: relative;
}

.logout-button-container {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
}

.logout-button {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  color: #fff;
}

.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}
</style>