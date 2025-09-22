import { createRouter, createWebHistory } from 'vue-router'
import { loadRoutes } from './autoload'

const { routes, menuList } = loadRoutes()
console.log('menu', menuList)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export { menuList }

export default router
