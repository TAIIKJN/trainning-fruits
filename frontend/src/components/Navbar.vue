<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
</template>

<script lang="ts" setup>
import { h, ref, watch } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, ShoppingOutlined   } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import KeycloakService from '../services/KeycloakService';

const router = useRouter();
const route = useRoute();
const userRoles = KeycloakService.GetUserRoles();

const current = ref<string[]>([route.path.substring(1) || 'home']);

const createMenuItem = (key: string, icon: any, label: string, onClick?: () => void, children?: any[]) => ({
  key,
  icon: icon ? () => h(icon) : undefined, // ตรวจสอบว่ามี icon หรือไม่
  label,
  onClick,
  children,
});

const createSubMenuItem = (key: string, label: string, onClick?: () => void) => ({
  key,
  label,
  onClick,
  icon: () => h(ShoppingOutlined), 
});
const baseItems = [
  createMenuItem('home', MailOutlined, 'Home', () => router.push('/home')),
];

const roleBasedItems = [
  userRoles.includes('admin') &&
  createMenuItem('fruits', AppstoreOutlined, 'Fruits', () => router.push('/fruits')),
  
  userRoles.includes('customer') &&
  createMenuItem('customer-menu', UserOutlined, 'Menu', () => router.push('/menu')),
  
  (userRoles.includes('supplier') || userRoles.includes('admin')) &&
  createMenuItem('supplier', AppstoreOutlined, 'Supplier', () => router.push('/supplier')),
  
  (userRoles.includes('supplier') || userRoles.includes('admin')) &&
  createMenuItem('product', SettingOutlined, 'Product', undefined, [
    {
      type: 'group',
      label: 'Product Group',
      children: [
        createSubMenuItem('product-all', 'สินค้าทั้งหมด', () => router.push('/product')),
        createSubMenuItem('product-category', 'ประเภทสินค้า', () => router.push('/category')),
      ],
    },
  ]),
  
  (userRoles.includes('employee') || userRoles.includes('admin')) &&
  createMenuItem('employee', AppstoreOutlined, 'Employee', () => router.push('/employee')),
  
  (userRoles.includes('customer') || userRoles.includes('admin')) &&
  createMenuItem('customer', AppstoreOutlined, 'Customer', () => router.push('/customer')),
].filter(Boolean);

const items = ref([...baseItems, ...roleBasedItems]);

watch(
  () => route.path,
  (newPath) => {
    current.value = [newPath.substring(1) || 'home'];
  }
);
</script>
