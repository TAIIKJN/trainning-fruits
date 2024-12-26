<template>
    <div class="container mx-auto p-4">
        <div class="mb-4">
            <a-button type="primary" @click="showModal">เพิ่มประเภทสินค้า</a-button>
        </div>

        <a-table :columns="columns"  :loading="loading" :dataSource="categories" rowKey="Id">
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
                <a-form-item label="ชื่อประเภท" name="CategoryName">
                    <a-input v-model:value="formState.categoryName" placeholder="กรอกชื่อประเภทสินค้า" />
                </a-form-item>

                <a-form-item label="รายละเอียด" name="description">
                    <a-textarea v-model:value="formState.description" placeholder="กรอกรายละเอียด" :rows="4" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { message, Modal } from 'ant-design-vue';
import HttpService from '../../services/HttpService';
import KeycloakService from '../../services/KeycloakService';

const roles = KeycloakService.GetUserRoles();
const isUserRole = roles.includes('admin');

interface CategoryItem {
    Id: string;
    CategoryName: string;  
    Description: string;  
}
interface CategoryForm {
    Id: string | null;
    categoryName: string;  
    description: string;   
}

const formState = reactive<CategoryForm>({
    Id: null,
    categoryName: '',
    description: '',
});
const baseColumns = [
    {
        title: 'ชื่อประเภท',
        dataIndex: 'CategoryName',
        key: 'categoryName',
    },
    {
        title: 'รายละเอียด',
        dataIndex: 'Description',
        key: 'description',
        ellipsis: true,
    },
];
const actionColumn = {
    title: 'จัดการ',
    key: 'actions',
    width: '150px',
};
const columns = computed(() => {
    return isUserRole ? [...baseColumns, actionColumn] : baseColumns;
});
const categories = ref<CategoryItem[]>([]);
const loading = ref(false);

const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEditing = ref(false);



const fetchCategories = async () => {
    try {
        loading.value = true;
        const response = await HttpService.getAxiosClient().get('/Category');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    } finally {
        loading.value = false;
    }
};
const resetForm = () => {
    Object.assign(formState, {
        Id: null,
        categoryName: '',
        description: '',
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
                await HttpService.getAxiosClient().delete(`/Category/${id}`);
                message.success('ลบประเภทสินค้าสำเร็จ');
                await fetchCategories();
            } catch (error) {
                console.error('Error deleting category:', error);
                message.error('ไม่สามารถลบข้อมูลได้');
            }
        }
    });
};
const handleEdit = (record: CategoryItem) => {
    formState.Id = record.Id;
    formState.categoryName = record.CategoryName;  
    formState.description = record.Description;
    isEditing.value = true;
    modalVisible.value = true;
};
const handleOk = async () => {
    try {
        confirmLoading.value = true;
        const payload = {
            categoryName: formState.categoryName,
            description: formState.description
        };
        
        if (isEditing.value && formState.Id !== null) {
            await HttpService.getAxiosClient().patch(`/Category/${formState.Id}`, payload);
            message.success('แก้ไขประเภทสินค้าสำเร็จ');
        } else {
            await HttpService.getAxiosClient().post('/Category', payload);
            message.success('เพิ่มประเภทสินค้าสำเร็จ');
        }
        modalVisible.value = false;
        fetchCategories();
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
    fetchCategories();
});
</script>