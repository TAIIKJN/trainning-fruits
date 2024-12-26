<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
</template>

<script lang="ts" setup>
import { h, ref, watch } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const current = ref<string[]>([route.path.substring(1) || 'home']);

// @ts-ignore
const items = ref<MenuProps['items']>([
  {
    key: 'home',
    icon: () => h(MailOutlined),
    label: 'Home',
    onClick: () => router.push('/home'),
  },
  {
    key: 'fruits',
    icon: () => h(AppstoreOutlined),
    label: 'Fruits',
    onClick: () => router.push('/fruits'),
  },
  {
    key: 'supplier',
    icon: () => h(AppstoreOutlined),
    label: 'Supplier',
    onClick: () => router.push('/supplier'),
  },
  {
    key: 'product',
    icon: () => h(SettingOutlined),
    label: 'Product',
    children: [
      {
        type: 'group',
        label: 'Product Group ',
        children: [
          {
            label: 'สินค้าทั้งหมด',
            key: 'product-all',
            onClick: () => router.push('/product'),
          },
          {
            label: 'ประเภทสินค้า',
            key: 'product-category',
            onClick: () => router.push('/category'),
          },
        ],
      },
    
    ],
  },
  {
    key: 'employee',
    icon: () => h(SettingOutlined),
    label: 'Employee',
    onClick: () => router.push('/employee'),
  },
  {
    key: 'customer',
    icon: () => h(SettingOutlined),
    label: 'Customer',
    onClick: () => router.push('/customer'),
  }
]);

watch(
  () => route.path,
  (newPath) => {
    const path = newPath.substring(1) || 'home';
    current.value = [path];
  }
);
</script>