<template>
  <div>
    <TimeDown
      :autoStart="autoStart"
      :sendSync="sendSync"
      :defaultVal="defaultVal"
      @getDataFromChild="getDataFromChild"
    >
    </TimeDown>
  </div>
</template>

<script>
import TimeDown from "@/components/TimeDown";
export default {
  components: {
    TimeDown,
  },
  data() {
    return {
      autoStart: true,
      sendSync: true,
      defaultVal: sessionStorage.getItem("timer")
        ? parseInt(sessionStorage.getItem("timer"))
        : 0,
    };
  },
  methods: {
    getDataFromChild(data) {
      console.log(data);
      sessionStorage.setItem("timer", parseInt(data));
    },
  },
  created() {
    console.log(new Date().getTime()); //获取当前时间的时间戳 - 在页面创建之前获取当前时间的时间戳t1，创建时时间的时间戳t0
    //页面每加载一次 -
  },
};
</script>
