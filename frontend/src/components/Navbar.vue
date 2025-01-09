<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
</template>

<script lang="ts" setup>
import { h, ref, watch } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, ShoppingOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import KeycloakService from '../services/KeycloakService';

const router = useRouter();
const route = useRoute();
const userRoles = KeycloakService.GetUserRoles();
const current = ref<string[]>([route.path.substring(1) || 'home']);

// Helper function สำหรับสร้าง menu item
const createItem = (key: string, label: string, icon?: any, children?: any[]) => ({
  key,
  label,
  icon: icon ? () => h(icon) : undefined,
  onClick: () => router.push(`/${key}`),
  ...(children && { children })
});

// กำหนด menu items ตาม role
const items = ref([
  createItem('home', 'Home', MailOutlined),
  
  userRoles.includes('admin') && [
    createItem('fruits', 'Fruits', AppstoreOutlined),
    createItem('order-admin', 'Order', AppstoreOutlined),
    createItem('employee-admin', 'Employee', UserOutlined),
    createItem('customer-admin', 'Customer', AppstoreOutlined),
    createItem('supplier', 'Supplier', AppstoreOutlined),
    {
      ...createItem('product', 'Product', SettingOutlined),
      onClick: undefined,
      children: [{
        type: 'group',
        label: 'Product Group',
        children: [
          { key: 'product-all', label: 'สินค้าทั้งหมด', icon: () => h(ShoppingOutlined), onClick: () => router.push('/product') },
          { key: 'product-category', label: 'ประเภทสินค้า', icon: () => h(ShoppingOutlined), onClick: () => router.push('/category') }
        ]
      }]
    }
  ],

  userRoles.includes('customer') && [
    createItem('menu', 'Menu', UserOutlined),
    createItem('order', 'Order', AppstoreOutlined),
    createItem('customer', 'Customer', AppstoreOutlined) 
  ],

  // Supplier
  (userRoles.includes('supplier')) && [
    createItem('supplier', 'Supplier', AppstoreOutlined),
    createItem('order-supplier', 'Order', AppstoreOutlined),
    {
      ...createItem('product', 'Product', SettingOutlined),
      onClick: undefined,
      children: [{
        type: 'group',
        label: 'Product Group',
        children: [
          { key: 'product-all', label: 'สินค้าทั้งหมด', icon: () => h(ShoppingOutlined), onClick: () => router.push('/product') },
          { key: 'product-category', label: 'ประเภทสินค้า', icon: () => h(ShoppingOutlined), onClick: () => router.push('/category') }
        ]
      }]
    }
  ],

  // Employee
  userRoles.includes('employee') && [
    createItem('employee', 'Employee', UserOutlined),
    createItem('order-employee', 'Order-employee', AppstoreOutlined),
  ]
].flat().filter(Boolean));


watch(() => route.path, (newPath) => {
  current.value = [newPath.substring(1) || 'home'];
});
</script>