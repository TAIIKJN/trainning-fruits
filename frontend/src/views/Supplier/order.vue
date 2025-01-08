<template>
    <div class="p-6">
        <a-card title="Orders" class="w-full">
            <a-table :dataSource="order" :columns="columns" :loading="loading" rowKey="Id">
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

                    <!-- Employee Name Column -->
                    <template v-if="column.key === 'EmployeeId'">
                        {{ getEmployeeName(record.EmployeeId) }}
                    </template>
                    <!-- TotalPrice Column -->
                    <template v-if="column.key === 'TotalPrice'">
                        ฿{{ record.TotalPrice ? record.TotalPrice.toLocaleString() : '0' }}
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
            <a-drawer v-model:open="detailsVisible" title="Order Details" placement="right" width="800" :closable="true"
                @close="closeDrawer">
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
                    <div class="w-full flex justify-center items-center">
                        <button @click="updateOrderState"
                            class="hover:bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-full bg-gray-800 text-base font-medium leading-4 text-white">ยืนยัน</button>
                    </div>
                </template>
            </a-drawer>
        </a-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import HttpService from '../../services/HttpService';
import { message } from 'ant-design-vue'

interface Employee {
    Id: string;
    FirstName: string;
    LastName: string;
    UserName: string;
}
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

const order = ref<Order[]>([]);
const employees = ref<Employee[]>([]);

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
        title: 'Employee',
        dataIndex: 'EmployeeId',
        key: 'EmployeeId',
        width: '180px',
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

const fetchEmployees = async () => {
    try {
        const response = await HttpService.getAxiosClient().get('/Employee');
        employees.value = response.data;
    } catch (error) {
        console.error('Error fetching employees:', error);
    }
};

const getEmployeeName = (employeeId: string) => {
    const employee = employees.value.find(e => e.Id === employeeId);
    return employee ? `${employee.FirstName} ${employee.LastName}` : 'Unknown Employee';
};
const fetchProducts = async () => {
    try {
        const response = await HttpService.getAxiosClient().get('/Product');
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const fetchOrders = async () => {
    loading.value = true;
    try {
        const response = await HttpService.getAxiosClient().get('/Order');
        order.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    finally {
        loading.value = false;
    }
};

const getProductName = (ProductId: string) => {
    const product = products.value.find(p => p.Id === ProductId);
    return product ? product.ProductName : 'Unknown Product';
};

const getCustomerUsername = async (customerId: string): Promise<string | null> => {
    try {
        const response = await HttpService.getAxiosClient().get(`/Customer/${customerId}`);
        return response.data?.UserName || null;
    } catch (error) {
        console.error('Error fetching customer username:', error);
        return null;
    }
};

const getEmployeeUsername = (employeeId: string): string | null => {
    const employee = employees.value.find(e => e.Id === employeeId);
    return employee ? employee.UserName : null;
};

const updateOrderState = async () => {
    if (!selectedOrder.value) return;

    try {
        loading.value = true;

        const { CustomerId, EmployeeId, ...rest } = selectedOrder.value;

        // ดึง Username จาก CustomerId และ EmployeeId
        const customerUserName = await getCustomerUsername(CustomerId);
        const employeeUserName = getEmployeeUsername(EmployeeId);

        if (!customerUserName || !employeeUserName) {
            message.error('Failed to retrieve necessary user data.');
            return;
        }

        const payload = {
            ...rest,
            State: 'InProgress',
            CustomerUserName: customerUserName,
            EmployeeUserName: employeeUserName,
        };

        // ส่งข้อมูลไปยัง API
        await HttpService.getAxiosClient().patch(`/Order/${selectedOrder.value.Id}`, payload);

        // อัปเดตข้อมูลใน local state
        order.value = order.value.map(order =>
            order.Id === selectedOrder.value?.Id ? { ...order, State: 'InProgress' } : order
        );

        closeDrawer();

        message.success('Order has been updated to "InProgress" successfully!');
    } catch (error) {
        console.error('Error updating order state:', error);
        message.error('Failed to update the order state.');
    } finally {
        loading.value = false;
    }
};

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
        order.value = order.value.map(order =>
            order.Id === orderId ? { ...order, State: 'Cancelled' } : order
        );
        // แสดงข้อความสำเร็จ
        message.success('Order has been cancelled successfully!');
    } catch (error) {
        console.error('Error cancelling order:', error);
        message.error('Failed to cancel the order.');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchProducts();
    fetchOrders();
    fetchEmployees();
});
</script>
