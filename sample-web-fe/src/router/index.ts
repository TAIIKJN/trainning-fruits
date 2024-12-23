import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import { useMainStore } from '../store'

const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home, meta: { requiresAuth: true } }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
    const store = useMainStore()
    if (to.meta.requiresAuth && !store.isLoggedIn) {
      next('/')
    } else {
      next()
    }
  })
  
export default router