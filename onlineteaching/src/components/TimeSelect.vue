<template>
  <div class="container">
    <div class="block" style="margin-right: 20px">
      <span class="demonstration">开始学年</span>
      <el-date-picker
        v-model="timeSelect.value1"
        type="year"
        placeholder="选择年"
      >
      </el-date-picker>
    </div>

    <div class="block" style="margin-right: 20px">
      <span class="demonstration">结束学年</span>
      <el-date-picker
        v-model="timeSelect.value2"
        type="year"
        placeholder="选择年"
      >
      </el-date-picker>
    </div>

    <div class="block" style="margin-right: 20px">
      <span>所在学期</span>
      <el-select v-model="timeSelect.value" placeholder="请选择">
        <el-option
          v-for="item in timeSelect.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="block">
      <el-button type="primary" @click="selectCourse">查询</el-button>
    </div>
  </div>
</template>

<script>
export default {
  namde: "TimeSelect",
  data() {
    return {
      timeSelect: {
        value1: "2021",
        value2: "2022",
        value: "",
        options: [
          { value: "不限", label: "不限" },
          { value: "全年", label: "全年" },
          { value: "第一学期", label: "第一学期" },
          { value: "第二学期", label: "第二学期" },
        ],
      },
    };
  },
  methods: {
    selectCourse() {
      let v1 = this.value1;
      let v2 = this.value2;
      if (!(Number(v2) - Number(v1) === 1)) {
        this.$message.error("开始和结束学年应相差一年!");
      }
      console.log("查询");
    },
  },
};
</script>

<style>
.container {
  display: inline-flex;
}
</style>
