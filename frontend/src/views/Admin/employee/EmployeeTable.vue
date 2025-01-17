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
          <a-button type="link" @click="$emit('passwordChange', record)"
            >เปลี่ยนรหัสผ่าน</a-button
          >
          <a-button type="link" danger @click="$emit('delete', record.Id)"
            >ลบ</a-button
          >
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

defineEmits(["edit", "passwordChange", "delete"]);

const STATE_CONFIG = {
  "Checked-In": { label: "เข้างาน", color: "success" },
  "Checked-Out": { label: "ออกงาน", color: "error" },
  Break: { label: "พักเบรก", color: "cyan" },
  OverTime: { label: "OT", color: "orange" },
  Absent: { label: "ขาดงาน", color: "red" },
  PersonalLeave: { label: "ลากิจ", color: "warning" },
  SickLeave: { label: "ลาป่วย", color: "warning" },
  OrdinationLeave: { label: "ลาบวช", color: "purple" },
  Vacation: { label: "ลาพักร้อน", color: "cyan" },
} as const;

const getStateColor = (state: string) => {
  return (
    (STATE_CONFIG as { [key: string]: { color: string } })[state]?.color ||
    "default"
  );
};

const translateState = (state: string) => {
  return (
    (STATE_CONFIG as { [key: string]: { label: string } })[state]?.label ||
    state
  );
};
</script>
