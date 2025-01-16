import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Fruits from '../views/fruits.vue'
import Product from '../views/Product/product.vue'
import Category from '../views/Product/category.vue'
import Supplier from '../views/Supplier/supplier.vue'
import EmployeeAdmin from '../views/Admin/employee.vue'
import customer from '../views/Customer/customer.vue'
import Menu from '../views/Customer/menu.vue'
import Order from '../views/Customer/order.vue'
import OrderEmployee from '../views/Employee/order.vue'
import OrderAdmin from '../views/Admin/order.vue'
import OrderSupplier from '../views/Supplier/order.vue'
import employee from '../views/Employee/employee.vue'
import customerAdmin from '../views/Admin/customer.vue'
import supplierAdmin from '../views/Admin/supplier.vue'
import MenuEmployee from '../views/Employee/menu.vue'
import Table from '../views/Admin/table.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/fruits', component: Fruits, meta: { requiresAuth: true } },
  {
    path: '/product',
    component: Product,
    meta: { requiresAuth: true }
  },
  {
    path: '/category',
    component: Category,
    meta: { requiresAuth: true }
  },
  { path: '/supplier', component: Supplier, meta: { requiresAuth: true } },
  { path: '/employee-admin', component: EmployeeAdmin, meta: { requiresAuth: true } },
  { path: '/customer', component: customer, meta: { requiresAuth: true } },
  { path: '/menu', component: Menu, meta: { requiresAuth: true } },
  { path: '/order', component: Order, meta: { requiresAuth: true } },
  { path: '/order-employee', component: OrderEmployee, meta: { requiresAuth: true} },
  { path: '/order-admin', component: OrderAdmin, meta: { requiresAuth: true} },
  { path: '/order-supplier', component: OrderSupplier, meta: { requiresAuth: true} },
  { path: '/employee', component: employee, meta: { requiresAuth: true} },
  { path: '/customer-admin', component: customerAdmin, meta: { requiresAuth: true} },
  { path: '/supplier-admin', component: supplierAdmin, meta: { requiresAuth: true} },
  { path: '/employee-menu', component: MenuEmployee, meta: { requiresAuth: true} },
  { path: '/table', component: Table, meta: { requiresAuth: true} },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const store = useMainStore()
//   if (to.meta.requiresAuth && !store.isLoggedIn) {
//     next('/')
//   } else {
//     next()
//   }
// })

export default router