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
const store = useAllDataStore();
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const list = computed(() => {
  return store.state.menuList;
});
const noChildren = computed(() => list.value.filter((item) => !item.children));
const hasChildren = computed(() => list.value.filter((item) => item.children));

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
