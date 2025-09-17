import { createRouter, createWebHistory } from 'vue-router'
import { loadRoutes } from './autoload'


const {routes, menu} = loadRoutes()
console.log('menu', menu);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export const menuList = menu

export default router