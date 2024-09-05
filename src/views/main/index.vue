<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container>
        <el-header class="el-header">
          <common-header />
        </el-header>
        <el-main class="right-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonAside from "@/layout/commonAside/index.vue";
import CommonHeader from "@/layout/commonHeader/index.vue";
</script>

<style lang="less" scoped>
.common-layout,
.lay-container {
  height: 100%;
}

.el-header {
  background-color: #333333;
}
</style>
