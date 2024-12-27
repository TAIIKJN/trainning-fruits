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
                <a-form-item label="ที่อยู่" name="Address">
                    <a-input v-model:value="formState.Address" placeholder="กรอกที่อยู่" />
                </a-form-item>

                <a-form-item label="เมือง" name="City">
                    <a-input v-model:value="formState.City" placeholder="กรอกเมือง" />
                </a-form-item>

                <a-form-item label="ชื่อบริษัท" name="CompanyName">
                    <a-input v-model:value="formState.CompanyName" placeholder="กรอกชื่อบริษัท" />
                </a-form-item>

                <a-form-item label="ชื่อผู้ติดต่อ" name="ContactName">
                    <a-input v-model:value="formState.ContactName" placeholder="กรอกชื่อผู้ติดต่อ" />
                </a-form-item>

                <a-form-item label="ตําแหน่งผู้ติดต่อ" name="ContactTitle">
                    <a-input v-model:value="formState.ContactTitle" placeholder="กรอกตํำแหน่งผู้ติดต่อ" />
                </a-form-item>

                <a-form-item label="ประเทศ" name="Country">
                    <a-input v-model:value="formState.Country" placeholder="กรอกประเทศ" />
                </a-form-item>

                <a-form-item label="โทรศัพท์" name="Phone">
                    <a-input v-model:value="formState.Phone" placeholder="กรอกเบอร์โทรศัพท์" />
                </a-form-item>

                <a-form-item label="Fax" name="Fax">
                    <a-input v-model:value="formState.Fax" placeholder="กรอกเบอร์Fax" />
                </a-form-item>

                <a-form-item label="HomePage" name="HomePage">
                    <a-input v-model:value="formState.HomePage" placeholder="กรอกHomePage" />
                </a-form-item>

                <a-form-item label="รหัสไปรษณีย์" name="PostalCode">
                    <a-input v-model:value="formState.PostalCode" placeholder="กรอกรหัสไปรษณีย์" />
                </a-form-item>

                <a-form-item label="ภูมิภาค" name="Region">
                    <a-input v-model:value="formState.Region" placeholder="กรอกภูมิภาค" />
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
    Address: string;
    City: string;
    CompanyName: string;
    ContactName: string;
    ContactTitle: string;
    Country: string;
    Fax: string;
    HomePage: string;
    Phone: string;
    PostalCode: string;
    Region: string;
}

const initialFormState: SupplierData = {
    Address: '',
    City: '',
    CompanyName: '',
    ContactName: '',
    ContactTitle: '',
    Country: '',
    Fax: '',
    HomePage: '',
    Phone: '',
    PostalCode: '',
    Region: ''
};

const formState = reactive<SupplierData>({ ...initialFormState });
const supplier = ref<SupplierData[]>([]);
const loading = ref(false);
const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEditing = ref(false);

// Table columns configuration
const columns = [

    { title: 'ชื่อบริษัท', dataIndex: 'CompanyName', key: 'companyName',  },
    { title: 'ชื่อผู้ติดต่อ', dataIndex: 'ContactName', key: 'contactName',  },
    { title: 'ตำแหน่งผู้ติดต่อ', dataIndex: 'ContactTitle', key: 'contactTitle', width: 140 },
    { title: 'ที่อยู่', dataIndex: 'Address', key: 'address',  },
    { title: 'เมือง', dataIndex: 'City', key: 'city',  },
    { title: 'ประเทศ', dataIndex: 'Country', key: 'country',  },
    { title: 'รหัสไปรษณีย์', dataIndex: 'PostalCode', key: 'postalCode',  },
    { title: 'ภูมิภาค', dataIndex: ' Region', key: 'region',  },
    { title: 'แฟกซ์', dataIndex: 'Fax', key: 'fax',  },
    { title: 'HomePage', dataIndex: 'HomePage', key: 'homePage',  },
    { title: 'เบอร์โทร', dataIndex: 'Phone', key: 'phone',  },
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
            Address: formState.Address,
            City: formState.City,
            CompanyName: formState.CompanyName,
            ContactName: formState.ContactName,
            ContactTitle: formState.ContactTitle,
            Country: formState.Country,
            Fax: formState.Fax,
            HomePage: formState.HomePage,
            Phone: formState.Phone,
            PostalCode: formState.PostalCode,
            Region: formState.Region
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