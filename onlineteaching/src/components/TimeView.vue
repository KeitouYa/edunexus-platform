<template>
  <div>
    <!-- <el-dialog title="倒计时"> -->
    <Countdown :time="time" format="hh:mm:ss" @on-end="onCountdownEnd">
      <template slot-scope="{ time }">{{ time }}</template>
    </Countdown>
    <!-- </el-dialog> -->
    <el-button type="primary" @click="hideCountdown = hideCountdown = true">
      确定发布
    </el-button>
  </div>
</template>

<script>
import Countdown from "@choujiaojiao/vue2-countdown";

export default {
  components: { Countdown },
  data() {
    return {
      time: 0, //倒计时时间差
      hideCountdown: false, //刚开始先不显示
    };
  },

  mounted() {},
  methods: {
    onCountdownEnd() {
      // 倒计时结束的逻辑
      console.log("countdown end~");
    },

    //获取数据前先默认不加载
    getDate() {
      //访问后台接口获取数据，并计算处理数据
      //第一次访问获取时间戳差值
      this.$axios
        .get(`/attendance/addAttendance`, {
          params: {
            attendance_time: 10,
            user_id: 25,
            course_id: 3,
          },
        })
        .then((res) => {
          let time = parseInt(new Date().getTime() / 1000);
          console.log(time);
          console.log(res.data.attendance_time, res.size / 1000, time);
          let t =
            parseInt(new Date().getTime() / 1000) - res.size / 1000 + 60 * 0.1;
          console.log("时间戳差值：", t);
          console.log(res);
          this.time = t; //拿到时间戳的差
          //拿到后进行数据渲染
          this.hideCountdown = true;
          //将时间存储起来
          //通过store 和 sessionStore存储
        });
    },
  },
  watch: {
    hideCountdown: function () {
      if (this.hideCountdown === true) {
        this.getDate();
      }
    },
  },
};
</script>
