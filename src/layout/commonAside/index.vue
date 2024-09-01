<template>
  <el-aside :width="widthData">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="!isCollapse">抽选管理系统</h3>
      <h3 v-show="isCollapse">系统</h3>
      <el-menu-item
        v-for="(item, index) in noChildren"
        :index="item.path"
        :key="index"
        @click="handleMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        v-for="(item, index) in hasChildren"
        :index="item.path"
        :key="index"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :index="subItem.path"
            :key="subIndex"
            @click="handleMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAllDataStore } from "@/stores";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const list = ref([
  {
    path: "/home",
    name: "home",
    label: "首页",
    icon: "house",
    url: "Home",
  },
  {
    path: "/mall",
    name: "mall",
    label: "项目管理",
    icon: "video-play",
    url: "Mall",
  },
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "User",
  },
  {
    path: "/other",
    label: "其他",
    icon: "location",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Page1",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "Sell",
        url: "Page2",
      },
    ],
  },
]);
const noChildren = computed(() => list.value.filter((item) => !item.children));
const hasChildren = computed(() => list.value.filter((item) => item.children));
const store = useAllDataStore();
const isCollapse = computed(() => {
  return store.state.isCollapse;
});

const widthData = computed(() => {
  return store.state.isCollapse ? "64px" : "160px";
});

const handleMenu = (item) => {
  console.log(item, "item");
  router.push(item.path);
};
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.el-menu {
  border-right: none;

  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}

.el-aside {
  height: 100%;
  background: #545c64;
}
</style>
