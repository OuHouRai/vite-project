import { defineStore } from "pinia";
import { ref } from "vue";

function initState() {
  return {
    isCollapse: false,
    menuList: [],
    token: "",
    routerList: [],
  };
}
export const useAllDataStore = defineStore("allData", () => {
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  const state = ref(initState());

  function updateMenuList(val) {
    state.value.menuList = val;
  }

  function addMenu(router) {
    const menu = state.value.menuList;
    const module = import.meta.glob("../views/*/index.vue");
    const routeArr = [];
    menu.forEach((item) => {
      console.log(item, "item");
      if (item.children) {
        item.children.forEach((val) => {
          let url = `../views/${val.url}/index.vue`;
          val.component = module[url];
          routeArr.push(...item.children);
        });
      } else {
        let url = `../views/${item.url}/index.vue`;
        item.component = module[url];
        routeArr.push(item);
      }
    });

    console.log(routeArr, "routeArr");
    state.value.routerList = [];
    let routers = router.getRoutes();
    routers.forEach((item) => {
      if (item.name === "main" || item.name === "login") {
        return;
      } else {
        router.removeRoute(item.name);
      }
    });

    routeArr.forEach((item) => {
      state.value.routerList.push(router.addRoute("main", item));
    });
  }

  return { state, updateMenuList, addMenu };
});
