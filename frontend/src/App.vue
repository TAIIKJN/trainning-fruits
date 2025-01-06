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
import { onMounted } from 'vue';
import HttpService from './services/HttpService'

const logout = () => {
  KeycloakService.CallLogOut();
}; 
const checkAndPostCustomer = async () => {
  const userRoles = KeycloakService.GetUserRoles(); 
  if (userRoles.includes('customer')) {
    const tokenData = KeycloakService.GetDecodeToken();
    if (!tokenData || !tokenData.preferred_username) {
      console.error('Token data is invalid or preferred_username is missing.');
      return; 
    }

    const payload = {
      Title: "",
      FirstName: "",
      LastName: "",
      BirthDate: "",
      Email: "",
      UserName: tokenData.preferred_username,
      Address: "",
      City: "",
      Country: "",
      PostalCode: "",
      Notes: "",
      Photo: "",
      PhotoPath: "",
      Role: ""
    };

    try {
      await HttpService.getAxiosClient().post('/Customer', payload);
      console.log('Customer data posted successfully.');
    } catch (error) {
      console.error('Error posting customer data:', error);
    }
  }
};

onMounted(() => {
  checkAndPostCustomer();
});
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