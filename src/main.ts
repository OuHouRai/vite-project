import { createApp } from "vue";
import "@/assets/less/index.less";
import App from "./App.vue";
import router from "./router";
import untils from "./utils/common.js";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import "@/api/mock.js";
import api from "./api/api.js";
const pinia = createPinia();
const app = createApp(App);
import { useAllDataStore } from "./stores";

app.config.globalProperties.$api = api;
app.config.globalProperties.$untils = untils;
app.use(ElementPlus);
app.use(pinia);
const store = useAllDataStore();
store.addMenu(router, "refresh");
app.use(router).mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
