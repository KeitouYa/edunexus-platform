<template>
  <div class="container">
    <div class="Header">
      <h2>欢迎来到{{ this.$store.state.loginTitle }}教学系统</h2>
    </div>
    <div class="Main">
      <!-- 一个表单提交 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "TestLogin",
  methods: {},
};
</script>

<style long="scss" scoped>
.container {
  /* 以下不动 */
  min-height: calc(100vh);
  width: 100%;
  background-color: #0296ec26;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.Header {
  text-align: center;
  height: 100px;
  line-height: 100px;
}

.Main {
  margin-top: 30px;
  width: 400px;
  height: 400px;
  border: 1px solid black;
  border-radius: 34px;
  box-shadow: 0px 0px 7px #d9d9d9;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
