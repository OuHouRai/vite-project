import { createApp } from "vue";
import "@/assets/less/index.less";
import App from "./App.vue";
import router from "./router";
import untils from "./utils/common.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import "@/api/mock.js";
import api from "./api/api.js";
const pinia = createPinia();
const app = createApp(App);
import { useAllDataStore } from "./stores";
function isRouter(to) {
  let res = router.getRoutes();
  let resFil = res.filter((item) => item.path === to.path);
  console.log(resFil, res, to, "resFil");

  return resFil.length > 0;
}

router.beforeEach((to, from) => {
  console.log(to, "to");
  if (to.path !== "/login" && !store.state.token) {
    console.log(444);
    return { name: "login" };
  }
  if (!isRouter(to)) {
    console.log(777);
    return { name: "error" };
  }
});

app.config.globalProperties.$api = api;
app.config.globalProperties.$untils = untils;
app.use(ElementPlus);
app.use(pinia);
const store = useAllDataStore();
console.log(router, "router");
store.addMenu(router, "refresh");
app.use(router).mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
