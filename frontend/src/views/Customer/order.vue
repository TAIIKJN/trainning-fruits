<template>
    <div class="p-6">
        <a-card title="Orders" class="w-full">
            <a-table :dataSource="orders" :columns="columns" :loading="loading" rowKey="Id">
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
                            <a-button v-if="record.State !== 'Cancel'" danger size="small"
                                @click="cancelOrder(record.Id)">
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
                                <p class="text-gray-600 mb-1">พนักงานรับออเดอร์</p>
                                <p class="font-medium">{{ getEmployeeName(selectedOrder.EmployeeId) }}</p>
                            </div>
                            <div>
                                <p class="text-gray-600 mb-1">ลูกค้า</p>
                                <p class="font-medium">{{ selectedOrder.Customer.FirstName }} {{
                                    selectedOrder.Customer.LastName }}</p>
                            </div>
                            <div>
                                <p class="text-gray-600 mb-1">Status:</p>
                                <a-tag :color="getStateColor(selectedOrder.State)">
                                    {{ selectedOrder.State }}
                                </a-tag>
                            </div>
                            <div>
                                <p class="text-gray-600 mb-1">Total Price:</p>
                                <p class="font-medium text-lg">฿{{ calculateTotalPrice().toLocaleString() }}</p>
                            </div>
                        </div>

                        <div class="flex justify-end">
                            <template v-if="isEditing">
                                <a-button danger @click="toggleEdit">
                                    Cancel Edit
                                </a-button>
                            </template>
                            <template v-else>
                                <a-button type="primary" @click="toggleEdit"
                                    :disabled="selectedOrder.State !== 'Pending'"
                                    style="background-color: #F14A00; border-color: #FFF2C2">
                                    Edit Order
                                </a-button>
                            </template>
                        </div>

                        <div>
                            <h3 class="text-lg font-medium mb-4">Order Items</h3>
                            <template v-if="isEditing">

                                <a-table :dataSource="editableOrderDetails" :columns="editableColumns" rowKey="Id">
                                    <template #bodyCell="{ column, record }">
                                        <template v-if="column.key === 'quantity'">
                                            <a-input-number v-model:value="record.Quantity" :min="1" />
                                        </template>
                                        <template v-if="column.key === 'total'">
                                            ฿{{ (record.Quantity * Number(record.UnitPrice)).toLocaleString() }}
                                        </template>
                                        <template v-if="column.key === 'actions'">
                                            <a-button type="link" danger
                                                @click="removeProduct(record)">Remove</a-button>
                                        </template>
                                    </template>
                                </a-table>

                                <div class="flex justify-end mt-4">
                                    <a-button type="primary" @click="saveChanges">Save Changes</a-button>
                                </div>
                            </template>
                            <template v-else>
                                <a-table :dataSource="selectedOrder.OrderDetail" :columns="detailColumns" rowKey="Id"
                                    :pagination="false">
                                    <template #bodyCell="{ column, record }">
                                        <template v-if="column.key === 'total'">
                                            ฿{{ (record.Quantity * Number(record.UnitPrice)).toLocaleString() }}
                                        </template>
                                    </template>
                                </a-table>
                            </template>
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
import KeycloakService from '../../services/KeycloakService'
import dayjs from 'dayjs';
import { message } from 'ant-design-vue';

interface Employee {
    Id: string;
    FirstName: string;
    LastName: string;
}
interface Product {
    Id: string;
    ProductName: string;
    UnitPrice: string;
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
    Customer: {
        FirstName: string;
        LastName: string;
    }
}


const orders = ref<Order[]>([]);
const employees = ref<Employee[]>([]);

const loading = ref(true);
const detailsVisible = ref(false);
const selectedOrder = ref<Order | null>(null);

const products = ref<Product[]>([]);

const isEditing = ref(false);
const editableOrderDetails = ref<OrderDetail[]>([]);
const newProduct = ref({
    ProductId: '',
    Quantity: 1
});


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

const editableColumns = [
    {
        title: 'Product Name',
        dataIndex: 'ProductId',
        key: 'ProductId',
        customRender: ({ text }: { text: string }) => getProductName(text),
    },
    {
        title: 'Quantity',
        dataIndex: 'Quantity',
        key: 'quantity',
        width: '150px',
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
    {
        title: 'Actions',
        key: 'actions',
        width: '100px',
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
    try {
        loading.value = true;

        // Step 1: Get preferred_username from KeycloakService
        const tokenData = KeycloakService.GetDecodeToken();
        const preferredUsername = tokenData?.preferred_username; // ดึงค่า preferred_username
        if (!preferredUsername) {
            console.error('Token data is invalid or preferred_username is missing.');
            return;
        }

        // Step 2: Fetch customers and find the matching CustomerId
        const customersResponse = await HttpService.getAxiosClient().get('/Customer');
        const customers = customersResponse.data;
        const customer = customers.find(
            (c: { UserName: string }) => c.UserName === preferredUsername // เทียบ preferred_username กับ UserName
        );

        if (!customer) {
            console.error(`No customer found matching preferred_username: ${preferredUsername}`);
            return;
        }

        const customerId = customer.Id;

        // Step 3: Fetch orders and filter by CustomerId
        const ordersResponse = await HttpService.getAxiosClient().get('/Order');
        const allOrders = ordersResponse.data;
        orders.value = allOrders.filter((order: Order) => order.CustomerId === customerId).reverse();
    } catch (error) {
        console.error('Error fetching orders:', error);
    } finally {
        loading.value = false;
    }
};



const getProductName = (ProductId: string) => {
    const product = products.value.find(p => p.Id === ProductId);
    return product ? product.ProductName : 'Unknown Product';
};


const formatDate = (date: string) => {
    return dayjs(date).format('DD-MM-YYYY');
};

const getStateColor = (state: string) => {
    const colors: Record<string, string> = {
        Pending: 'orange',
        InProgress: 'purple',
        Succeed: 'purple',
        Done: 'green',
        Cancel: 'red',

    };
    return colors[state] || 'blue';
};

const toggleEdit = async () => {
    // ถ้าไม่มีข้อมูล products ให้โหลดก่อน
    if (products.value.length === 0) {
        await fetchProducts();
    }

    if (isEditing.value) {
        isEditing.value = false;
        editableOrderDetails.value = [];
    } else {
        isEditing.value = true;
        editableOrderDetails.value = JSON.parse(JSON.stringify(selectedOrder.value?.OrderDetail || []));
    }
    newProduct.value = {
        ProductId: '',
        Quantity: 1
    };
};

// Function to remove product
const removeProduct = (record: OrderDetail) => {
    editableOrderDetails.value = editableOrderDetails.value.filter(item => item.Id !== record.Id);
};

// Function to calculate total price
const calculateTotalPrice = () => {
    if (isEditing.value) {
        return editableOrderDetails.value.reduce((total, item) => {
            return total + (item.Quantity * Number(item.UnitPrice));
        }, 0);
    }
    return selectedOrder.value?.TotalPrice || 0;
};

// Function to save changes
const saveChanges = async () => {
    try {
        if (!selectedOrder.value) return;

        const payload = {
            CustomerId: selectedOrder.value.CustomerId,
            EmployeeId: selectedOrder.value.EmployeeId,
            OrderDate: selectedOrder.value.OrderDate,
            TotalPrice: calculateTotalPrice(),
            Address: selectedOrder.value.Address,
            State: selectedOrder.value.State,
            OrderDetail: editableOrderDetails.value.map(detail => ({
                ...detail,
            }))
        };

        await HttpService.getAxiosClient().patch(`/Order/${selectedOrder.value.Id}`, payload);

        // Update local state
        if (selectedOrder.value) {
            selectedOrder.value.OrderDetail = [...editableOrderDetails.value];
            selectedOrder.value.TotalPrice = calculateTotalPrice();
        }

        // Update orders list
        orders.value = orders.value.map(order =>
            order.Id === selectedOrder.value?.Id
                ? { ...order, OrderDetail: [...editableOrderDetails.value], TotalPrice: calculateTotalPrice() }
                : order
        );

        message.success('Order updated successfully!');
        isEditing.value = false;
    } catch (error) {
        console.error('Error updating order:', error);
        message.error('Failed to update the order.');
    }
};
const viewDetails = (order: Order) => {
    selectedOrder.value = order;
    detailsVisible.value = true;
};

const closeDrawer = () => {
    detailsVisible.value = false;
    selectedOrder.value = null;
    isEditing.value = false;
    editableOrderDetails.value = [];
};

const cancelOrder = async (orderId: string) => {
    try {
        loading.value = true;

        const existingOrder = orders.value.find(order => order.Id === orderId);

        if (!existingOrder) {
            message.error('Order not found!');
            return;
        }

        const payload = {
            CustomerId: existingOrder.CustomerId,
            EmployeeId: existingOrder.EmployeeId,
            OrderDate: existingOrder.OrderDate,
            TotalPrice: existingOrder.TotalPrice,
            Address: existingOrder.Address,
            State: 'Cancel',
            OrderDetail: existingOrder.OrderDetail.map(detail => ({
                ...detail,
            }))
        };

        await HttpService.getAxiosClient().patch(`/Order/${orderId}`, payload);

        orders.value = orders.value.map(order =>
            order.Id === orderId ? { ...order, State: 'Cancel' } : order
        );

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
