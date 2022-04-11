import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import routes from 'virtual:generated-pages'
import rootRoutes from './root'

routes.unshift(...rootRoutes)

//导入生成的路由数据
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
