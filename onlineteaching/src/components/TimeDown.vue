<template>
  <div>
    <span
      :sendSync="sendSync"
      :autoStart="autoStart"
      :defaultVal="defaultVal"
      >{{ countString }}</span
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      isStart: false,
      globalTimer: null, //获取setInterval对象值
      countString: "", //用来显示时间
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      countVal: this.defaultVal, //获取初始值
      pauseTime: 0,
    };
  },
  watch: {
    countVal: {
      deep: true,
      handler: function (val, oldVal) {
        let vm = this;
        if (vm.needSendSunc) {
          vm.passToParent(val);
        }
      },
    },
    needSendSunc: {
      deep: true,
      handler: function (val) {
        let vm = this;
        if (val) {
          vm.passToParent(vm.countString);
        }
      },
    },
  },
  props: {
    sendSync: {
      type: Boolean,
      default: false,
    },
    autoStart: {
      type: Boolean,
      default: false,
    },
    defaultVal: {
      type: Number,
      default: null,
    },
  },
  created() {
    if (this.autoStart) {
      this.startCountFn();
    }
  },
  computed: {
    needSendSunc: function () {
      return this.sendSync;
    },
  },
  methods: {
    counterFn(counterTime) {
      let leave1 = counterTime % (24 * 3600 * 1); //计算天数后剩余的毫秒数
      let leave2 = leave1 % (3600 * 1); //计算小时数后剩余的毫秒数
      let leave3 = leave2 % (60 * 1); //计算分钟数后剩余的毫秒数
      let day = Math.floor(counterTime / (24 * 3600 * 1)); //计算相差天数
      let hour = Math.floor(leave1 / (3600 * 1)); //计算相差小时
      let minute = Math.floor(leave2 / (60 * 1)); //计算相差分钟
      let second = Math.round(leave3 / 1); //计算相差秒
      day = day >= 10 ? day : "0" + day;
      hour = hour >= 10 ? hour : "0" + hour;
      minute = minute >= 10 ? minute : "0" + minute;
      second = second >= 10 ? second : "0" + second;
      this.countString = `${hour}:${minute}:${second}`;
    },
    startCountFn() {
      if (!this.isStart) {
        console.log(this.countVal);
        this.countVal = this.countVal ? this.countVal : 0;
        let timer = setInterval(() => {
          this.counterFn(this.countVal++);
        }, 1000);
        this.globalTimer = timer;
        this.isStart = true;
      }
    },
    passToParent(data) {
      this.$emit("getDataFromChild", data);
    },
  },
};
</script>
<style></style>
