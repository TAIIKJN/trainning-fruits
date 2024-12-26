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
                    {{ record.FirstName }} {{ record.LastName }}
                </template>
            </template>
        </a-table>

        <a-modal v-model:open="modalVisible" :title="isEditing ? 'แก้ไขพนักงาน' : 'เพิ่มพนักงาน'" @ok="handleOk"
            @cancel="handleCancel" :width="820" :confirmLoading="confirmLoading" centered>
            <a-form :model="formState" name="employeeForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                @finish="onFinish" @finishFailed="onFinishFailed">
                <a-row :gutter="16">

                    <a-col :span="12">
                        <a-form-item label="Username" name="UserName">
                            <a-input v-model:value="formState.UserName" placeholder="กรอกUsername" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="Email" name="Email">
                            <a-input v-model:value="formState.Email" placeholder="กรอกEmail" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">

                    <a-col :span="12">
                        <a-form-item label="ชื่อ" name="FirstName">
                            <a-input v-model:value="formState.FirstName" placeholder="กรอกชื่อ" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="นามสกุล" name="LastName">
                            <a-input v-model:value="formState.LastName" placeholder="กรอกนามสกุล" />
                        </a-form-item>
                    </a-col>
                </a-row>





                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="ที่อยู่" name="Address">
                            <a-input v-model:value="formState.Address" placeholder="กรอกที่อยู่" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="อำเภอ" name="City">
                            <a-input v-model:value="formState.City" placeholder="กรอกเอำเภอ" />
                        </a-form-item>
                    </a-col>

                </a-row>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="ประเทศ" name="Country">
                            <a-input v-model:value="formState.Country" placeholder="กรอกประเทศ" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="รหัสไปรษณีย์" name="PostalCode">
                            <a-input v-model:value="formState.PostalCode" placeholder="กรอกรหัสไปรษณีย์" />
                        </a-form-item>
                    </a-col>


                </a-row>
                <a-row :gutter="16">

                    <a-col :span="12">
                        <a-form-item label="วันเกิด" name="BirthDate">
                            <a-input v-model:value="formState.BirthDate" placeholder="กรอกวันเกิด" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="หมายเหตุ" name="Notes">
                            <a-input v-model:value="formState.Notes" placeholder="กรอกหมายเหตุ" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-item label="รูป" name="Photo">
                            <a-input v-model:value="formState.Photo" placeholder="กรอกรูป" />
                        </a-form-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-item label="PhotoPath" name="PhotoPath">
                            <a-input v-model:value="formState.PhotoPath" placeholder="กรอกPhotoPath" />
                        </a-form-item>
                    </a-col>
                </a-row>


                <a-row :gutter="16">

                    <a-col :span="12">
                        <a-form-item label="ตำแหน่ง" name="Title">
                            <a-input v-model:value="formState.Title" placeholder="กรอกตำแหน่ง" />
                        </a-form-item>
                    </a-col>
                </a-row>

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
    Photo: string;
    PhotoPath: string;
    Notes: string;
    Id?: string;
    UserName: string;
    Email: string;
    Address: string;
    BirthDate: string;
    City: string;
    Country: string;
    FirstName: string;
    LastName: string;
    PostalCode: string;
    Title: string;
}

const initialFormState: EmployeeData = {
    Address: '',
    UserName: '',
    FirstName: '',
    LastName: '',
    Email: '',
    BirthDate: '',
    City: '',
    Country: '',
    Notes: '',
    Photo: '',
    PhotoPath: '',
    PostalCode: '',
    Title: '',
};

const formState = reactive<EmployeeData>({ ...initialFormState });
const employee = ref<EmployeeData[]>([]);
const loading = ref(false);
const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEditing = ref(false);

// Table columns configuration
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
                message.success('ลบประเภทสินค้าสำเร็จ');
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
        // ตรวจสอบว่า UserName และ Email ซ้ำหรือไม่
        if (await checkDuplicate(formState.UserName, formState.Email)) return;

        const payload = { ...formState };

        const method = isEditing.value && formState.Id ? 'patch' : 'post';
        const url = isEditing.value && formState.Id ? `/Employee/${formState.Id}` : '/Employee';

        await HttpService.getAxiosClient()[method](url, payload);
        message.success(isEditing.value ? 'แก้ไขประเภทสินค้าสำเร็จ' : 'เพิ่มประเภทสินค้าสำเร็จ');

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

const checkDuplicate = async (username: string, email: string) => {
    try {
        const { data } = await HttpService.getAxiosClient().get('/Employee');
        // ระบุประเภทของ employee ใน data
        if (data.some((employee: { UserName: string }) => employee.UserName === username)) {
            message.error('ชื่อผู้ใช้นี้มีอยู่แล้ว');
            return true;
        }
        if (data.some((employee: { Email: string }) => employee.Email === email)) {
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