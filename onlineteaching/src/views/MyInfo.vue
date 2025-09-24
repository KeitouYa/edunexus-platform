<template>
  <div class="container-self">
    <!-- 头部 -->
    <div class="header-context">
      <!-- 以下共3个区域 -->
      <!-- 左边 -->
      <div class="h-left">
        <span slot="label"><i class="el-icon-collection"></i>Online教学</span>
      </div>
      <!-- 中间 -->
      <div class="h-mid">
        <!-- <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        text-color="dodgerblue"
        @select="handleSelect"
      >
        <el-menu-item index="1"> 我的课堂 </el-menu-item>
      </el-menu> -->
      </div>
      <!-- 右边 -->
      <div class="h-right">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link" style="color: dodgerblue">
            <slot name="allHeader_username">
              {{ $store.state.userLogin.user_name }}
            </slot>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">返回</el-dropdown-item>
            <el-dropdown-item command="2">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- <div class="head">
      <h1>{{ user.user_name }}</h1>
    </div> -->
    <!-- <el-divider></el-divider> -->
    <div class="Main">
      <div class="main-top" style="display: flex">
        <div class="for-flex" style="flex: 1"></div>
        <div class="my-info">
          <el-card class="box-card" style="width: 600px">
            <div class="for-flex" style="flex: 1"></div>
            <el-form ref="form" :model="user" label-width="80px">
              <span> <h3>账号设置</h3> </span>
              <el-form-item label="用户ID">
                <el-input
                  v-model="user.user_id"
                  disabled
                  prop="user_name"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="用户名称"
                :rules="[
                  { required: true, message: '用户名不能为空' },
                  {
                    pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{2,10}$/,
                    message:
                      '由汉字、字母、数字或下划线组成，长度在 2 到 10 个字符',
                    trigger: 'blur',
                  },
                ]"
              >
                <el-input v-model="user.user_name" :disabled="value"></el-input>
              </el-form-item>
              <el-form-item label="所属角色">
                <el-input v-model="user.user_role" disabled></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="user.phone" disabled></el-input>
              </el-form-item>
              <el-form-item label="密码" style="display: felx">
                <el-input
                  type="password"
                  v-model="user.user_password"
                  disabled
                ></el-input>
              </el-form-item>
              <!-- <el-form-item class="change-button" style="margin-right: 90px">
                <el-button type="text" @click="myChangePwd">修改密码</el-button>
              </el-form-item> -->
              <el-divider></el-divider>
              <span> <h3>基本信息</h3> </span>
              <el-form-item label="真实姓名">
                <el-input v-model="user.real_name" :disabled="value"></el-input>
              </el-form-item>
              <el-form-item label="工号">
                <el-input
                  v-model="user.user_number"
                  :disabled="value"
                ></el-input>
              </el-form-item>
              <el-form-item label="学校">
                <el-input v-model="user.college" :disabled="value"></el-input>
              </el-form-item>
              <el-form-item label="院系">
                <el-input v-model="user.faculty" :disabled="value"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onEdit">
                  {{ editButton }}
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        <div class="for-flex" style="flex: 1"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //用户信息
      user: {},
      value: true,
      editButton: "编辑",
    };
  },
  created() {
    this.isLogin();
    this.ver();
    this.user = this.$store.state.userLogin;
  },
  methods: {
    handleCommand(command) {
      if (command === "1") {
        if (window.history.length <= 1) {
          this.$router.push({ path: "/" });
          return false;
        } else {
          this.$router.go(-1);
        }
      } else if (command === "2") {
        //退出时的方法
        this.$router.push("/");
        this.$message.success("退出成功！");
      } else {
        this.$message.error("选择出错！");
      }
    },
    onEdit() {
      // console.log("submit!");
      if (this.value === true) {
        this.value = !this.value;
        this.editButton = "保存";
      } else if (this.value === false) {
        let username_rule = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]{2,10}$/;
        this.editButton = "编辑";
        //先进行用户名的判断
        if (this.user.user_name === "") {
          // console.log("用户名不能为空");
          this.$message.error("请输入用户名");
        } else if (!username_rule.test(this.user.user_name)) {
          // console.log("格式错误");
          //由汉字、字母、数字、下划线2-10位，下划线位置不受控制
          this.$message.error(
            "由汉字、字母、数字或下划线组成，长度在 2 到 10 个字符"
          );
        } else {
          this.$axios
            .get(`/user/updateUser`, {
              params: {
                user_id: this.user.user_id,
                user_name: this.user.user_name,
                college: this.user.college,
                faculty: this.user.faculty,
                user_number: this.user.user_number,
                real_name: this.user.real_name,
              },
            })
            .then((res) => {
              // console.log(res);
              //储存用户信息
              sessionStorage.setItem("user", JSON.stringify(res.data));
              sessionStorage.setItem("userToken", res.data.user_password);
              //将用户登录的相关参数放入vuex
              this.$store.dispatch("setUser", JSON.stringify(res.data));
              this.$store.dispatch("setToken", res.data.user_password);
              this.value = !this.value;
            });
        }
      }
    },
    //获取登录用户信息
    isLogin() {
      //判断sessionStorage中是否有登录信息
      if (
        sessionStorage.getItem("user") != null &&
        sessionStorage.getItem("userToken")
      ) {
        //存在登录信息就从sessionStorage中提取状态再传值给vuex中
        this.$store.commit("userStatus", sessionStorage.getItem("user"));
      } else {
        //登录不成功就将vuex中的state清空
        this.$store.commit("userStatus", null);
      }
      //返回登录状态islogin
      return this.$store.getters.isLogin;
    },
    //通过登录状态来判断用户是否登录执行相关的操作
    ver() {
      //用户已经登录
      if (this.$store.state.isLogin) {
        console.log("已登录");
      } else {
        //如果没有登录就返回登录界面
        this.$router.push("/");
        this.$message({
          message: "警告，请登录账户",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.text {
  font-size: 14px;
}

.item {
  //   padding: 18px 0;
}

.box-card {
  width: 45%;
}

.header-context {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
}
.h-left {
  width: 200px;
  font-weight: bold;
  color: dodgerblue;
}
.h-mid {
  flex: 1;
}
.h-right {
  width: 200px;
  margin-right: 20px;
}
</style>
