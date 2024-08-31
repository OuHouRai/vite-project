import { createRouter, createWebHashHistory } from "vue-router";

import Main from "@/views/main/index.vue";

//制定路由规则
const routes = [
  {
    path: "/",
    name: "main",
    component: () => Main,
  },
];

const router = createRouter({
  //设置路由模式
  history: createWebHashHistory(),
  routes,
});

export default router;
