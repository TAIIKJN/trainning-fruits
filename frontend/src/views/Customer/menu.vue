<template>
  <div class="mx-auto container py-16 px-2 min-h-screen">
    <div>
      <div
        class="mx-auto justify-center px-2 md:flex md:space-x-6 xl:px-0 min-h-[calc(100vh-12rem)]"
      >
        <div class="rounded-lg md:w-2/3 overflow-y-auto no-scrollbar">
          <div class="h-full">
            <div
              class="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
            >
              <div
                v-for="item in products"
                :key="item.Id"
                class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
              >
                <div
                  class="flex justify-between items-center p-3 sm:p-5 bg-gray-100"
                >
                  <div class="flex flex-col">
                    <h3 class="text-gray-700 uppercase">
                      {{ item.ProductName }}
                    </h3>

                    <span class="text-gray-500 text-sm"
                      >฿{{ item.UnitPrice }}</span
                    >
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
                    type="button"
                    @click="decrementQuantity(item)"
                  >
                    <span class="sr-only">Decrease quantity</span>
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <input
                      type="number"
                      v-model.number="item.QuantityToOrder"
                      min="0"
                      :max="item.UnitsInStock"
                      class="bg-gray-50 w-24 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                      placeholder="0"
                      required
                    />
                    <p class="text-xs text-gray-500 mt-1">
                      (สินค้าคงเหลือ: {{ item.UnitsInStock }})
                    </p>
                  </div>
                  <button
                    class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                    type="button"
                    @click="incrementQuantity(item)"
                  >
                    <span class="sr-only">Increase quantity</span>
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Sub total -->
        <div
          class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
        >
          <div
            v-for="(item, index) in subTotalItems"
            :key="index"
            class="mb-2 flex justify-between"
          >
            <p class="text-gray-700">{{ item.ProductName }}</p>
            <p class="text-gray-700">
              ฿{{ item.UnitPrice }} x {{ item.QuantityToOrder }}
            </p>
          </div>

          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="">
              <p class="mb-1 text-lg font-bold">{{ totalAmount }} บาท</p>
            </div>
          </div>

          <button
            class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            @click="showServiceTypeModal"
            :disabled="loading"
          >
            {{ loading ? "กำลังดำเนินการ..." : "Check out" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <a-modal
    v-model:open="isServiceTypeModalVisible"
    title="เลือกประเภทการสั่งอาหาร"
    :footer="null"
  >
    <div class="grid grid-cols-2 gap-4 p-4">
      <div
        @click="handleServiceTypeSelection('Dine-in')"
        class="flex flex-col h-full max-w-lg mx-auto rounded-lg cursor-pointer duration-150 hover:scale-105"
      >
        <img class="rounded-lg rounded-b-none" src="/Takeaway.png" />
        <div
          class="py-2 px-4 flex flex-col bg-gray-800 items-center justify-center rounded-b-lg"
        >
          <h1
            class="text-xl font-medium text-gray-300 hover:text-blue-500 cursor-pointer"
          >
            ทานที่ร้าน
          </h1>
          <p class="text-gray-400 font-normal">Dine-in</p>
        </div>
      </div>

      <div
        @click="handleServiceTypeSelection('Takeaway')"
        class="flex flex-col h-full max-w-lg mx-auto rounded-lg cursor-pointer duration-150 hover:scale-105"
      >
        <img class="rounded-lg rounded-b-none" src="/Dinein.png" />
        <div
          class="py-2 px-4 flex flex-col bg-gray-800 items-center justify-center rounded-b-lg"
        >
          <h1
            class="text-xl font-medium text-gray-300 hover:text-blue-500 cursor-pointer"
          >
            สั่งกลับบ้าน
          </h1>
          <p class="text-gray-400 font-normal">Take-away</p>
        </div>
      </div>
    </div>
  </a-modal>

  <!-- Table Selection Modal -->
  <a-modal
    v-model:open="isTableModalVisible"
    title="เลือกโต๊ะ"
    @ok="handleTableSelection"
    @cancel="handleModalCancel"
    okText="ยืนยัน"
    cancelText="ยกเลิก"
    :maskClosable="false"
    width="600px"
  >
    <div class="grid grid-cols-4 gap-4 p-4">
      <button
        v-for="table in tables"
        :key="table.Id"
        class="h-16 rounded-lg border-2 transition-all duration-200 ease-in-out relative"
        :class="[
          selectedTable === table.Id
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : table.State === 'Available'
            ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
            : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60',
        ]"
        @click="handleTableClick(table)"
        :disabled="table.State !== 'Available'"
      >
        <div class="flex flex-col items-center">
          <span
            class="text-lg font-medium"
            :class="{
              'text-gray-500': table.State !== 'Available',
            }"
            >โต๊ะ {{ table.Name }}</span
          >
          <span
            class="text-sm"
            :class="{
              'text-green-600': table.State === 'Available',
              'text-red-600': table.State === 'Occupied',
              'text-orange-600': table.State === 'CleaningProgress',
            }"
          >
            {{ translateState(table.State) }}
          </span>
        </div>
      </button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { message } from "ant-design-vue";
import HttpService from "../../services/HttpService";
import KeycloakService from "../../services/KeycloakService";

interface Product {
  Id: string;
  ProductName: string;
  CategoryId: string;
  UnitPrice: string;
  QuantityPerUnit: string;
  UnitsInStock: number;
  UnitsOnOrder: number;
  Discontinued: number;
  SupplierId: string;
  QuantityToOrder: number;
}

interface Employee {
  UserName: string;
  State: string;
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
  TableId?: string;
  TypeService: string;
  State: string;
  OrderDetail: OrderDetail[];
}
interface TableItem {
  Id: string;
  Name: string;
  Description: string;
  State: string;
}

const isServiceTypeModalVisible = ref(false);
const selectedServiceType = ref("");

const isTableModalVisible = ref(false);
const selectedTable = ref<string>("");

const tables = ref<TableItem[]>([]);
const loading = ref(false);

const employees = ref<Employee[]>([]);

const products = ref<Product[]>([]);
const subTotalItems = ref<Product[]>([]);
const totalAmount = computed(() => {
  return subTotalItems.value.reduce(
    (total, item) => total + parseFloat(item.UnitPrice) * item.QuantityToOrder,
    0
  );
});

const fetchTables = async () => {
  try {
    loading.value = true;
    const response = await HttpService.getAxiosClient().get("/Table");
    tables.value = response.data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    message.error("ไม่สามารถโหลดข้อมูลโต๊ะได้");
  } finally {
    loading.value = false;
  }
};
const handleTableClick = (table: TableItem) => {
  if (table.State === "Available") {
    selectedTable.value = table.Id;
  }
};

const handleTableSelection = async () => {
  if (!selectedTable.value) {
    message.warning("กรุณาเลือกโต๊ะก่อนดำเนินการต่อ");
    return;
  }

  isTableModalVisible.value = false;
  await handleCheckout();
};
const handleModalCancel = () => {
  selectedTable.value = "";
  isTableModalVisible.value = false;
};

const showServiceTypeModal = () => {
  if (subTotalItems.value.length === 0) {
    message.warning("กรุณาเลือกสินค้าก่อนสั่งซื้อ");
    return;
  }

  if (!KeycloakService.IsLoggedIn()) {
    message.error("กรุณาเข้าสู่ระบบก่อนสั่งซื้อ");
    return;
  }

  isServiceTypeModalVisible.value = true;
};

const handleServiceTypeSelection = (type: string) => {
  selectedServiceType.value = type;
  isServiceTypeModalVisible.value = false;

  if (type === "Dine-in") {
    isTableModalVisible.value = true;
    fetchTables();
  } else {
    handleCheckout();
  }
};
const fetchData = async () => {
  loading.value = true;
  try {
    const [productsRes, employeesRes] = await Promise.all([
      HttpService.getAxiosClient().get("/Product"),
      HttpService.getAxiosClient().get("/Employee"),
    ]);
    products.value = productsRes.data.map((product: Product) => ({
      ...product,
      QuantityToOrder: 0,
    }));
    employees.value = employeesRes.data.filter(
      (employee: Employee) => employee.State === "Checked-In"
    );
  } catch (error) {
    message.error("ไม่สามารถโหลดข้อมูลได้");
  } finally {
    loading.value = false;
  }
};

const getRandomEmployee = (): string => {
  const availableEmployees = employees.value.filter(
    (employee: Employee) => employee.State === "Checked-In"
  );

  if (availableEmployees.length === 0) {
    message.warning("ไม่มีพนักงานที่พร้อมรับออเดอร์ในขณะนี้");
    throw new Error("ไม่พบพนักงานที่พร้อมรับออเดอร์");
  }

  const randomIndex = Math.floor(Math.random() * availableEmployees.length);
  return availableEmployees[randomIndex].UserName;
};

const getCustomerId = (): string => {
  try {
    const decodedToken = KeycloakService.GetDecodeToken();

    if (!decodedToken?.preferred_username) {
      message.warning("ไม่พบข้อมูลผู้ใช้ ใช้ชื่อผู้ใช้เริ่มต้น");
      return "GuestUser";
    }
    return decodedToken.preferred_username;
  } catch (error) {
    message.error("ไม่สามารถระบุตัวตนได้");
    throw error;
  }
};

const handleCheckout = async () => {
  if (!KeycloakService.IsLoggedIn()) {
    message.error("กรุณาเข้าสู่ระบบก่อนสั่งซื้อ");
    return;
  }

  if (subTotalItems.value.length === 0) {
    message.warning("กรุณาเลือกสินค้าก่อนสั่งซื้อ");
    return;
  }

  try {
    loading.value = true;

    const customerUserName = getCustomerId();
    const employeeUserName = getRandomEmployee();

    const orderData: Order = {
      CustomerUserName: customerUserName,
      EmployeeUserName: employeeUserName,
      OrderDate: new Date().toISOString(),
      TotalPrice: totalAmount.value,
      TypeService: selectedServiceType.value,
      State: "Pending",
      OrderDetail: subTotalItems.value.map((item) => ({
        Discount: 0,
        ProductId: item.Id,
        Quantity: item.QuantityToOrder,
        UnitPrice: item.UnitPrice,
      })),
    };

    if (selectedServiceType.value === "Dine-in") {
      orderData.TableId = selectedTable.value;
    }

    const response = await HttpService.getAxiosClient().post("/Order", orderData);
    
    if (response.data && response.data.status === 500) {
      const errorMessage = response.data.message || "เกิดข้อผิดพลาดภายในระบบ";
      message.error(errorMessage);
      return;
    }


    message.success("สั่งซื้อสำเร็จ");
    subTotalItems.value = [];
    selectedTable.value = "";
    products.value.forEach((product) => {
      product.QuantityToOrder = 0;
    });
  } catch (error) {
    console.error("API call failed:", error);
    message.error("ไม่สามารถสั่งซื้อได้");
  } finally {
    loading.value = false;
  }
};

const incrementQuantity = (item: Product) => {
  if (item.QuantityToOrder < item.UnitsInStock) {
    item.QuantityToOrder++;
    updateSubTotal(item);
  } else {
    message.warning("ไม่สามารถสั่งซื้อเกินจำนวนสินค้าคงเหลือ");
  }
};

const decrementQuantity = (item: Product) => {
  if (item.QuantityToOrder > 0) {
    item.QuantityToOrder--;
    updateSubTotal(item);
  }
};

const updateSubTotal = (item: Product) => {
  const existingItemIndex = subTotalItems.value.findIndex(
    (subItem) => subItem.Id === item.Id
  );
  if (existingItemIndex >= 0) {
    subTotalItems.value[existingItemIndex].QuantityToOrder =
      item.QuantityToOrder;
    if (item.QuantityToOrder === 0) {
      subTotalItems.value.splice(existingItemIndex, 1);
    }
  } else if (item.QuantityToOrder > 0) {
    subTotalItems.value.push(item);
  }
};
const translateState = (state: string): string => {
  switch (state) {
    case "Available":
      return "ว่าง";
    case "Occupied":
      return "ไม่ว่าง";
    case "CleaningProgress":
      return "กำลังทําความสะอาด";
    default:
      return state;
  }
};
onMounted(fetchData);
</script>

<style>
::v-deep .css-dev-only-do-not-override-1p3hq3p .ant-list .ant-list-item {
  padding: 8px 16px;
  /* ลด padding */
}
</style>
