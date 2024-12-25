import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Fruits from '../views/fruits.vue'
import Product from '../views/Product/product.vue'
import Category from '../views/Product/category.vue'
import Supplier from '../views/Supplier/supplier.vue'


// import { useMainStore } from '../store'

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