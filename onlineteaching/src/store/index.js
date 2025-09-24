import Vue from "vue";
import Vuex from "vuex";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as actions from "./actions";

Vue.use(Vuex);

const store = new Vuex.Store({
  //存储用户登录信息
  state: {
    loginTitle: "GDUT",
    userLogin: null, //登录信息
    token: "", //用户登录成功后持有的token
    isLogin: null, //用户登录状态
    courseIn: null, //进入课程时需要保存的信息
    isInCourse: null, //用户进入课程状态
  },

  //用于响应组件中的动作——先条件判断
  actions,
  //用户操作数据state——满足条件的才进行加工
  mutations,
  //用于讲state中的数据进行加工——不复杂的
  getters,
  modules: {},
});

export default store;
