<template>
  <div class="px-6 p-4 mt-12">
    <a-table
      :columns="columns"
      :loading="loading"
      :dataSource="customer"
      rowKey="Id"
      :scroll="{ x: 1300, y: 1000 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'fullName'">
          {{ record.Title }} {{ record.FirstName }} {{ record.LastName }}
        </template>

        <template v-if="column.key === 'actions'">
          <a-space>
            <a-button type="link" @click="handlePasswordChange(record)"
              >เปลี่ยนรหัสผ่าน</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>

      <!-- Password Change Modal -->
      <a-modal
    v-model:open="passwordModalVisible"
    title="เปลี่ยนรหัสผ่าน"
    @ok="handlePasswordOk"
    @cancel="handlePasswordCancel"
    :confirmLoading="passwordConfirmLoading"
    centered
  >
    <a-form
      :model="passwordForm"
      name="passwordForm"
      @finish="onPasswordFinish"
      @finishFailed="onPasswordFinishFailed"
      :rules="passwordFormRules"
    >
      <a-form-item
        name="Password"
        label="รหัสผ่านใหม่"
        :rules="[
          { required: true, message: 'กรุณากรอกรหัสผ่านใหม่' },
          { min: 4, message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร' },
        ]"
      >
        <a-input
          v-model:value="passwordForm.Password"
          placeholder="กรอกรหัสผ่านใหม่"
          type="password"
        />
      </a-form-item>

      <a-form-item
        name="confirmNewPassword"
        label="ยืนยันรหัสผ่านใหม่"
        :rules="[
          { required: true, message: 'กรุณายืนยันรหัสผ่านใหม่' },
          { validator: validateConfirmPassword },
        ]"
      >
        <a-input
          v-model:value="passwordForm.confirmNewPassword"
          placeholder="กรอกยืนยันรหัสผ่านใหม่"
          type="password"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { message } from "ant-design-vue";
import HttpService from "../../services/HttpService";
import KeycloakService from "../../services/KeycloakService";

interface CustomerData {
  Id?: string;
  Title: string | null;
  FirstName: string;
  LastName: string;
  BirthDate: string;
  Email: string;
  UserName: string;
  Address: string;
  City: string | null;
  Country: string;
  PostalCode: string;
  Notes: string;
  Photo: string;
  PhotoPath: string;
  Password: string;
  ConfirmPassword: string;
  Role: string;
}
interface PasswordForm {
  Password: string;
  confirmNewPassword: string;
  customerId?: string;
}
interface FormValidationError {
  values: any;
  errorFields: {
    name: (string | number)[];
    errors: string[];
  }[];
  outOfDate: boolean;
}
const passwordModalVisible = ref(false);
const passwordConfirmLoading = ref(false);
const passwordForm = reactive<PasswordForm>({
  Password: "",
  confirmNewPassword: "",
  customerId: undefined,
});
const customer = ref<CustomerData[]>([]);
const loading = ref(false);

const columns = [
  { title: "ชื่อ-นามสกุล", key: "fullName", width: 150, fixed: "left" },
  { title: "ชื่อผู้ใช้", dataIndex: "UserName", key: "userName" },
  { title: "อีเมล", dataIndex: "Email", key: "email" },
  { title: "ที่อยู่", dataIndex: "Address", key: "address" },
  { title: "วันเกิด", dataIndex: "BirthDate", key: "birthDate" },
  { title: "เมือง", dataIndex: "City", key: "city" },
  { title: "รหัสไปรษณีย์", dataIndex: "PostalCode", key: "postalCode" },
  { title: "ประเทศ", dataIndex: "Country", key: "country" },
  { title: "หมายเหตุ", dataIndex: "Notes", key: "notes", ellipsis: true },
  { title: "จัดการ", key: "actions", fixed: "right", width: 150 },

];

const fetchCustomer = async () => {
  try {
    loading.value = true;

    const decodedToken = KeycloakService.GetDecodeToken();
    const currentUsername = decodedToken?.preferred_username;

    if (!currentUsername) {
      message.warning("ไม่สามารถระบุตัวตนของผู้ใช้ได้");
      return;
    }

    const { data } = await HttpService.getAxiosClient().get("/Customer");

    const customerData = data.find(
      (customer: { UserName: string }) => customer.UserName === currentUsername
    );

    if (!customerData) {
      message.warning("ไม่พบข้อมูลลูกค้า");
      return;
    }
    customer.value = [customerData];
    console.log("Customer data:", customer.value);
  } catch (error) {
    console.error("Error fetching customer:", error);
    message.error("ไม่สามารถดึงข้อมูลได้");
  } finally {
    loading.value = false;
  }
};

const handlePasswordChange = (record: CustomerData) => {
  passwordForm.customerId = record.Id;
  passwordForm.Password = "";
  passwordForm.confirmNewPassword = "";
  passwordModalVisible.value = true;
};

const handlePasswordOk = async () => {
  if (await validatePasswordForm()) {
    await updatePassword();
  }
};

const validatePasswordForm = async (): Promise<boolean> => {
  if (!passwordForm.Password || !passwordForm.confirmNewPassword) {
    message.error("กรุณากรอกรหัสผ่านให้ครบ");
    return false;
  }
  if (passwordForm.Password !== passwordForm.confirmNewPassword) {
    message.error("รหัสผ่านไม่ตรงกัน");
    return false;
  }
  return true;
};
const validateConfirmPassword = async (_rule: any, value: string) => {
  if (value && value !== passwordForm.Password) {
    throw new Error("รหัสผ่านไม่ตรงกัน");
  }
};

const passwordFormRules = {
  Password: [
    { required: true, message: "กรุณากรอกรหัสผ่านใหม่" },
    { min: 4, message: "รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร" },
  ],
  confirmNewPassword: [
    { required: true, message: "กรุณายืนยันรหัสผ่านใหม่" },
    { validator: validateConfirmPassword },
  ],
};
const updatePassword = async () => {
  try {
    passwordConfirmLoading.value = true;
    const response = await HttpService.getAxiosClient().patch(
      `/Customer/UpdatePassword/${passwordForm.customerId}`,
      { Password: passwordForm.Password }
    );

    if (response.data && response.data.message) {
      message.error(response.data.message);
    } else {
      message.success("เปลี่ยนรหัสผ่านสำเร็จ");
      passwordModalVisible.value = false;
      resetPasswordForm();
    }
  } catch (error) {
    console.error("Error updating password:", error);
    message.error("ไม่สามารถเปลี่ยนรหัสผ่านได้");
  } finally {
    passwordConfirmLoading.value = false;
  }
};

const handlePasswordCancel = () => {
  passwordModalVisible.value = false;
  resetPasswordForm();
};

const resetPasswordForm = () => {
  passwordForm.Password = "";
  passwordForm.confirmNewPassword = "";
  passwordForm.customerId = undefined;
};

const onPasswordFinish = () => {
  handlePasswordOk();
};

const onPasswordFinishFailed = (errorInfo: FormValidationError) => {
  console.error("Password form validation failed:", errorInfo);
  message.error("กรุณากรอกข้อมูลให้ถูกต้องครบถ้วน");
};
onMounted(() => {
  fetchCustomer();
});
</script>
