<template>
    <div class="px-6 p-4">
        <div class="mb-4">
            <a-button type="primary" @click="showModal">เพิ่ม Employee</a-button>
        </div>

        <a-table :columns="columns" :loading="loading" :dataSource="employee" rowKey="Id"
            :scroll="{ x: 1300, y: 1000 }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'actions'">
                    <a-space>
                        <a-button type="link" @click="handleEdit(record)">แก้ไข</a-button>
                        <a-button type="link" danger @click="handleDelete(record.Id)">ลบ</a-button>
                    </a-space>
                </template>
                <template v-else-if="column.key === 'fullName'">
                    {{ record.Title }} {{ record.FirstName }} {{ record.LastName }}
                </template>
            </template>
        </a-table>

        <a-modal v-model:open="modalVisible" :title="isEditing ? 'แก้ไขพนักงาน' : 'เพิ่มพนักงาน'" @ok="handleOk"
            @cancel="handleCancel" :width="820" :confirmLoading="confirmLoading" centered>
            <a-form :model="formState" name="employeeForm" @finish="onFinish" @finishFailed="onFinishFailed">

                <div class="flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/5">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">
                                คำนำหน้า <span class="text-red-500">*</span>
                            </label>
                            <a-select c v-model:value="formState.Title" placeholder="เลือกคำนำหน้า" class="w-full">
                                <a-select-option value="นาย">นาย</a-select-option>
                                <a-select-option value="นาย">นาย</a-select-option>
                                <a-select-option value="นางสาว">นางสาว</a-select-option>
                            </a-select>
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-2/5">
                        <div class="mb-2">
                            <label for="fName" class="mb-2 block text-base font-medium text-[#07074D]">
                                ชื่อจริง (TH) <span class="text-red-500">*</span>
                            </label>
                            <a-input v-model:value="formState.FirstName" placeholder="กรอกชื่อ" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-2/5">
                        <div class="mb-2">
                            <label for="fName" class="mb-2 block text-base font-medium text-[#07074D]">
                                นามสกุล (TH) <span class="text-red-500">*</span>
                            </label>
                            <a-input v-model:value="formState.LastName" placeholder="กรอกนามสกุล" />
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">
                                Username
                            </label>
                            <a-input v-model:value="formState.UserName" placeholder="กรอกUsername" />

                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">
                                Email
                            </label>
                            <a-input v-model:value="formState.Email" placeholder="กรอก Email" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">
                                วันเกิด
                            </label>
                            <a-input v-model:value="formState.BirthDate" placeholder="กรอกวันเกิด" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">ที่อยู่</label>
                            <a-input v-model:value="formState.Address" placeholder="กรอกที่อยู่" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">จังหวัด</label>
                            <a-input v-model:value="formState.City" placeholder="กรอกจังหวัด" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">ประเทศ</label>
                            <a-input v-model:value="formState.Country" placeholder="กรอกประเทศ" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">รหัสไปรษณีย์</label>
                            <a-input v-model:value="formState.PostalCode" placeholder="กรอกรหัสไปรษณีย์" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">รูป</label>
                            <a-input v-model:value="formState.Photo" placeholder="กรอกรูป" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">PhotoPath</label>
                            <a-input v-model:value="formState.PhotoPath" placeholder="กรอกPhotoPath" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">หมายเหตุ</label>
                            <a-input v-model:value="formState.Notes" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">Password</label>
                            <a-input v-model:value="formState.Password" placeholder="กรอกPassword" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">ยืนยัน Password</label>
                            <a-input v-model:value="formState.ConfirmPassword" placeholder="กรอกยืนยัน Password" />
                        </div>
                    </div>
                </div>
            </a-form>

        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue';
import HttpService from '../../services/HttpService';


// Combined interfaces
interface EmployeeData {
    Id?: string;
    Title: string | null;
    FirstName: string;
    LastName: string;
    BirthDate: string;
    Email: string;
    UserName: string;
    Address: string;
    City: string;
    Country: string;
    PostalCode: string;
    Notes: string;
    Photo: string;
    PhotoPath: string;
    Password: string;
    ConfirmPassword: string;
    RoleUser: string;
}

const initialFormState: EmployeeData = {
    Title: null,
    FirstName: '',
    LastName: '',
    BirthDate: '',
    Email: '',
    UserName: '',
    Address: '',
    City: '',
    Country: '',
    PostalCode: '',
    Notes: '',
    Photo: '',
    PhotoPath: '',
    Password: '',
    ConfirmPassword: '',
    RoleUser: 'employee',
};

const formState = reactive<EmployeeData>({ ...initialFormState });
const employee = ref<EmployeeData[]>([]);
const loading = ref(false);
const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEditing = ref(false);

const columns = [
    {
        title: 'ชื่อ-นามสกุล',
        key: 'fullName',
        width: 150,
        fixed: 'left'
    },
    { title: 'ชื่อผู้ใช้', dataIndex: 'UserName', key: 'userName', },
    { title: 'อีเมล', dataIndex: 'Email', key: 'email', },
    { title: 'ที่อยู่', dataIndex: 'Address', key: 'address', },
    { title: 'วันเกิด', dataIndex: 'BirthDate', key: 'birthDate', },
    { title: 'เมือง', dataIndex: 'City', key: 'city', },
    { title: 'ประเทศ', dataIndex: 'Country', key: 'country', },
    { title: 'หมายเหตุ', dataIndex: 'Notes', key: 'notes', ellipsis: true },
    { title: 'รูป', dataIndex: ' Photo', key: 'photo', },
    { title: 'PhotoPath', dataIndex: 'PhotoPath', key: 'photoPath', },
    { title: 'รหัสไปรษณีย์', dataIndex: 'PostalCode', key: 'postalCode', },
    { title: 'ตำแหน่ง', dataIndex: 'Title', key: 'title', },

    {
        title: 'จัดการ', key: 'actions', fixed: 'right',
        width: 150,
    }
];

const fetchEmployee = async () => {
    try {
        loading.value = true;
        const { data } = await HttpService.getAxiosClient().get('/Employee');
        employee.value = data;
    } catch (error) {
        console.error('Error fetching employee:', error);
        message.error('ไม่สามารถดึงข้อมูลได้');
    } finally {
        loading.value = false;
    }
};

const resetForm = () => Object.assign(formState, initialFormState);

const showModal = () => {
    isEditing.value = false;
    resetForm();
    modalVisible.value = true;
};

const handleDelete = (id: string) => {
    Modal.confirm({
        title: 'ยืนยันการลบ',
        content: 'คุณต้องการลบข้อมูลพนักงานใช่หรือไม่?',
        okText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        onOk: async () => {
            try {
                await HttpService.getAxiosClient().delete(`/Employee/${id}`);
                message.success('ลบสำเร็จ');
                await fetchEmployee();
            } catch (error) {
                console.error('Error deleting category:', error);
                message.error('ไม่สามารถลบข้อมูลได้');
            }
        }
    });
};

const handleEdit = (record: EmployeeData) => {
    Object.assign(formState, record);
    isEditing.value = true;
    modalVisible.value = true;
};

const handleOk = async () => {
    try {
        confirmLoading.value = true;

        if (!formState.FirstName || !formState.LastName || !formState.UserName || !formState.Email || !formState.Password) {
            message.error('กรุณากรอกชื่อจริง, นามสกุล, ชื่อผู้ใช้, อีเมล, และรหัสผ่าน');
            return;
        }
        // ตรวจสอบว่า Password และ ConfirmPassword ตรงกันหรือไม่
        if (formState.Password !== formState.ConfirmPassword) {
            message.error('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
            return;
        }
        // ตรวจสอบว่า Password และ ConfirmPassword ได้กรอกหรือยัง
        if (!formState.Password || !formState.ConfirmPassword) {
            message.error('กรุณากรอกรหัสผ่านและยืนยันรหัสผ่าน');
            return;
        }

        // ตรวจสอบว่า UserName และ Email ซ้ำหรือไม่
        if (await checkDuplicate(formState.UserName, formState.Email, formState.Id)) return;

        // ลบ Id ออกจาก payload ก่อนที่จะส่งไป API
        const { ConfirmPassword, Id, ...payload } = formState;

        const method = isEditing.value && formState.Id ? 'patch' : 'post';
        const url = isEditing.value && formState.Id ? `/Employee/${formState.Id}` : '/Employee';

        await HttpService.getAxiosClient()[method](url, payload);
        message.success(isEditing.value ? 'แก้ไขสำเร็จ' : 'เพิ่มสำเร็จ');

        modalVisible.value = false;
        fetchEmployee();
        resetForm();
    } catch (error) {
        console.error('Error saving category:', error);
        message.error('ไม่สามารถบันทึกข้อมูลได้');
    } finally {
        confirmLoading.value = false;
    }
};

const checkDuplicate = async (username: string, email: string, employeeId?: string) => {
    try {
        const { data } = await HttpService.getAxiosClient().get('/Employee');

        // ตรวจสอบว่า UserName ซ้ำหรือไม่ ถ้าไม่ได้แก้ไข
        if (data.some((employee: { UserName: string, Id: string }) => employee.UserName === username && employee.Id !== employeeId)) {
            message.error('ชื่อผู้ใช้นี้มีอยู่แล้ว');
            return true;
        }

        // ตรวจสอบว่า Email ซ้ำหรือไม่ ถ้าไม่ได้แก้ไข
        if (data.some((employee: { Email: string, Id: string }) => employee.Email === email && employee.Id !== employeeId)) {
            message.error('อีเมลนี้มีอยู่แล้ว');
            return true;
        }

        return false;
    } catch (error) {
        console.error('Error checking duplicates:', error);
        message.error('ไม่สามารถตรวจสอบข้อมูลได้');
        return false;
    }
};

const handleCancel = () => {
    modalVisible.value = false;
    resetForm();
};

const onFinish = (values: any) => console.log('Success:', values);
const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);

onMounted(fetchEmployee);
</script>