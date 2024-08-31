<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container>
        <el-header class="el-header">
          <common-header />
        </el-header>
        <el-main class="right-main"> main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import CommonAside from "@/layout/commonAside/index.vue";
</script>

<style scoped lang="less">
.common-layout,
.lay-container {
  height: 100%;
}

.el-header {
  background-color: #333333;
}
</style>
