<template>
  <div class="p-6">
    <a-card title="คำสั่งซื้อ" class="w-full">
      <a-table
        :dataSource="orders"
        :columns="columns"
        :loading="loading"
        rowKey="Id"
      >
        <!-- State Column -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'State'">
            <a-tag :color="getStateColor(record.State)">
              {{ translateState(record.State) }}
            </a-tag>
          </template>
          <template v-if="column.key === 'Table'">
            <a-tag
              :color="record.Table ? 'green' : 'volcano'"
              style="border-radius: 4px; padding: 5px 10px; font-weight: bold"
            >
              {{ record.Table ? record.Table.Name : "สั่งกลับบ้าน" }}
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
              <a-button
                type="primary"
                size="small"
                @click="viewDetails(record)"
              >
                รายละเอียดคำสั่งซื้อ
              </a-button>
              <a-button
                v-if="record.State !== 'Cancel' && record?.State !== 'Done' && record?.State !== 'done'"
                danger
                size="small"
                @click="cancelOrder(record.Id)"
              >
                ยกเลิกคำสั่งซื้อ
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- Order Details Drawer -->
      <a-drawer
        v-model:open="detailsVisible"
        title="รายละเอียดคำสั่งซื้อ"
        placement="right"
        width="800"
        :closable="true"
        @close="closeDrawer"
      >
        <template v-if="selectedOrder">
          <div class="space-y-2">
            <div class="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
              <div>
                <p class="text-gray-600 mb-1">รหัสคำสั่งซื้อ :</p>
                <p class="font-medium">{{ selectedOrder.OrderCode }}</p>
                <div>
                 <div class="text-gray-600 mb-1"> หมายเลขโต๊ะ :  
                  <a-tag
                    :color="selectedOrder.Table ? 'green' : 'volcano'"
                    style="
                      border-radius: 4px;
                      padding: 5px 10px;
                      font-weight: bold;
                    "
                  >
                    {{
                      selectedOrder.Table
                        ? selectedOrder.Table.Name
                        : "สั่งกลับบ้าน"
                    }}
                  </a-tag>
                </div>
              </div>
              </div>
              <div>
                <p class="text-gray-600 mb-1">วันที่สั่งอาหาร :</p>
                <p class="font-medium">
                  {{ formatDate(selectedOrder.OrderDate) }}
                </p>
              </div>
              <div>
                <p class="text-gray-600 mb-1">พนักงานรับออเดอร์ : </p>
                <p class="font-medium">
                  {{ selectedOrder.Employee.FirstName }}
                  {{ selectedOrder.Employee.LastName }}
                </p>
              </div>
              <div>
                <p class="text-gray-600 mb-1">ชื่อลูกค้า : </p>
                <p class="font-medium">
                  {{ selectedOrder.Customer.FirstName }}
                  {{ selectedOrder.Customer.LastName }}
                </p>
              </div>
              <div>
                <p class="text-gray-600 mb-1">สถานะ : </p>
                <a-tag :color="getStateColor(selectedOrder.State)">
                  {{ translateState(selectedOrder.State) }}
                </a-tag>
              </div>
              <div>
                <p class="text-gray-600 mb-1">ราคารวม :</p>
                <p class="font-medium text-lg">
                  ฿{{ selectedOrder.TotalPrice.toLocaleString() }}
                </p>
              </div>
            </div>
            <div class="flex justify-end">
              <template v-if="isEditing">
                <a-button danger @click="toggleEdit"> Cancel Edit </a-button>
              </template>
              <template v-else>
                <a-button
                  type="primary"
                  @click="toggleEdit"
                  :disabled="selectedOrder.State !== 'Pending'"
                  style="background-color: #f14a00; border-color: #fff2c2"
                >
                  Edit Order
                </a-button>
              </template>
            </div>

            <div>
              <h3 class="text-lg font-medium mb-4">รายละเอียดคำสั่งซื้อ</h3>
              <template v-if="isEditing">
                <a-table
                  :dataSource="editableOrderDetails"
                  :columns="editableColumns"
                  rowKey="Id"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'quantity'">
                      <a-input-number
                        v-model:value="record.Quantity"
                        :min="1"
                      />
                    </template>
                    <template v-if="column.key === 'total'">
                      ฿{{
                        (
                          record.Quantity * Number(record.UnitPrice)
                        ).toLocaleString()
                      }}
                    </template>
                    <template v-if="column.key === 'actions'">
                      <a-button
                        type="link"
                        danger
                        @click="removeProduct(record)"
                        >Remove</a-button
                      >
                    </template>
                  </template>
                </a-table>

                <div class="flex justify-end mt-4">
                  <a-button type="primary" @click="saveChanges"
                    >Save Changes</a-button
                  >
                </div>
              </template>
              <template v-else>
                <a-table
                  :dataSource="selectedOrder.OrderDetail"
                  :columns="detailColumns"
                  rowKey="Id"
                  :pagination="false"
                >
                  <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'total'">
                      ฿{{
                        (
                          record.Quantity * Number(record.UnitPrice)
                        ).toLocaleString()
                      }}
                    </template>
                  </template>
                </a-table>
              </template>
            </div>
          </div>
          <div class="w-full flex justify-center items-center">
            <button
              v-if="
                selectedOrder?.State !== 'Cancel' &&
                selectedOrder?.State !== 'Done' &&
                selectedOrder?.State !== 'done' &&
                !isEditing
              "
              @click="handleOrderAction"
              :class="[
                'focus:outline-none focus:ring-2 focus:ring-offset-2 py-5 w-full text-base font-medium leading-4 text-white',
                selectedOrder?.State === 'Pending'
                  ? 'bg-gray-800 focus:ring-gray-800 hover:bg-black '
                  : 'bg-green-600 focus:ring-green-600 hover:bg-green-700',
              ]"
            >
              {{ getButtonText(selectedOrder?.State) }}
            </button>
          </div>
        </template>
      </a-drawer>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import HttpService from "../../services/HttpService";
import { message } from "ant-design-vue";
import dayjs from "dayjs";
import "dayjs/locale/th";

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
  OrderCode:string;
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
  };
  Employee: {
    FirstName: string;
    LastName: string;
  };
  Table?: {
    Name?: string;
  };
}

const orders = ref<Order[]>([]);
const loading = ref(true);
const detailsVisible = ref(false);
const selectedOrder = ref<Order | null>(null);

const products = ref<{ Id: string; ProductName: string;UnitPrice:string }[]>([]);
const isEditing = ref(false);
const editableOrderDetails = ref<OrderDetail[]>([]);
const newProduct = ref({
  ProductId: "",
  Quantity: 1,
});
const columns = [
  {
    title: "รหัสคำสั่งซื้อ",
    dataIndex: "OrderCode",
    key: "OrderCode",
    width: "200px",
  },
  {
    title: "หมายเลขโต๊ะ",
    dataIndex: "Table",
    key: "Table",
    width: "180px",
  },
  {
    title: "วันที่สั่งอาหาร",
    dataIndex: "OrderDate",
    key: "OrderDate",
    width: "150px",
  },
  {
    title: "สถานะ",
    dataIndex: "State",
    key: "State",
    width: "120px",
  },
  {
    title: "ราคารวม",
    dataIndex: "TotalPrice",
    key: "TotalPrice",
    width: "150px",
  },
  {
    title: "การจัดการ",
    key: "actions",
    width: "120px",
  },
];

const detailColumns = [
  {
    title: "ชื่อสินค้า",
    dataIndex: "ProductId",
    key: "ProductId",
    customRender: ({ text }: { text: string }) => getProductName(text),
  },
  {
    title: "จำนวน",
    dataIndex: "Quantity",
    key: "Quantity",
    width: "100px",
  },
  {
    title: "ราคา",
    dataIndex: "UnitPrice",
    key: "UnitPrice",
    width: "100px",
    customRender: ({ text }: { text: string }) =>
      `฿${Number(text).toLocaleString()}`,
  },
  {
    title:"ส่วนลด",
    dataIndex: "Discount",
    key: "Discount",
    width: "100px",
  },
  {
    title: "ยอดรวม",
    key: "total",
    width: "150px",
  },
];

const editableColumns = [
  {
    title: "ชื่อสินค้า",
    dataIndex: "ProductId",
    key: "ProductId",
    customRender: ({ text }: { text: string }) => getProductName(text),
  },
  {
    title: "จำนวน",
    dataIndex: "Quantity",
    key: "quantity",
    width: "150px",
  },
  {
    title: "ราคา",
    dataIndex: "UnitPrice",
    key: "UnitPrice",
    width: "100px",
    customRender: ({ text }: { text: string }) =>
      `฿${Number(text).toLocaleString()}`,
  },
  {
    title:"ส่วนลด",
    dataIndex: "Discount",
    key: "Discount",
    width: "100px",
    customRender: ({ text }: { text: string }) =>
      `฿${Number(text).toLocaleString()}`,
  },
  {
    title: "ยอดรวม",
    key: "total",
    width: "100px",
  },
  {
    title: "การจัดการ",
    key: "actions",
    width: "100px",
  },
];
const fetchProducts = async () => {
  try {
    const response = await HttpService.getAxiosClient().get("/Product");
    products.value = response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const fetchOrders = async () => {
  try {
    loading.value = true;
    const response = await HttpService.getAxiosClient().get("/Order");
    orders.value = response.data.reverse();
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    loading.value = false;
  }
};

const getProductName = (ProductId: string) => {
  const product = products.value.find((p) => p.Id === ProductId);  
  return product?product.ProductName:"ไม่พบสินค้า";
};

const formatDate = (date: string) => {
  dayjs.locale("th");
 const thaiDate = dayjs(date).add(543, "year").format("D MMMM YYYY");
  return thaiDate;
};

const getStateColor = (state: string) => {
  const stateToLower = state.toLocaleLowerCase()
  const colors: Record<string, string> = {
    pending: "orange",
    inProgress: "purple",
    succeed: "purple",
    done: "green",
    cancel: "red",
  };
  return colors[stateToLower] || "blue";
};
const getButtonText = (state: string) => {
  switch (state) {
    case "Pending":
      return "ยืนยันคำสั่งซื้อ";
    case "InProgress":
      return "พร้อมเสริฟ";
    default:
      return "";
  }
};
const translateState = (state: string): string => {
  const stateToLower = state.toLocaleLowerCase()
  switch (stateToLower) {
    case "pending":
      return "รอดำเนินการ";
    case "inProgress":
      return "กำลังทำอาหาร";
    case "succeed":
      return "พร้อมเสริฟ";
    case "done":
      return "เสร็จสิ้น";
    case "cancel":
      return "ยกเลิก";
    default:
      return state;
  }
};
const handleOrderAction = async () => {
  if (!selectedOrder.value) return;

  try {
    loading.value = true;

    const newState =
      selectedOrder.value.State === "Pending"
        ? "InProgress"
        : selectedOrder.value.State === "InProgress"
        ? "Done"
        : null;

    if (!newState) return;

    const {
      CustomerId,
      EmployeeId,
      OrderDate,
      TotalPrice,
      Address,
      OrderDetail,
    } = selectedOrder.value;
    const payload = {
      CustomerId,
      EmployeeId,
      OrderDate,
      TotalPrice,
      Address,
      State: newState,
      OrderDetail: OrderDetail.map(
        ({ Discount, ProductId, Quantity, UnitPrice, Id, OrderId }) => ({
          Discount,
          ProductId,
          Quantity,
          UnitPrice,
          Id,
          OrderId,
        })
      ),
    };

    await HttpService.getAxiosClient().patch(
      `/Order/${selectedOrder.value.Id}`,
      payload
    );

    selectedOrder.value = {
      ...selectedOrder.value,
      State: newState,
    };
    orders.value = orders.value.map((order) =>
      order.Id === selectedOrder.value?.Id
        ? { ...order, State: newState }
        : order
    );

    message.success(`${newState} สำเร็จ`);
  } catch (error) {
    console.error("Error updating order state:", error);
    message.error("ไม่สามารถอัปเดตสถานะได้");
  } finally {
    loading.value = false;
  }
};

const viewDetails = (order: Order) => {
  selectedOrder.value = order;
  detailsVisible.value = true;
};

const closeDrawer = () => {
  detailsVisible.value = false;
  selectedOrder.value = null;
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
    editableOrderDetails.value = JSON.parse(
      JSON.stringify(selectedOrder.value?.OrderDetail || [])
    );
  }
  newProduct.value = {
    ProductId: "",
    Quantity: 1,
  };
};
const removeProduct = (record: OrderDetail) => {
  editableOrderDetails.value = editableOrderDetails.value.filter(
    (item) => item.Id !== record.Id
  );
};

const calculateTotalPrice = () => {
  if (isEditing.value) {
    return editableOrderDetails.value.reduce((total, item) => {
      return total + item.Quantity * Number(item.UnitPrice);
    }, 0);
  }
  return selectedOrder.value?.TotalPrice || 0;
};
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
      OrderDetail: editableOrderDetails.value.map((detail) => ({
        ...detail,
      })),
    };

    await HttpService.getAxiosClient().patch(
      `/Order/${selectedOrder.value.Id}`,
      payload
    );

    // Update local state
    if (selectedOrder.value) {
      selectedOrder.value.OrderDetail = [...editableOrderDetails.value];
      selectedOrder.value.TotalPrice = calculateTotalPrice();
    }

    // Update orders list
    orders.value = orders.value.map((order) =>
      order.Id === selectedOrder.value?.Id
        ? {
            ...order,
            OrderDetail: [...editableOrderDetails.value],
            TotalPrice: calculateTotalPrice(),
          }
        : order
    );

    message.success("Order updated successfully!");
    isEditing.value = false;
  } catch (error) {
    console.error("Error updating order:", error);
    message.error("Failed to update the order.");
  }
};
const cancelOrder = async (orderId: string) => {
  try {
    loading.value = true;

    const existingOrder = orders.value.find((order) => order.Id === orderId);

    if (!existingOrder) {
      message.error("Order not found!");
      return;
    }

    const payload = {
      CustomerId: existingOrder.CustomerId,
      EmployeeId: existingOrder.EmployeeId,
      OrderDate: existingOrder.OrderDate,
      TotalPrice: existingOrder.TotalPrice,
      Address: existingOrder.Address,
      State: "Cancel",
      OrderDetail: existingOrder.OrderDetail.map((detail) => ({
        ...detail,
      })),
    };

    await HttpService.getAxiosClient().patch(`/Order/${orderId}`, payload);

    orders.value = orders.value.map((order) =>
      order.Id === orderId ? { ...order, State: "Cancel" } : order
    );

    message.success("Order has been cancelled successfully!");
  } catch (error) {
    console.error("Error cancelling order:", error);
    message.error("Failed to cancel the order.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
  fetchOrders();
});
</script>
