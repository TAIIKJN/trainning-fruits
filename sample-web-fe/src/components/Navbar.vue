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
    key: 'products',
    icon: () => h(AppstoreOutlined),
    label: 'Products',
    onClick: () => router.push('/products'),
  },
  {
    key: 'settings',
    icon: () => h(SettingOutlined),
    label: 'Settings',
    children: [
      {
        type: 'group',
        label: 'Settings Group 1',
        children: [
          {
            label: 'Setting 1',
            key: 'setting:1',
            onClick: () => router.push('/setting/1'),
          },
          {
            label: 'Setting 2',
            key: 'setting:2',
            onClick: () => router.push('/setting/2'),
          },
        ],
      },
      {
        type: 'group',
        label: 'Settings Group 2',
        children: [
          {
            label: 'Setting 3',
            key: 'setting:3',
            onClick: () => router.push('/setting/3'),
          },
          {
            label: 'Setting 4',
            key: 'setting:4',
            onClick: () => router.push('/setting/4'),
          },
        ],
      },
    ],
  },
]);

// อัพเดท selected key เมื่อ route เปลี่ยน
watch(
  () => route.path,
  (newPath) => {
    const path = newPath.substring(1) || 'home';
    current.value = [path];
  }
);
</script>