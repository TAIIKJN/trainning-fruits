<template>
  <a-modal
    :open="modelValue"
    :title="getModalTitle"
    @ok="handleOk"
    @cancel="handleCancel"
    :confirmLoading="confirmLoading"
    centered
  >
    <a-form :model="formState">
      <a-form-item label="เลือกพนักงาน" required>
        <a-select
          v-model:value="formState.selectedEmployee"
          placeholder="เลือกพนักงาน"
          :options="availableEmployees"
          :fieldNames="{ label: 'fullName', value: 'Id' }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{
  modelValue: boolean;
  employees: any[];
  leaveType: string;
  confirmLoading?: boolean;
}>();

const emit = defineEmits(["update:modelValue", "update", "cancel"]);

const formState = ref({
  selectedEmployee: undefined,
});

const STATE_LABELS = {
  Break: "พักเบรก",
  OverTime: "OT",
  Absent: "ขาดงาน",
  PersonalLeave: "ลากิจ",
  SickLeave: "ลาป่วย",
  OrdinationLeave: "ลาบวช",
  Vacation: "ลาพักร้อน",
} as const;

const getModalTitle = computed(() => {
  const leaveType = props.leaveType as keyof typeof STATE_LABELS;
  return `เพิ่มพนักงาน${STATE_LABELS[leaveType] || props.leaveType}`;
});

const availableEmployees = computed(() => {
  return props.employees
    .filter((emp) => emp.State === "Checked-Out" || emp.State === "Checked-In")
    .map((emp) => ({
      ...emp,
      fullName: `${emp.Title || ""} ${emp.FirstName} ${emp.LastName}`.trim(),
    }));
});
const resetForm = () => {
  formState.value.selectedEmployee = undefined;
};
const handleOk = () => {
  if (!formState.value.selectedEmployee) {
    return;
  }

  const selectedEmployee = props.employees.find(
    (emp) => emp.Id === formState.value.selectedEmployee
  );
  if (selectedEmployee) {
    emit("update", {
      ...selectedEmployee,
      State: props.leaveType,
    });
    resetForm();
  }
  emit("update:modelValue", false);
};
const handleCancel = () => {
  resetForm();
  emit("update:modelValue", false);
};
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      resetForm();
    }
  }
);
</script>
