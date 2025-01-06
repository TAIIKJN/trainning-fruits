<template>
    <div class="p-6">
        <a-card title="Orders" class="w-full">
            <a-table :dataSource="orders" :columns="columns" :loading="loading" rowKey="Id">
                <!-- State Column -->
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'State'">
                        <a-tag :color="getStateColor(record.State)">
                            {{ record.State }}
                        </a-tag>
                    </template>

                    <!-- OrderDate Column -->
                    <template v-if="column.key === 'OrderDate'">
                        {{ formatDate(record.OrderDate) }}
                    </template>

                    <!-- TotalPrice Column -->
                    <template v-if="column.key === 'TotalPrice'">
                        ฿{{ record.TotalPrice.toLocaleString() }}
                    </template>

                    <!-- Actions Column -->
                    <template v-if="column.key === 'actions'">
                        <a-space>
                            <a-button type="primary" size="small" @click="viewDetails(record)">
                                View Details
                            </a-button>
                            <a-button type="danger" size="small" @click="cancelOrder(record.Id)">
                                Cancel Order
                            </a-button>
                        </a-space>
                    </template>
                </template>
            </a-table>

            <!-- Order Details Drawer -->
            <a-drawer v-model:open="detailsVisible" title="Order Details" placement="right" width="800"
                :closable="true" @close="closeDrawer">
                <template v-if="selectedOrder">
                    <div class="space-y-6">
                        <!-- Order Info -->
                        <div class="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <p class="text-gray-600 mb-1">Order ID:</p>
                                <p class="font-medium">{{ selectedOrder.Id }}</p>
                            </div>
                            <div>
                                <p class="text-gray-600 mb-1">Order Date:</p>
                                <p class="font-medium">{{ formatDate(selectedOrder.OrderDate) }}</p>
                            </div>
                            <div>
                                <p class="text-gray-600 mb-1">Status:</p>
                                <a-tag :color="getStateColor(selectedOrder.State)">
                                    {{ selectedOrder.State }}
                                </a-tag>
                            </div>
                            <div>
                                <p class="text-gray-600 mb-1">Total Price:</p>
                                <p class="font-medium text-lg">฿{{ selectedOrder.TotalPrice.toLocaleString() }}</p>
                            </div>
                        </div>

                        <!-- Order Items Section -->
                        <div>
                            <h3 class="text-lg font-medium mb-4">Order Items</h3>
                            <a-table :dataSource="selectedOrder.OrderDetail" :columns="detailColumns" rowKey="Id"
                                :pagination="false">
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === 'total'">
                                        ฿{{ (record.Quantity * Number(record.UnitPrice)).toLocaleString() }}
                                    </template>
                                </template>
                            </a-table>
                        </div>
                    </div>
                </template>
            </a-drawer>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HttpService from '../../services/HttpService';

interface OrderDetail {
    Id: string;
    ProductId: string;
    Quantity: number;
    UnitPrice: string;
    Discount: number;
    OrderId: string;
}

interface Order {
    Id: string;
    CustomerId: string;
    EmployeeId: string;
    OrderDate: string;
    TotalPrice: number;
    Address: string;
    State: string;
    OrderDetail: OrderDetail[];
}

const orders = ref<Order[]>([]);
const loading = ref(true);
const detailsVisible = ref(false);
const selectedOrder = ref<Order | null>(null);

const products = ref<{ Id: string; ProductName: string }[]>([]);

const columns = [
    {
        title: 'Order ID',
        dataIndex: 'Id',
        key: 'Id',
        width: '220px',
    },
    {
        title: 'Order Date',
        dataIndex: 'OrderDate',
        key: 'OrderDate',
        width: '150px',
    },
    {
        title: 'Status',
        dataIndex: 'State',
        key: 'State',
        width: '120px',
    },
    {
        title: 'Total Price',
        dataIndex: 'TotalPrice',
        key: 'TotalPrice',
        width: '150px',
    },
    {
        title: 'Actions',
        key: 'actions',
        width: '120px',
    },
];

const detailColumns = [
{
        title: 'Product Name',
        dataIndex: 'ProductId',
        key: 'ProductId',
        customRender: ({ text }: { text: string }) => getProductName(text), 
    },
    {
        title: 'Quantity',
        dataIndex: 'Quantity',
        key: 'Quantity',
        width: '100px',
    },
    {
        title: 'Unit Price',
        dataIndex: 'UnitPrice',
        key: 'UnitPrice',
        width: '150px',
        customRender: ({ text }: { text: string }) => `฿${Number(text).toLocaleString()}`,
    },
    {
        title: 'Total',
        key: 'total',
        width: '150px',
    },
];

const fetchProducts = async () => {
    try {
        const response = await HttpService.getAxiosClient().get('/Product');
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const fetchOrders = async () => {
    try {
        loading.value = true;
        const response = await HttpService.getAxiosClient().get('/Order');
        orders.value = response.data.reverse();
    } catch (error) {
        console.error('Error fetching orders:', error);
    } finally {
        loading.value = false;
    }
};

const getProductName = (ProductId: string) => {
    const product = products.value.find(p => p.Id === ProductId);
    return product ? product.ProductName : 'Unknown Product';};


const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const getStateColor = (state: string) => {
    const colors: Record<string, string> = {
        Pending: 'orange',
        Completed: 'green',
        Cancelled: 'red',
    };
    return colors[state] || 'blue';
};


const viewDetails = (order: Order) => {
    selectedOrder.value = order;
    detailsVisible.value = true;
};

const closeDrawer = () => {
    detailsVisible.value = false;
    selectedOrder.value = null;
};
const cancelOrder = async (orderId: string) => {
    try {
        loading.value = true;
        await HttpService.getAxiosClient().delete(`/Order/${orderId}`);
        orders.value = orders.value.map(order =>
            order.Id === orderId ? { ...order, State: 'Cancelled' } : order
        );
        // แสดงข้อความสำเร็จ
        alert('Order has been cancelled successfully!');
    } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel the order.');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchProducts();
    fetchOrders();
});
</script>

