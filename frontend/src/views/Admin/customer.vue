<template>
    <div class="px-6 p-4">
        <div class="mb-4">
            <a-button type="primary" @click="showModal">เพิ่ม Customer</a-button>
        </div>

        <a-table :columns="columns" :loading="loading" :dataSource="customer" rowKey="Id"
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

        <a-modal v-model:open="modalVisible" :title="isEditing ? 'แก้ไขลูกค้า' : 'เพิ่มลูกค้า'" @ok="handleOk"
            @cancel="handleCancel" :width="820" :confirmLoading="confirmLoading" centered>
            <a-form :model="formState" name="customerForm" @finish="onFinish" @finishFailed="onFinishFailed">
                <div class="flex flex-wrap">
                    <div class="w-full px-3 sm:w-1/5">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">
                                คำนำหน้า <span class="text-red-500">*</span>
                            </label>
                            <a-select c v-model:value="formState.Title" placeholder="เลือกคำนำหน้า" class="w-full">
                                <a-select-option value="นาย">นาย</a-select-option>
                                <a-select-option value="นาง">นาง</a-select-option>
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
                            <a-input v-model:value="emailWithoutDomain" placeholder="กรอก Email"
                                addon-after="@gmail.com" />
                        </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-2">
                            <label class="mb-2 block text-base font-medium text-[#07074D]">
                                วันเกิด
                            </label>
                            <a-date-picker v-model:value="birthDate" format="YYYY-MM-DD" class="w-full"
                                :placeholder="'เลือกวันเกิด'" @change="handleDateChange" />
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
                            <a-select v-model:value="formState.City" placeholder="เลือกจังหวัด"
                                :options="provinceOptions" :loading="loadingProvinces" class="w-full" />
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
                            <label class="mb-2 block text-base font-medium text-[#07074D]">ประเทศ</label>
                            <a-input v-model:value="formState.Country" placeholder="กรอกประเทศ" />
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
import { ref, reactive, onMounted, computed } from 'vue';
import { message, Modal } from 'ant-design-vue';
import HttpService from '../../services/HttpService';
import dayjs from 'dayjs';
import axios from 'axios';

// Interface and initial state
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

const initialFormState: CustomerData = {
    Title: null,
    FirstName: '',
    LastName: '',
    BirthDate: '',
    Email: '',
    UserName: '',
    Address: '',
    City: null,
    Country: '',
    PostalCode: '',
    Notes: '',
    Photo: '',
    PhotoPath: '',
    Password: '',
    ConfirmPassword: '',
    Role: 'General',
};

interface Province {
    name_th: string | null;
}
const provinceOptions = ref([]);
const loadingProvinces = ref(false);

const formState = reactive<CustomerData>({ ...initialFormState });
const customer = ref<CustomerData[]>([]);
const birthDate = ref<dayjs.Dayjs | null>(null);
const loading = ref(false);
const modalVisible = ref(false);
const confirmLoading = ref(false);
const isEditing = ref(false);


const emailWithoutDomain = computed({
    get: () => formState.Email.replace('@gmail.com', ''),
    set: (value: string) => {
        // ตรวจสอบและตัด @gmail.com ออกหากผู้ใช้กรอกมาในช่อง input
        const sanitizedValue = value.replace('@gmail.com', '').trim();
        formState.Email = `${sanitizedValue}@gmail.com`;
    },
});
// Table columns
const columns = [
    { title: 'ชื่อ-นามสกุล', key: 'fullName', width: 150, fixed: 'left' },
    { title: 'ชื่อผู้ใช้', dataIndex: 'UserName', key: 'userName' },
    { title: 'อีเมล', dataIndex: 'Email', key: 'email' },
    { title: 'ที่อยู่', dataIndex: 'Address', key: 'address' },
    { title: 'วันเกิด', dataIndex: 'BirthDate', key: 'birthDate' },
    { title: 'เมือง', dataIndex: 'City', key: 'city' },
    { title: 'รหัสไปรษณีย์', dataIndex: 'PostalCode', key: 'postalCode' },
    { title: 'ประเทศ', dataIndex: 'Country', key: 'country' },
    { title: 'หมายเหตุ', dataIndex: 'Notes', key: 'notes', ellipsis: true },
    { title: 'จัดการ', key: 'actions', fixed: 'right', width: 150 },
];

const fetchProvinces = async () => {
    try {
        loadingProvinces.value = true;
        const response = await axios.get('https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json');
        console.log(response.data);

        provinceOptions.value = response.data.map((province: Province) => ({
            label: province.name_th, // ชื่อจังหวัด
            value: province.name_th, // ใช้ชื่อจังหวัดเป็นค่า value
        }));
    } catch (error) {
        console.error('Error fetching provinces:', error);
        message.error('ไม่สามารถโหลดข้อมูลจังหวัดได้');
    } finally {
        loadingProvinces.value = false;
    }
};
// Form management functions
const resetForm = () => {
    Object.assign(formState, initialFormState);
    birthDate.value = null;
};

const handleDateChange = (date: dayjs.Dayjs | null) => {
    formState.BirthDate = date ? date.format('YYYY-MM-DD') : '';
};

const fetchCustomer = async () => {
    try {
        loading.value = true;
        const { data } = await HttpService.getAxiosClient().get('/Customer');
        customer.value = data;
    } catch (error) {
        console.error('Error fetching customer:', error);
        message.error('ไม่สามารถดึงข้อมูลได้');
    } finally {
        loading.value = false;
    }
};

const handleOk = async () => {
    if (await validateForm()) await saveCustomer();
};
const saveCustomer = async () => {
    try {
        confirmLoading.value = true;
        const { ConfirmPassword, Id, ...payload } = formState;

        const method = isEditing.value && Id ? 'patch' : 'post';
        const url = isEditing.value && Id ? `/Customer/${Id}` : '/Customer';

        const response = await HttpService.getAxiosClient()[method](url, payload);

        // ตรวจสอบว่า response มีข้อความ error หรือไม่
        if (response.data && response.data.message) {
            message.error(response.data.message); // แสดงข้อความ error จาก API
        } else {
            message.success(isEditing.value ? 'แก้ไขสำเร็จ' : 'เพิ่มสำเร็จ');
            modalVisible.value = false;
            fetchCustomer();
            resetForm();
        }
    } catch (error) {
        console.error('Error saving customer:', error);
        message.error('ไม่สามารถบันทึกข้อมูลได้');
    } finally {
        confirmLoading.value = false;
    }
};

const validateForm = async () => {

    const thaiRegex = /^[ก-๙\s]+$/;
    // ตรวจสอบว่าชื่อและนามสกุลเป็นภาษาไทย
    if (!thaiRegex.test(formState.FirstName)) {
        message.error('กรุณากรอกชื่อเป็นภาษาไทยเท่านั้น');
        return false;
    }
    if (!thaiRegex.test(formState.LastName)) {
        message.error('กรุณากรอกนามสกุลเป็นภาษาไทยเท่านั้น');
        return false;
    }

    if (!formState.FirstName || !formState.LastName || !formState.UserName || !formState.Email || !formState.Password || !formState.ConfirmPassword || !formState.BirthDate) {
        message.error('กรุณากรอกข้อมูลให้ครบถ้วน');
        return false;
    }
    formState.Email = formState.Email.replace('@gmail.com', '').trim() + '@gmail.com';

    if (formState.Password !== formState.ConfirmPassword) {
        message.error('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
        return false;
    }
    return !(await checkDuplicate(formState.UserName, formState.Email, formState.Id));
};

const handleDelete = (id: string) => {
    Modal.confirm({
        title: 'ยืนยันการลบ',
        content: 'คุณต้องการลบข้อมูลลูกค้าใช่หรือไม่?',
        okText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        onOk: async () => {
            try {
                await HttpService.getAxiosClient().delete(`/Customer/${id}`);
                message.success('ลบสำเร็จ');
                fetchCustomer();
            } catch (error) {
                console.error('Error deleting customer:', error);
                message.error('ไม่สามารถลบข้อมูลได้');
            }
        },
    });
};

const showModal = () => {
    isEditing.value = false;
    resetForm();
    modalVisible.value = true;
};

const handleEdit = (record: CustomerData) => {
    Object.assign(formState, record);
    birthDate.value = record.BirthDate ? dayjs(record.BirthDate) : null;
    isEditing.value = true;
    modalVisible.value = true;
};





const checkDuplicate = async (username: string, email: string, customerId?: string) => {
    try {
        const { data } = await HttpService.getAxiosClient().get('/Customer');
        const isDuplicate = data.some((e: { UserName: string; Email: string; Id: string }) =>
            (e.UserName === username || e.Email === email) && e.Id !== customerId
        );
        if (isDuplicate) {
            message.error('ชื่อผู้ใช้หรืออีเมลนี้มีอยู่แล้ว');
        }
        return isDuplicate;
    } catch (error) {
        console.error('Error checking duplicates:', error);
        message.error('ไม่สามารถตรวจสอบข้อมูลได้');
        return true;
    }
};

const handleCancel = () => {
    modalVisible.value = false;
    resetForm();
};

const onFinish = (values: any) => console.log('Success:', values);
const onFinishFailed = (errorInfo: any) => console.log('Failed:', errorInfo);

onMounted(() => {
    fetchProvinces();
    fetchCustomer();
});
</script>
