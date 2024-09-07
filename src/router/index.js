import { createRouter, createWebHashHistory } from "vue-router";

// import Main from "@/views/main/index.vue";
// import User from "@/views/user/index.vue";
// import Mall from "@/views/mall/index.vue";
// import PageOne from "@/views/other/pageOne/index.vue";
// import PageTwo from "@/views/other/PageTwo/index.vue";
// import Home from "@/views/home/index.vue";
// import Login from "@/views/login/index.vue";

//制定路由规则
const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/main/index.vue"),
    redirect: "/home",
    children: [
      // {
      //   path: "/home",
      //   name: "home",
      //   component: () => Home,
      // },
      // {
      //   path: "/mall",
      //   name: "mall",
      //   component: () => Mall,
      // },
      // {
      //   path: "/user",
      //   name: "user",
      //   component: () => User,
      // },
      // {
      //   path: "/pageOne",
      //   name: "pageOne",
      //   component: () => PageOne,
      // },
      // {
      //   path: "/pageTwo",
      //   name: "pageTwo",
      //   component: () => PageTwo,
      // },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/error/index.vue"),
  },
];

const router = createRouter({
  //设置路由模式
  history: createWebHashHistory(),
  routes,
});

export default router;
