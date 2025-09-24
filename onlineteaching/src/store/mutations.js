/**
 * 包含多个直接更新 state 的方法(回调函数)的对象
 * 由action 中的 commit(‘mutation 名称’)来触发
 * 只能包含同步的代码, 不能写异步代码
 */

//更改用户状态信息
export const userStatus = (state, user) => {
  if (user != null) {
    state.userLogin = JSON.parse(user);
    state.isLogin = true;
  } else if (user == null) {
    //登出时清空sessionStorage里面的参数
    sessionStorage.setItem("user", null);
    sessionStorage.setItem("userToken", "");
    state.isLogin = false;
  }
};

//更改课程状态信息
export const courseStatus = (state, course) => {
  if (course != null) {
    state.courseIn = JSON.parse(course);
    state.isInCourse = true;
  } else if (course == null) {
    //登出时情况sessionStorage里面的参数
    sessionStorage.setItem("course", null);
    state.isInCourse = false;
  }
};

//更改token
export const setToken = (state, token) => {
  if (token != null) {
    state.token = token;
  } else {
    state.token = "";
  }
};
