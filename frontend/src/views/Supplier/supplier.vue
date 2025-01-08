<template>
    <div class="px-6 p-4">
        <div class="mb-4">
            <a-button v-if="isUserRole" type="primary" @click="showModal">เพิ่ม Supplier</a-button>
        </div>

        <a-table :columns="columns" :loading="loading" :dataSource="supplier" rowKey="Id"
            :scroll="{ x: 1300, y: 1000 }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'actions'">
                    <a-space>
                        <a-button type="link" @click="handleEdit(record)">แก้ไข</a-button>
                        <a-button type="link" danger @click="handleDelete(record.Id)">ลบ</a-button>
                    </a-space>
                </template>
            </template>
        </a-table>

        <a-modal v-model:open="modalVisible" :title="isEditing ? 'แก้ไขประเภทสินค้า' : 'เพิ่มประเภทสินค้า'"
            @ok="handleOk" @cancel="handleCancel" :confirmLoading="confirmLoading" centered>
            <a-form :model="formState" name="categoryForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                @finish="onFinish" @finishFailed="onFinishFailed">

                <a-form-item label="ชื่อจริง" name="FirstName">
                    <a-input v-model:value="formState.FirstName" placeholder="กรอกชื่อจริง" />
                </a-form-item>

                <a-form-item label="นามสกุล" name="LastName">
                    <a-input v-model:value="formState.LastName" placeholder="กรอกนามสกุล" />
                </a-form-item>

                <a-form-item label="Email" name="CompanyEmailName">
                    <a-input v-model:value="formState.Email" placeholder="กรอก Email" />
                </a-form-item>

                <a-form-item label="โทรศัพท์" name="Phone">
                    <a-input v-model:value="formState.Phone" placeholder="กรอกเบอร์โทรศัพท์" />
                </a-form-item>

                <a-form-item label="ที่อยู่" name="Address">
                    <a-input v-model:value="formState.Address" placeholder="กรอกที่อยู่" />
                </a-form-item>

                <a-form-item label="เมือง" name="City">
                    <a-input v-model:value="formState.City" placeholder="กรอกเมือง" />
                </a-form-item>

                <a-form-item label="ประเทศ" name="Country">
                    <a-input v-model:value="formState.Country" placeholder="กรอกประเทศ" />
                </a-form-item>

                <a-form-item label="รหัสไปรษณีย์" name="PostalCode">
                    <a-input v-model:value="formState.PostalCode" placeholder="กรอกรหัสไปรษณีย์" />
                </a-form-item>

            </a-form>
        </a-modal>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue';
import HttpService from '../../services/HttpService';
import KeycloakService from '../../services/KeycloakService';

const roles = KeycloakService.GetUserRoles();
const isUserRole = roles.includes('admin');

// Combined interfaces
interface SupplierData {
    Id?: string;
    FirstName: string;
    LastName: string;
    Email: string;
    UserName: string;
    Phone: string;
    Address: string;
    City: string;
    Country: string;
    PostalCode: string;
    Notes: string;
    Photo: string;
}

const initialFormState: SupplierData = {
    FirstName: '',
    LastName: '',
    Email: '',
    UserName: '',
    Phone: '',
    Address: '',
    City: '',
    Country: '',
    PostalCode: '',
    Notes: '',
    Photo: '',
};

const formState = reactive<SupplierData>({ ...initialFormState });
const supplier = ref<SupplierData[]>([]);
const loading = ref(false);
const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEditing = ref(false);

// Table columns configuration
const columns = [
    { title: 'ชื่อ', dataIndex: 'FirstName', key: 'firstName', },
    { title: 'นามสกุล', dataIndex: 'LastName', key: 'lastName', },
    { title: 'อีเมล', dataIndex: 'Email', key: 'email', },
    { title: 'ชื่อผู้ใช้', dataIndex: 'UserName', key: 'userName', },
    { title: 'เบอร์โทร', dataIndex: 'Phone', key: 'phone', },
    { title: 'ที่อยู่', dataIndex: 'Address', key: 'address', },
    { title: 'เมือง', dataIndex: 'City', key: 'city', },
    { title: 'ประเทศ', dataIndex: 'Country', key: 'country', },
    { title: 'รหัสไปรษณีย์', dataIndex: 'PostalCode', key: 'postalCode', },
    { title: 'จัดการ', key: 'actions', width: '150px', fixed: 'right', }
];

const fetchSuppliers = async () => {
    try {
        loading.value = true;
        const { data } = await HttpService.getAxiosClient().get('/Supplier');
        supplier.value = data;
    } catch (error) {
        console.error('Error fetching supplier:', error);
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
        content: 'คุณต้องการลบประเภทสินค้านี้ใช่หรือไม่?',
        okText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        onOk: async () => {
            try {
                await HttpService.getAxiosClient().delete(`/Supplier/${id}`);
                message.success('ลบประเภทสินค้าสำเร็จ');
                await fetchSuppliers();
            } catch (error) {
                console.error('Error deleting category:', error);
                message.error('ไม่สามารถลบข้อมูลได้');
            }
        }
    });
};

const handleEdit = (record: SupplierData) => {
    Object.assign(formState, record);
    isEditing.value = true;
    modalVisible.value = true;
};

const handleOk = async () => {
    try {
        confirmLoading.value = true;

        const payload = {
            FirstName: formState.FirstName,
            LastName: formState.LastName,
            Email: formState.Email,
            UserName: formState.UserName,
            Address: formState.Address,
            City: formState.City,
            Country: formState.Country,
            Phone: formState.Phone,
            PostalCode: formState.PostalCode,
        };

        if (isEditing.value && formState.Id) {
            await HttpService.getAxiosClient().patch(`/Supplier/${formState.Id}`, payload);
            message.success('แก้ไขประเภทสินค้าสำเร็จ');
        } else {
            await HttpService.getAxiosClient().post('/Supplier', payload);
            message.success('เพิ่มประเภทสินค้าสำเร็จ');
        }

        modalVisible.value = false;
        fetchSuppliers();
        resetForm();
    } catch (error) {
        console.error('Error saving category:', error);
        message.error('ไม่สามารถบันทึกข้อมูลได้');
    } finally {
        confirmLoading.value = false;
    }
};


const handleCancel = () => {
    modalVisible.value = false;
    resetForm();
};

const onFinish = (values: any) => console.log('Success:', values);
const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);

onMounted(fetchSuppliers);
</script>