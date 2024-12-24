import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Setting from '../views/Setting.vue'
import Setting2 from '../views/Setting2.vue'

// import { useMainStore } from '../store'

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/products', component: Products, meta: { requiresAuth: true } },
  { 
    path: '/setting/1', 
    component: Setting, 
    meta: { requiresAuth: true }
  },
  { 
    path: '/setting/2', 
    component: Setting2, 
    meta: { requiresAuth: true }
  },
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