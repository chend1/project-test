import { createRouter, createWebHistory } from 'vue-router'

const routes: any = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router