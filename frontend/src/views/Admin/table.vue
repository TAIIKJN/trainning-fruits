<template>
  <div class="container mx-auto p-4">
    <div class="mb-4">
      <a-button type="primary" @click="showModal">เพิ่มโต๊ะ</a-button>
    </div>

    <a-table
      :columns="columns"
      :loading="loading"
      :dataSource="categories"
      rowKey="Id"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'State'">
          <a-tag :color="getStateColor(record.State)">
            {{ translateState(record.State) }}
          </a-tag>
        </template>
        <template v-if="column.key === 'actions'">
          <a-space>
            <a-button type="link" @click="handleEdit(record)">แก้ไข</a-button>
            <a-button type="link" danger @click="handleDelete(record.Id)"
              >ลบ</a-button
            >
          </a-space>
        </template>
      </template>
    </a-table>

    <a-modal
      v-model:open="modalVisible"
      :title="isEditing ? 'แก้ไขโต๊ะ' : 'เพิ่มโต๊ะ'"
      @ok="handleOk"
      @cancel="handleCancel"
      :confirmLoading="confirmLoading"
      centered
    >
      <a-form
        :model="formState"
        name="TableForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item label="ชื่อ" name="Name">
          <a-input v-model:value="formState.Name" placeholder="กรอกชื่อโต๊ะ" />
        </a-form-item>

        <a-form-item label="รายละเอียด" name="Description">
          <a-textarea
            v-model:value="formState.Description"
            placeholder="กรอกรายละเอียด"
            :rows="4"
          />
        </a-form-item>
        <a-form-item label="สถานะ" name="State">
          <a-radio-group v-model:value="formState.State">
            <a-radio value="Available">ว่าง</a-radio>
            <a-radio value="Occupied">ไม่ว่าง</a-radio>
            <a-radio value="CleaningProgress">กำลังทําความสะอาด</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from "vue";
import { message, Modal } from "ant-design-vue";
import HttpService from "../../services/HttpService";
import KeycloakService from "../../services/KeycloakService";

const roles = KeycloakService.GetUserRoles();
const isUserRole = roles.includes("admin");

interface TableItem {
  Id: string;
  Name: string;
  Description: string;
  State: string;
}
interface TableForm {
  Id: string | null;
  Name: string;
  Description: string;
  State: string;
}

const formState = reactive<TableForm>({
  Id: null,
  Name: "",
  Description: "",
  State: "Available",
});
const baseColumns = [
  {
    title: "ชื่อ",
    dataIndex: "Name",
    key: "Name",
  },
  {
    title: "รายละเอียด",
    dataIndex: "Description",
    key: "Description",
    ellipsis: true,
  },
  {
    title: "สถานะ",
    dataIndex: "State",
    key: "State",
  },
];
const actionColumn = {
  title: "จัดการ",
  key: "actions",
  width: "150px",
};
const columns = computed(() => {
  return isUserRole ? [...baseColumns, actionColumn] : baseColumns;
});
const categories = ref<TableItem[]>([]);
const loading = ref(false);

const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEditing = ref(false);

const fetchCategories = async () => {
  try {
    loading.value = true;
    const response = await HttpService.getAxiosClient().get("/Table");
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  } finally {
    loading.value = false;
  }
};
const resetForm = () => {
  Object.assign(formState, {
    Id: null,
    Name: "",
    Description: "",
    State: "Available",
  });
};

const showModal = () => {
  isEditing.value = false;
  resetForm();
  modalVisible.value = true;
};
const handleDelete = (id: string) => {
  Modal.confirm({
    title: "ยืนยันการลบ",
    content: "คุณต้องการลบโต๊ะนี้ใช่หรือไม่?",
    okText: "ยืนยัน",
    cancelText: "ยกเลิก",
    async onOk() {
      try {
        await HttpService.getAxiosClient().delete(`/Table/${id}`);
        message.success("ลบโต๊ะสำเร็จ");
        await fetchCategories();
      } catch (error) {
        console.error("Error deleting Table:", error);
        message.error("ไม่สามารถลบข้อมูลได้");
      }
    },
  });
};
const handleEdit = (record: TableItem) => {
  formState.Id = record.Id;
  formState.Name = record.Name;
  formState.Description = record.Description;
  formState.State = record.State;
  isEditing.value = true;
  modalVisible.value = true;
};
const handleOk = async () => {
  try {
    confirmLoading.value = true;
    const payload = {
      Name: formState.Name,
      Description: formState.Description,
      State: formState.State,
    };

    if (isEditing.value && formState.Id !== null) {
      await HttpService.getAxiosClient().patch(
        `/Table/${formState.Id}`,
        payload
      );
      message.success("แก้ไขโต๊ะสำเร็จ");
    } else {
      await HttpService.getAxiosClient().post("/Table", payload);
      message.success("เพิ่มโต๊ะสำเร็จ");
    }
    modalVisible.value = false;
    fetchCategories();
    resetForm();
  } catch (error) {
    console.error("Error saving Table:", error);
    message.error("ไม่สามารถบันทึกข้อมูลได้");
  } finally {
    confirmLoading.value = false;
  }
};

const handleCancel = () => {
  modalVisible.value = false;
  resetForm();
};

const getStateColor = (state: string) => {
    const colors: Record<string, string> = {
        CleaningProgress: 'orange',
        Available: 'green',
        Occupied: 'red',

    };
    return colors[state] || 'blue';
};
const translateState = (state: string): string => {
    switch (state) {
        case 'Available':
            return 'ว่าง';
        case 'Occupied':
            return 'ไม่ว่าง';
        case 'CleaningProgress':
            return 'กำลังทําความสะอาด';
        default:
            return state;
    }
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

onMounted(() => {
  fetchCategories();
});
</script>
