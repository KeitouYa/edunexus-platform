<template>
  <div class="home">
    <!-- 定义图表外层容器 -->
    <div id="myHomeChart" ref="homeEcharts"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["option"],

  mounted() {
    // 调用当前图表
    this.dataChart();
  },
  methods: {
    // 绘制图表
    dataChart() {
      //初始化图表，this.$refs.homeEcharts获取到图表容器
      var myChart = this.$echarts.init(this.$refs.homeEcharts);
      console.log("我就没进");
      console.log("option =  ", this.option);
      // 把参数配置放到容器里
      myChart.setOption(this.option);
    },
    // 销毁实例(看项目需要进行销毁实例)
    destroyChart() {
      this.$echarts.init(this.$refs.homeEcharts).dispose();
    },
  },
};
</script>
<style>
/* 给图表容器定义宽高 */
#myHomeChart {
  width: 1050px;
  height: 600px;
}
</style>
