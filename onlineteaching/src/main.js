/**
 * 该文件是整个项目的入口文件 - 这个文件用来测试
 */
//引入Vue
import Vue from "vue";
//引入Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import echarts from "echarts"; //引入echarts

//引入App组件，它是所有组件的父组件
import App from "./App.vue";

import router from "./router";
import store from "./store/index";
import global from "./assets/css/global.css";
import axios from "./utils/axios";

//关闭Vue的生产提示

Vue.prototype.$echarts = echarts; //挂载在全局
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(global);

Vue.prototype.$axios = axios; //全局使用axios
//创建Vue实例对象---vm
new Vue({
  router,
  store,
  //完成功能：将App组件放在容器中
  render: (h) => h(App),
}).$mount("#app"); //这个就是el的第二种写法
