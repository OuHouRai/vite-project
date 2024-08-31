<template>
  <el-aside>
    <el-menu background-color="#545c64" text-color="#fff">
      <h3>抽选管理系统</h3>
      <el-menu-item v-for="(item, index) in noChildren" :index="item.path" :key="index">
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu v-for="item in hasChildren" :index="item.path" :key="item.parh">
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(subItem, subIndex) in item.children" :index="item.path" :key="subIndex">
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
  import { ref, computed } from "vue"
  import { useRouter } from "vue-router"
  const router = useRouter()

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
      path: "other",
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
          icon: "setting",
          url: "Page2",
        },
      ],
    },
  ])
  const noChildren = computed(() => list.value.filter((item) => !item.children))
  const hasChildren = computed(() => list.value.filter((item) => item.children))

  const clickMenu = (item) => {
    router.push(item.path)
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
    width: 180px;
    height: 100%;
    background: #545c64;
  }
</style>