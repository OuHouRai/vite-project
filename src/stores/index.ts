import { defineStore } from "pinia";
import { ref, watch } from "vue";

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

  watch(
    state,
    (newObj) => {
      if (!newObj.token) return;
      localStorage.setItem("store", JSON.stringify(newObj));
    },
    { deep: true },
  );

  function updateMenuList(val) {
    state.value.menuList = val;
  }

  function addMenu(router, type) {
    if (type === "refresh") {
      if (JSON.parse(localStorage.getItem("store"))) {
        state.value = JSON.parse(localStorage.getItem("store"));
        state.value.routerList = [];
      } else {
        return;
      }
    }
    const menu = state.value.menuList;
    const module = import.meta.glob("../views/*/index.vue");
    const routeArr = [];
    menu.forEach((item) => {
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

    state.value.routerList = [];
    let routers = router.getRoutes();
    routers.forEach((item) => {
      if (
        item.name === "main" ||
        item.name === "login" ||
        item.name === "error"
      ) {
        return;
      } else {
        router.removeRoute(item.name);
      }
    });

    routeArr.forEach((item) => {
      console.log(router.addRoute("main", item), 11111);
      state.value.routerList.push(router.addRoute("main", item));
    });
  }

  function clean() {
    state.value.routerList.forEach((item) => {
      if (item) item();
    });
    state.value = initState();
    localStorage.removeItem("store");
  }

  return { state, updateMenuList, addMenu, clean };
});
