<template>
    <a-table
      :columns="columns"
      :loading="loading"
      :dataSource="dataSource"
      rowKey="Id"
      :scroll="{ x: 1300, y: 1000 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'State'">
          <a-tag :color="getStateColor(record.State)">
            {{ translateState(record.State) }}
          </a-tag>
        </template>
        <template v-if="column.key === 'actions'">
          <a-space>
            <a-button type="link" @click="$emit('edit', record)">แก้ไข</a-button>
            <a-button type="link" @click="$emit('passwordChange', record)">เปลี่ยนรหัสผ่าน</a-button>
            <a-button type="link" danger @click="$emit('delete', record.Id)">ลบ</a-button>
          </a-space>
        </template>
        <template v-else-if="column.key === 'fullName'">
          {{ record.Title }} {{ record.FirstName }} {{ record.LastName }}
        </template>
      </template>
    </a-table>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    loading: boolean;
    dataSource: any[];
    columns: any[];
  }>();
  
  defineEmits(['edit', 'passwordChange', 'delete']);
  
  const getStateColor = (state: string) => ({
    'Checked-In': 'success',
    'Checked-Out': 'error',
    'On-Leave': 'warning'
  }[state] || 'default');
  
  const translateState = (state: string) => ({
    'Checked-In': 'เข้างาน',
    'Checked-Out': 'ออกงาน',
    'On-Leave': 'ลางาน'
  }[state] || state);
  </script>