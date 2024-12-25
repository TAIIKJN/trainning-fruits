<template>
    <div class="px-6 p-4">
        <div class="mb-4">
            <a-button type="primary" @click="showModal">เพิ่ม Supplier</a-button>
        </div>

        <a-table :columns="columns" :loading="loading" :dataSource="supplier" rowKey="Id">
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
                    <a-input v-model:value="formState.address" placeholder="กรอกที่อยู่" />
                </a-form-item>

                <a-form-item label="เมือง" name="City">
                    <a-input v-model:value="formState.city" placeholder="กรอกเมือง" />
                </a-form-item>

                <a-form-item label="ชื่อบริษัท" name="CompanyName">
                    <a-input v-model:value="formState.companyName" placeholder="กรอกชื่อบริษัท" />
                </a-form-item>

                <a-form-item label="ชื่อผู้ติดต่อ" name="ContactName">
                    <a-input v-model:value="formState.contactName" placeholder="กรอกชื่อผู้ติดต่อ" />
                </a-form-item>

                <a-form-item label="ตําแหน่งผู้ติดต่อ" name="ContactTitle">
                    <a-input v-model:value="formState.contactTitle" placeholder="กรอกตํำแหน่งผู้ติดต่อ" />
                </a-form-item>

                <a-form-item label="ประเทศ" name="Country">
                    <a-input v-model:value="formState.country" placeholder="กรอกประเทศ" />
                </a-form-item>

                <a-form-item label="โทรศัพท์" name="Phone">
                    <a-input v-model:value="formState.phone" placeholder="กรอกเบอร์โทรศัพท์" />
                </a-form-item>

                <a-form-item label="Fax" name="Fax">
                    <a-input v-model:value="formState.fax" placeholder="กรอกเบอร์Fax" />
                </a-form-item>

                <a-form-item label="HomePage" name="HomePage">
                    <a-input v-model:value="formState.homePage" placeholder="กรอกHomePage" />
                </a-form-item>

                <a-form-item label="รหัสไปรษณีย์" name="PostalCode">
                    <a-input v-model:value="formState.postalCode" placeholder="กรอกรหัสไปรษณีย์" />
                </a-form-item>

                <a-form-item label="ภูมิภาค" name="Region">
                    <a-input v-model:value="formState.region" placeholder="กรอกภูมิภาค" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue';
import HttpService from '../../services/HttpService';
// import KeycloakService from '../../services/KeycloakService';

// const roles = KeycloakService.GetUserRoles();

interface SupplierItem {
    Id: string;
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
interface SupplierForm {
    Id: string | null;
    address: string;
    city: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    country: string;
    fax: string;
    homePage: string;
    phone: string;
    postalCode: string;
    region: string;
}

const formState = reactive<SupplierForm>({
    Id: null,
    address: '',
    city: '',
    companyName: '',
    contactName: '',
    contactTitle: '',
    country: '',
    fax: '',
    homePage: '',
    phone: '',
    postalCode: '',
    region: '',
});
const columns = [
    {
        title: 'ที่อยู่',
        dataIndex: 'Address',
        key: 'address',
    },
    {
        title: 'เมือง',
        dataIndex: 'City',
        key: 'city',
        ellipsis: true,
    },
    {
        title: 'ชื่อบริษัท',
        dataIndex: 'CompanyName',
        key: 'companyName',
        ellipsis: true,
    },
    {
        title: 'ชื่อผู้ติดต่อ',
        dataIndex: 'ContactName',
        key: 'contactName',
        ellipsis: true,
    },
    {
        title: 'ตำแหน่งผู้ติดต่อ',
        dataIndex: 'ContactTitle',
        key: 'contactTitle',
        ellipsis: true,
    },
    {
        title: 'ประเทศ',
        dataIndex: 'Country',
        key: 'country',
        ellipsis: true,
    },
    {
        title: 'แฟกซ์',
        dataIndex: 'Fax',
        key: 'fax',
        ellipsis: true,
    },
    {
        title: 'HomePage',
        dataIndex: 'HomePage',
        key: 'homePage',
        ellipsis: true,
    },
    {
        title: 'เบอร์โทร',
        dataIndex: 'Phone',
        key: 'phone',
        ellipsis: true,
    },
    {
        title: 'รหัสไปรษณีย์',
        dataIndex: 'PostalCode',
        key: 'postalCode',
        ellipsis: true,
    },
    {
        title: 'ภูมิภาค',
        dataIndex: ' Region',
        key: 'region',
        ellipsis: true,
    },
    {
        title: 'จัดการ',
        key: 'actions',
        width: '150px',
    },
];

const supplier = ref<SupplierItem[]>([]);
const loading = ref(false);

const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEditing = ref(false);



const fetchSuppliers = async () => {
    try {
        loading.value = true;
        const response = await HttpService.getAxiosClient().get('/Supplier');
        supplier.value = response.data;
    } catch (error) {
        console.error('Error fetching supplier:', error);
    } finally {
        loading.value = false;
    }
};
const resetForm = () => {
    Object.assign(formState, {
        Id: null,
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
        Region: '',
    });
};

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
        async onOk() {
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
const handleEdit = (record: SupplierItem) => {
    formState.Id = record.Id;
    formState.address = record.Address;
    formState.city = record.City;
    formState.companyName = record.CompanyName;
    formState.contactName = record.ContactName;
    formState.contactTitle = record.ContactTitle;
    formState.country = record.Country;
    formState.fax = record.Fax;
    formState.homePage = record.HomePage;
    formState.phone = record.Phone;
    formState.postalCode = record.PostalCode;
    formState.region = record.Region;


    isEditing.value = true;
    modalVisible.value = true;
};
const handleOk = async () => {
    try {
        confirmLoading.value = true;
        const payload = {
            address: formState.address,
            city: formState.city,
            companyName: formState.companyName,
            contactName: formState.contactName,
            contactTitle: formState.contactTitle,
            country: formState.country,
            fax: formState.fax,
            homePage: formState.homePage,
            phone: formState.phone,
            postalCode: formState.postalCode,
            region: formState.region
        };

        if (isEditing.value && formState.Id !== null) {
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

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

onMounted(() => {
    fetchSuppliers();
});
</script>