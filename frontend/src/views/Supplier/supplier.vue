<template>
    <div class="px-6 p-4 mt-12">
 
        <a-table :columns="columns" :loading="loading" :dataSource="supplier" rowKey="Id"
            :scroll="{ x: 1300, y: 1000 }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'fullName'">
                    {{ record.Title }} {{ record.FirstName }} {{ record.LastName }}
                </template>
            </template>
        </a-table>

  
    </div>
</template>

<script setup lang="ts">
import { ref,  onMounted } from 'vue';
import { message } from 'ant-design-vue';
import HttpService from '../../services/HttpService';

// Interface and initial state
interface SupplierData {
    Id?: string;
    Title: string | null;
    FirstName: string;
    LastName: string;
    Email: string;
    Phone: string;
    UserName: string;
    Address: string;
    City: string | null;
    Country: string | null;
    PostalCode: string;
    Notes: string;
    Photo: string;
    Password: string;
    ConfirmPassword: string;
}
const supplier = ref<SupplierData[]>([]);
const loading = ref(false);

// Table columns
const columns = [
    { title: 'ชื่อ-นามสกุล', key: 'fullName', width: 150, fixed: 'left' },
    { title: 'ชื่อผู้ใช้', dataIndex: 'UserName', key: 'userName' },
    { title: 'เบอร์โทร์', dataIndex: 'Phone', key: 'phone' },
    { title: 'อีเมล', dataIndex: 'Email', key: 'email' },
    { title: 'ที่อยู่', dataIndex: 'Address', key: 'address' },
    { title: 'เมือง', dataIndex: 'City', key: 'city' },
    { title: 'รหัสไปรษณีย์', dataIndex: 'PostalCode', key: 'postalCode' },
    { title: 'ประเทศ', dataIndex: 'Country', key: 'country' },
    { title: 'หมายเหตุ', dataIndex: 'Notes', key: 'notes', ellipsis: true },
];

const fetchSupplier = async () => {
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

onMounted(() => {
    fetchSupplier();
});
</script>
