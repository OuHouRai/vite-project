import { createRouter, createWebHashHistory } from "vue-router"

import Main from "@/views/main/index.vue"
import Login from "@/views/login/login.vue"

//制定路由规则
const routes = [
  {
    path: "/main",
    name: "main",
    component: () => Main,
  },
  {
    path: "/",
    name: "login",
    component: () => Login,
  },
]

const router = createRouter({
  //设置路由模式
  history: createWebHashHistory(),
  routes,
})

export default router
