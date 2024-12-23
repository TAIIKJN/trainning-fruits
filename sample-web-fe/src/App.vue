<template>
  <a-layout class="layout">
    <Navbar />
    <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <router-view />
      </div>
    <Footer />
  </a-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const selectedKeys = ref<string[]>(['2']);
</script>

<style scoped>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #fff;
}
</style>
