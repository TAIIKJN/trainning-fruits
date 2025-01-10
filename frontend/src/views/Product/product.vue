<template>
    <div class="container mx-auto p-4">
        <a-button type="primary" class="mb-4" @click="showModal">เพิ่มสินค้า</a-button>

        <a-table :columns="columns" :dataSource="products" rowKey="Id" :loading="loading">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'actions'">
                    <a-space>
                        <a-button type="link" @click="handleEdit(record)">แก้ไข</a-button>
                        <a-button type="link" danger @click="confirmDelete(record.Id)">ลบ</a-button>
                    </a-space>
                </template>
                <template v-if="column.key === 'Discontinued'">
                    <a-tag :color="record.Discontinued ? 'red' : 'green'">
                        {{ record.Discontinued ? 'ยกเลิกการขาย' : 'ขายอยู่' }}
                    </a-tag>
                </template>
                <template v-if="column.key === 'CategoryId'">
                    {{ getCategoryName(record.CategoryId) }}
                </template>
            </template>
        </a-table>

        <a-modal v-model:open="modalVisible" :title="isEditing ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'" @ok="handleSubmit"
            width="720px" centered>
            <a-form :model="formState" layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
                <a-form-item label="ชื่อสินค้า" required>
                    <a-input v-model:value="formState.productName" />
                </a-form-item>

                <a-form-item label="ประเภทสินค้า" required>
                    <a-select v-model:value="formState.categoryId" :loading="loadingCategories">
                        <a-select-option v-for="cat in categories" :key="cat.Id" :value="cat.Id">
                            {{ cat.CategoryName }}
                        </a-select-option>
                    </a-select>
                </a-form-item>

                <a-form-item label="ราคาต่อหน่วย" required>
                    <a-input v-model:value="formState.unitPrice" />
                </a-form-item>

                <a-form-item label="จำนวนต่อหน่วย">
                    <a-input v-model:value="formState.quantityPerUnit" />
                </a-form-item>

                <a-form-item label="จำนวนในคลัง">
                    <a-input-number v-model:value="formState.unitsInStock" :min="0" style="width: 100%" />
                </a-form-item>

                <a-form-item label="ระดับการสั่งซื้อซ้ำ">
                    <a-input-number v-model:value="formState.reorderLevel" :min="0" style="width: 100%" />
                </a-form-item>
                <a-form-item label="ผู้จำหน่าย" required>
                    <a-select v-model:value="formState.supplierId" :loading="loading" placeholder="เลือกรายการ">
                        <a-select-option v-for="supplier in suppliers" :key="supplier.Id" :value="supplier.Id">
                            {{ supplier.FirstName }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="สถานะของสินค้า">
                    <a-radio-group v-model:value="formState.discontinued">
                        <a-radio :value="false">ยังจำหน่าย</a-radio>
                        <a-radio :value="true">เลิกจำหน่าย</a-radio>
                    </a-radio-group>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { message, Modal } from 'ant-design-vue';
import HttpService from '../../services/HttpService';

interface Product {
    Id: string;
    ProductName: string;
    CategoryId: string;
    UnitPrice: string;
    QuantityPerUnit: string;
    UnitsInStock: number;
    UnitsOnOrder: number;
    ReorderLevel: number;
    Discontinued: boolean;
    SupplierId: string;
}

const products = ref<Product[]>([]);
const categories = ref<any[]>([]);
const suppliers = ref<any[]>([]);
const loading = ref(false);
const loadingCategories = ref(false);
const modalVisible = ref(false);
const isEditing = ref(false);

const formState = reactive({
    Id: null,
    productName: '',
    categoryId: null,
    unitPrice: '',
    quantityPerUnit: '',
    unitsInStock: 0,
    unitsOnOrder: 0,
    reorderLevel: 0,
    discontinued: false,
    supplierId: null
});

const columns = [
    { title: 'ชื่อสินค้า', dataIndex: 'ProductName', key: 'ProductName' },
    { title: 'ประเภท', dataIndex: 'CategoryId', key: 'CategoryId' },
    { title: 'ราคา', dataIndex: 'UnitPrice', key: 'UnitPrice' },
    { title: 'หน่วย', dataIndex: 'QuantityPerUnit', key: 'QuantityPerUnit' },
    { title: 'คงเหลือ', dataIndex: 'UnitsInStock', key: 'UnitsInStock' },
    { title: 'สั่งซื้อ', dataIndex: 'UnitsOnOrder', key: 'UnitsOnOrder' },
    { title: 'จำนวนการซื้อซ้ำ', dataIndex: 'ReorderLevel', key: 'ReorderLevel' },
    { title: 'สถานะ', dataIndex: 'Discontinued', key: 'Discontinued' },
    { title: 'จัดการ', key: 'actions' }
];
const fetchData = async () => {
    loading.value = true;
    try {
        const [productsRes, categoriesRes, suppliersRes] = await Promise.all([
            HttpService.getAxiosClient().get('/Product'),
            HttpService.getAxiosClient().get('/Category'),
            HttpService.getAxiosClient().get('/Supplier')
        ]);
        products.value = productsRes.data;
        categories.value = categoriesRes.data;
        suppliers.value = suppliersRes.data;
    } catch (error) {
        message.error('ไม่สามารถโหลดข้อมูลได้');
    } finally {
        loading.value = false;
    }
};


const getCategoryName = (id: string) =>
    categories.value.find(cat => cat.Id === id)?.CategoryName || 'ไม่ระบุ';

const showModal = () => {
    isEditing.value = false;
    Object.assign(formState, {
        Id: null,
        productName: '',
        categoryId: null,
        unitPrice: '',
        quantityPerUnit: '',
        unitsInStock: 0,
        unitsOnOrder: 0,
        reorderLevel: 0,
        discontinued: false,
        supplierId: null
    });
    modalVisible.value = true;
};

const handleEdit = (record: Product) => {
    Object.assign(formState, {
        Id: record.Id,
        productName: record.ProductName,
        categoryId: record.CategoryId,
        unitPrice: record.UnitPrice,
        quantityPerUnit: record.QuantityPerUnit,
        unitsInStock: record.UnitsInStock,
        unitsOnOrder: record.UnitsOnOrder,
        reorderLevel: record.ReorderLevel,
        discontinued: record.Discontinued,
        supplierId: record.SupplierId
    });
    isEditing.value = true;
    modalVisible.value = true;
};

const handleSubmit = async () => {
    try {
        const payload = {
            productName: formState.productName,
            categoryId: formState.categoryId,
            unitPrice: formState.unitPrice,
            quantityPerUnit: formState.quantityPerUnit,
            unitsInStock: formState.unitsInStock,
            unitsOnOrder: formState.unitsOnOrder,
            reorderLevel: formState.reorderLevel,
            discontinued: formState.discontinued,
            supplierId: formState.supplierId
        };

        if (isEditing.value) {
            await HttpService.getAxiosClient().patch(`/Product/${formState.Id}`, payload);
            message.success('แก้ไขสินค้าสำเร็จ');
        } else {
            await HttpService.getAxiosClient().post('/Product', payload);
            message.success('เพิ่มสินค้าสำเร็จ');
        }

        modalVisible.value = false;
        fetchData();
    } catch (error) {
        message.error('ไม่สามารถบันทึกข้อมูลได้');
    }
};

const confirmDelete = (id: number) => {
    Modal.confirm({
        title: 'ยืนยันการลบสินค้า',
        content: 'คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?',
        okType: 'danger',
        async onOk() {
            try {
                await HttpService.getAxiosClient().delete(`/Product/${id}`);
                message.success('ลบสินค้าสำเร็จ');
                fetchData();
            } catch {
                message.error('ไม่สามารถลบสินค้าได้');
            }
        }
    });
};

onMounted(fetchData);
</script>