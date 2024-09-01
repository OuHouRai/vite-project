import { defineStore } from "pinia";
import { ref } from "vue";

function initState() {
  return {
    isCollapse: false,
  };
}
export const useAllDataStore = defineStore("allData", () => {
  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  const state = ref(initState());

  return { state };
});
