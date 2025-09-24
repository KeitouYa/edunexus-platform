<template>
  <div class="header-context">
    <!-- 以下共3个区域 -->
    <!-- 左边 -->
    <div class="h-left">
      <span slot="label"><i class="el-icon-collection"></i>Online教学</span>
    </div>
    <!-- 中间 -->
    <div class="h-mid">
      <!-- <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        text-color="dodgerblue"
        @select="handleSelect"
      >
        <el-menu-item index="1"> 我的课堂 </el-menu-item>
      </el-menu> -->
    </div>
    <!-- 右边 -->
    <div class="h-right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="color: dodgerblue">
          <slot name="allHeader_username">张三</slot>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">个人信息</el-dropdown-item>
          <el-dropdown-item command="2">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllHeader",
  data() {
    return {};
  },
  methods: {
    handleCommand(command) {
      if (command === "1") {
        this.$router.push("/me");
      } else if (command === "2") {
        //退出时的方法
        this.$router.push("/");
        this.$message.success("退出成功！");
      } else {
        this.$message.error("选择出错！");
      }
    },
  },
};
</script>

<style lang="scss">
.header-context {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
}
.h-left {
  width: 200px;
  font-weight: bold;
  color: dodgerblue;
}
.h-mid {
  flex: 1;
}
.h-right {
  width: 200px;
  margin-right: 20px;
}
</style>
