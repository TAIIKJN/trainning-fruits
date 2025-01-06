<template>
    <div class="mx-auto container py-16 px-2 min-h-screen">
        <div class="flex items-center justify-center mb-4">

            <a-segmented v-model:value="value" block :options="options" size="large" class="w-full  bg-blue-200" />

        </div>

        <div v-if="value === 'grid'">
            <div class="mx-auto justify-center px-2 md:flex md:space-x-6 xl:px-0 min-h-[calc(100vh-12rem)]">

                <div class="rounded-lg md:w-2/3 h-[calc(100vh-12rem)] overflow-y-auto no-scrollbar">
                    <a-list :grid="{ xs: 2, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 }" :data-source="products"
                        class="h-full">
                        <template #renderItem="{ item }">
                            <a-list-item>
                                <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                                    <div class="flex justify-between items-center p-3 sm:p-5 bg-gray-100">
                                        <div class="flex flex-col">
                                            <h3 class="text-gray-700 uppercase">{{ item.ProductName }}</h3>

                                            <span class="text-gray-500 text-sm">฿{{ item.UnitPrice }}</span>
                                        </div>
                                        <!-- <div class="flex flex-col items-end">
                                            <button
                                                class="p-2 rounded-full bg-blue-600 text-white mt-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                                <svg class="h-5 w-5" fill="none" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path
                                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div> -->

                                    </div>
                                    <div class="flex items-start justify-center mt-2">
                                        <button
                                            class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                            type="button" @click="decrementQuantity(item)">
                                            <span class="sr-only">Decrease quantity</span>
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <div>
                                            <input type="number" v-model.number="item.QuantityToOrder" min="0"
                                                :max="item.UnitsInStock"
                                                class="bg-gray-50 w-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                                                placeholder="0" required />
                                            <p class="text-xs text-gray-500 mt-1">(สินค้าคงเหลือ: {{ item.UnitsInStock
                                                }})</p>
                                        </div>
                                        <button
                                            class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                            type="button" @click="incrementQuantity(item)">
                                            <span class="sr-only">Increase quantity</span>
                                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </a-list-item>
                        </template>
                    </a-list>

                </div>
                <!-- Sub total -->
                <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">

                    <div v-for="(item, index) in subTotalItems" :key="index" class="mb-2 flex justify-between">
                        <p class="text-gray-700">{{ item.ProductName }}</p>
                        <p class="text-gray-700">฿{{ item.UnitPrice }} x {{ item.QuantityToOrder }}</p>
                    </div>

                    <hr class="my-4" />
                    <div class="flex justify-between">
                        <p class="text-lg font-bold">Total</p>
                        <div class="">
                            <p class="mb-1 text-lg font-bold">{{ totalAmount }} บาท</p>
                        </div>
                    </div>
                    <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                        @click="handleCheckout" :disabled="loading">
                        {{ loading ? 'กำลังดำเนินการ...' : 'Check out' }}
                    </button>
                </div>

            </div>
        </div>


        <a-table v-else :columns="columns" :data-source="products" :loading="loading" :pagination="{ pageSize: 10 }"
            class="shadow-md rounded-lg">
            <template #bodyCell="{ column, record }">

                <template v-if="column.key === 'quantity'">
                    <div class="flex items-start justify-center">
                        <button
                            class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button" @click="decrementQuantity(record)">
                            <span class="sr-only">Decrease quantity</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M1 1h16" />
                            </svg>
                        </button>
                        <div>
                            <input type="number" v-model.number="record.QuantityToOrder" min="0"
                                :max="record.UnitsInStock"
                                class="bg-gray-50 w-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                                placeholder="0" required />
                            <p class="text-xs text-gray-500 mt-1">(สินค้าคงเหลือ: {{ record.UnitsInStock }})</p>
                        </div>
                        <button
                            class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                            type="button" @click="incrementQuantity(record)">
                            <span class="sr-only">Increase quantity</span>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </button>
                    </div>
                </template>

                <!-- Action Column -->
                <template v-else-if="column.key === 'action'">
                    <button class="font-medium text-red-600 hover:underline">รายละเอียด</button>
                </template>

                <!-- Price Column -->
                <template v-else-if="column.key === 'UnitPrice'">
                    <span class="font-semibold text-gray-900">{{ record.UnitPrice }}</span>
                </template>

                <!-- Product Name Column -->
                <template v-else-if="column.key === 'ProductName'">
                    <span class="font-semibold text-gray-900">{{ record.ProductName }}</span>
                </template>
            </template>
        </a-table>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, h, computed } from 'vue'
import { message } from 'ant-design-vue'
import HttpService from '../../services/HttpService'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons-vue';
import KeycloakService from '../../services/KeycloakService'

interface Product {
    Id: string
    ProductName: string
    CategoryId: string
    UnitPrice: string
    QuantityPerUnit: string
    UnitsInStock: number
    UnitsOnOrder: number
    ReorderLevel: number
    Discontinued: number
    SupplierId: string
    QuantityToOrder: number;
}

interface Employee {
    UserName: string;
}
interface OrderDetail {
    Discount: number;
    ProductId: string;
    Quantity: number;
    UnitPrice: string;
}

interface Order {
    CustomerUserName: string;
    EmployeeUserName: string;
    OrderDate: string;
    TotalPrice: number;
    Address: string;
    State: string;
    OrderDetail: OrderDetail[];
}

const options = reactive([
    {
        label: () => h(AppstoreOutlined),
        value: 'grid',
    },
    {
        label: () => h(BarsOutlined),
        value: 'list',
    },
]);

const value = ref(options[0].value);

const columns = [
    {
        title: 'Product',
        dataIndex: 'ProductName',
        key: 'ProductName',
        align: 'left',
        headerAlign: 'center',

    },
    {
        title: 'Qty',
        key: 'quantity',
        align: 'center',
        class: 'px-6 py-3'
    },
    {
        title: 'ราคา',
        dataIndex: 'UnitPrice',
        key: 'UnitPrice',
        align: 'center',
        class: 'px-6 py-3'
    },
    {
        title: 'Action',
        key: 'action',
        align: 'center',
        class: 'px-6 py-3'
    }
]

const loading = ref(false)

const employees = ref<Employee[]>([])

const products = ref<Product[]>([])
const subTotalItems = ref<Product[]>([])
const totalAmount = computed(() => {
    return subTotalItems.value.reduce((total, item) => total + (parseFloat(item.UnitPrice) * item.QuantityToOrder), 0)
})

const fetchData = async () => {
    loading.value = true
    try {
        const [productsRes, employeesRes] = await Promise.all([
            HttpService.getAxiosClient().get('/Product'),
            HttpService.getAxiosClient().get('/Employee')
        ])
        products.value = productsRes.data.map((product: Product) => ({ ...product, QuantityToOrder: 0 }))
        employees.value = employeesRes.data
    } catch (error) {
        message.error('ไม่สามารถโหลดข้อมูลได้')
    } finally {
        loading.value = false
    }
}

// เพิ่มฟังก์ชันสุ่ม employee
const getRandomEmployee = (): string => {
    const randomIndex = Math.floor(Math.random() * employees.value.length)
    return employees.value[randomIndex].UserName
}

const getCustomerId = (): string => {
    try {
        const decodedToken = KeycloakService.GetDecodeToken()
        if (!decodedToken?.preferred_username) {
            throw new Error('ไม่พบข้อมูลผู้ใช้')
        }
        return decodedToken.preferred_username
    } catch (error) {
        message.error('ไม่สามารถระบุตัวตนได้')
        throw error
    }
}

const handleCheckout = async () => {
    if (subTotalItems.value.length === 0) {
        message.warning('กรุณาเลือกสินค้าก่อนสั่งซื้อ')
        return
    }

    try {
        loading.value = true

        // เช็คว่า user ยัง login อยู่หรือไม่
        if (!KeycloakService.IsLoggedIn()) {
            message.error('กรุณาเข้าสู่ระบบก่อนสั่งซื้อ')
            return
        }

        const orderData: Order = {
            CustomerUserName: getCustomerId(),  //getCustomerId()
            EmployeeUserName: getRandomEmployee(),
            OrderDate: new Date().toISOString(),
            TotalPrice: totalAmount.value,
            Address: "12222",
            State: "Pending",
            OrderDetail: subTotalItems.value.map(item => ({
                Discount: 0,
                ProductId: item.Id,
                Quantity: item.QuantityToOrder,
                UnitPrice: item.UnitPrice
            }))
        }

        await HttpService.getAxiosClient().post('/Order', orderData)

        message.success('สั่งซื้อสำเร็จ')
        subTotalItems.value = []
        products.value.forEach(product => {
            product.QuantityToOrder = 0
        })

    } catch (error) {
        message.error('ไม่สามารถสั่งซื้อได้')
    } finally {
        loading.value = false
    }
}

const incrementQuantity = (item: Product) => {
    if (item.QuantityToOrder < item.UnitsInStock) {
        item.QuantityToOrder++
        updateSubTotal(item)
    } else {
        message.warning('ไม่สามารถสั่งซื้อเกินจำนวนสินค้าคงเหลือ')
    }
}

const decrementQuantity = (item: Product) => {
    if (item.QuantityToOrder > 0) {
        item.QuantityToOrder--
        updateSubTotal(item)
    }
}

const updateSubTotal = (item: Product) => {
    const existingItemIndex = subTotalItems.value.findIndex(subItem => subItem.Id === item.Id)
    if (existingItemIndex >= 0) {
        subTotalItems.value[existingItemIndex].QuantityToOrder = item.QuantityToOrder
        if (item.QuantityToOrder === 0) {
            subTotalItems.value.splice(existingItemIndex, 1)
        }
    } else if (item.QuantityToOrder > 0) {
        subTotalItems.value.push(item)
    }
}

onMounted(fetchData)
</script>

<style >
::v-deep .css-dev-only-do-not-override-1p3hq3p .ant-list .ant-list-item {
  padding: 8px 16px; /* ลด padding */
}
</style>