<template>
  <div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <!-- 可自定义填充1 -->
        <slot name="drop_down_title">下拉菜单</slot>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <!-- 可自定义填充2 -->
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
        <el-dropdown-item command="b">狮子头</el-dropdown-item>
        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
        <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
        <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  methods: {},
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
