<template>
  <div class="block">
    <el-carousel height="400px" v-model="imgs">
      <el-carousel-item v-for="(item, index) in imgs" :key="index">
        <!-- <img :src="item" alt="" /> -->
        <el-image style="width: 100%; height: 400px" :src="item"> </el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  namd: "Carousel",
  data() {
    return {
      imgs: [
        "https://www.yunduoketang.com/article/zb_users/upload/2020/04/202004191587266454622453.jpg",
        "https://www.chinamcloud.com/upload/Image/mrtp/2019/12/27/1_ff0330b33d5047b69d37babf7ce75719.jpg",
        "https://www.chinamcloud.com/upload/Image/mrtp/2019/12/25/1_e5d6012c41724e6c9e9ec70eb0f73853.jpg",
        "https://main.qcloudimg.com/raw/e0c1da50b85edb4f8a5dd2594e03cd3c.png",
      ],
    };
  },
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.5;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
