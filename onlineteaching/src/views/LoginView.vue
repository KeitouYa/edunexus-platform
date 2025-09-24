<template>
  <div class="container">
    <div class="Header">
      <h2>欢迎来到{{ this.$store.state.loginTitle }}教学系统</h2>
    </div>
    <div class="Main">
      <div class="main-style">
        <!-- 一个表单提交 -->
        <!-- 导航选择 -->
        <div class="tabs-nav">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">用户名登录</el-menu-item>
            <el-menu-item index="2" disabled>手机号登录</el-menu-item>
          </el-menu>
        </div>

        <!-- 表单提交 -->
        <div class="login-tab">
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            class="demo-loginForm"
          >
            <!-- 用户名 -->
            <el-form-item prop="user_name">
              <el-input
                type="text"
                v-model="loginForm.user_name"
                placeholder="请输入用户名"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="user_password">
              <el-input
                show-password
                type="password"
                v-model="loginForm.user_password"
                placeholder="请输入密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <!-- 角色识别 -->
            <el-form-item label="角色选择" prop="access">
              <el-select v-model="loginForm.access">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="text" @click="forgetPwd">忘记密码</el-button>
            </el-form-item>

            <el-form-item>
              <el-button
                style="width: 300px"
                type="primary"
                @click="submitForm"
              >
                登录
              </el-button>
            </el-form-item>

            <el-form-item>
              <div class="loginBottom">
                还没有账号？
                <el-button type="text" @click="goRegist">去注册</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    //用户名和密码验证
    var testUsername = (rule, value, callback) => {
      let username_rule = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,10}$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!username_rule.test(value)) {
        //由汉字、字母、数字、下划线2-10位，下划线位置不受控制
        callback(
          new Error("由汉字、字母、数字或下划线组成，长度在 2 到 10 个字符")
        );
      } else {
        callback();
      }
    };
    var testPwd = (rule, value, callback) => {
      let pwd_rule =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (
        !pwd_rule.test(value)
        //至少6个字符，至少包括一个字母、一个数字、一个特殊字符
      ) {
        callback(
          new Error("至少6个字符，至少包括一个字母、一个数字、一个特殊字符")
        );
      } else {
        callback();
      }
    };

    return {
      centerDialogVisibleSecond: true,
      activeIndex: "1", //登录选择
      loginForm: {
        //登录表单信息
        user_name: "",
        user_password: "",
        access: "2",
      },

      rules: {
        //验证规则
        user_name: [
          {
            required: true,
            validator: testUsername,
            trigger: "blur",
          },
        ],
        user_password: [
          {
            required: true,
            validator: testPwd,
            trigger: "blur",
          },
        ],
        access: [
          {
            required: true,
            message: "请选择角色",
            trigger: "blur",
          },
        ],
      },
      //身份选择
      options: [
        {
          value: "2",
          label: "管理员",
        },
        {
          value: "1",
          label: "教师",
        },
        {
          value: "0",
          label: "学生",
        },
      ],
    };
  },
  methods: {
    //选择，切换 - 暂时不实现
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    /**
     * 提交表单，登录验证
     */
    submitForm() {
      //表单验证
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log("submit!");
          //访问后台 - 由后台验证：1.是否有该用户（1. 根据角色选择，没有该用户；2.本来就没有该用户） 2.该用户密码是否错误
          //提交获取数据，根据后台返回的数据进行
          this.$axios
            .get(`/user/login`, {
              params: this.loginForm,
            })
            .then(
              (res) => {
                this.$message.success({
                  message: res.msg,
                });
                //到这一步说明：没有错误，请求成功(status=0)
                //接下来对返回的数据进行存储——添加数据到state
                // console.log(res.data);
                //将数据存入sessionStorge，用用户名密码作为用户的token
                sessionStorage.setItem("user", JSON.stringify(res.data));
                sessionStorage.setItem("userToken", res.data.user_password);
                //将用户登录的相关参数放入vuex
                this.$store.dispatch("setUser", JSON.stringify(res.data));
                this.$store.dispatch("setToken", res.data.user_password);
                //打印登录状态
                console.log(this.$store.state.isLogin);

                //页面跳转
                if (res.data.access === "1") {
                  //教师
                  this.$router.push("/teacherView");
                } else if (res.data.access === "0") {
                  //学生
                  this.$router.push("/studentView");
                } else {
                  //管理员
                  this.$router.push("/adminView");
                }
              }
              //错误的暂时不需要添加
            );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    goRegist() {
      this.$router.push("/register");
    },
    forgetPwd() {
      this.$router.push("/forgetPassword");
    },
  },
  //此方法写在method外面
  //to: Route: 即将要进入的目标路由对象
  //from: Route: 当前导航正要离开的路由
  //next()：必须执行
  beforeRouteEnter: (to, from, next) => {
    if (to.path == "/" && sessionStorage.getItem("user")) {
      //去除掉sessionStorage
      sessionStorage.removeItem("user");
    }
    next((vm) => {
      // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
      vm.$store.dispatch("setUser", null);
    });
  },
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
  height: 30%;
  line-height: 100px;
}

.Main {
  margin-top: 30px;
  width: 40%;
  height: 70%;
  padding: 30px;
  border: 1px solid black;
  border-radius: 34px;
  box-shadow: 0px 0px 7px #d9d9d9;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  text-align: center;
}
.main-style {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.tabs-nav {
  justify-content: center;
  position: relative;
  padding-bottom: 9px;
  margin-bottom: 12px;
  display: flex;
}
</style>
