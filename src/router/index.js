import { createRouter, createWebHashHistory } from "vue-router";

import Main from "@/views/main/index.vue";
import User from "@/views/user/index.vue";
import Mall from "@/views/mall/index.vue";
import PageOne from "@/views/other/pageOne/index.vue";
import PageTwo from "@/views/other/PageTwo/index.vue";
import Home from "@/views/home/index.vue";
import Login from "@/views/login/login.vue";

//制定路由规则
const routes = [
  {
    path: "/",
    name: "main",
    redirect: "/home",
    component: () => Main,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => Home,
      },
      {
        path: "/mall",
        name: "mall",
        component: () => Mall,
      },
      {
        path: "/user",
        name: "user",
        component: () => User,
      },
      {
        path: "/page1",
        name: "page1",
        component: () => PageOne,
      },
      {
        path: "/page2",
        name: "page2",
        component: () => PageTwo,
      },
      // {
      //   path: "/other",
      //   name: "other",
      //   component: () => Other,
      //   children: [],
      // },
    ],
  },
  {
    path: "/",
    name: "login",
    component: () => Login,
  },
];

const router = createRouter({
  //设置路由模式
  history: createWebHashHistory(),
  routes,
});

export default router;
