<template>
    <div class="mx-auto container py-24 px-6">
        <div class="flex items-center justify-center mb-4">

            <a-segmented v-model:value="value" block :options="options" size="large"
             class="w-full  bg-blue-200" />

        </div>
        <a-list v-if="value === 'grid'" :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }" :data-source="products">
            <template #renderItem="{ item }">
                <a-list-item>
                    <div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
                        <div class="flex justify-between items-center p-5 bg-gray-100">
                            <div class="flex flex-col">
                                <h3 class="text-gray-700 uppercase">{{ item.ProductName }}</h3>

                                <span class="text-gray-500 text-sm">฿{{ item.UnitPrice }}</span>
                            </div>
                            <div class="flex flex-col items-end">
                                <button
                                    class="p-2 rounded-full bg-blue-600 text-white mt-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                    <svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                                        </path>
                                    </svg>
                                </button>
                            </div>

                        </div>
                        <div class="flex items-start justify-center mt-2">
                            <button
                                class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                type="button" @click="decrementQuantity(item)">
                                <span class="sr-only">Decrease quantity</span>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 18 2">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M1 1h16" />
                                </svg>
                            </button>
                            <div>
                                <input type="number" v-model.number="item.QuantityToOrder" min="0"
                                    :max="item.UnitsInStock"
                                    class="bg-gray-50 w-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                                    placeholder="0" required />
                                <p class="text-xs text-gray-500 mt-1">(สินค้าคงเหลือ: {{ item.UnitsInStock }})</p>
                            </div>
                            <button
                                class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                type="button" @click="incrementQuantity(item)">
                                <span class="sr-only">Increase quantity</span>
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </a-list-item>
            </template>
        </a-list>

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
import { ref, onMounted, reactive, h } from 'vue'
import { message } from 'ant-design-vue'
import HttpService from '../../services/HttpService'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons-vue'; // Import Ant Design Vue icons

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

const products = ref<Product[]>([])
const loading = ref(false)

const fetchData = async () => {
    loading.value = true
    try {
        const [productsRes] = await Promise.all([
            HttpService.getAxiosClient().get('/Product'),
        ])
        products.value = productsRes.data.map((product: Product) => ({ ...product, QuantityToOrder: 0 }))
    } catch (error) {
        message.error('ไม่สามารถโหลดข้อมูลได้')
    } finally {
        loading.value = false
    }
}

const incrementQuantity = (record: Product) => {
    if (record.QuantityToOrder < record.UnitsInStock) {
        record.QuantityToOrder += 1;
    } else {
        message.warning('ไม่สามารถสั่งซื้อเกินจำนวนสินค้าคงเหลือ');
    }
};
const handleQuantityChange = (record: Product, value: number) => {
    if (value > record.UnitsInStock) {
        record.QuantityToOrder = record.UnitsInStock;
        message.warning('ไม่สามารถสั่งซื้อเกินจำนวนสินค้าคงเหลือ');
    } else if (value < 0) {
        record.QuantityToOrder = 0;
    } else {
        record.QuantityToOrder = value;
    }
};
const decrementQuantity = (record: Product) => {
    if ((record.QuantityToOrder || 0) > 0) {
        record.QuantityToOrder--
    }
}

onMounted(fetchData)
</script>
