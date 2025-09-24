<template>
  <div class="container">
    <div class="Header">
      <h2>注册{{ this.$store.state.loginTitle }}教学系统</h2>
    </div>
    <div class="Main">
      <div class="Main-context">
        <el-form
          :model="registerForm"
          :rules="rules"
          ref="registerForm"
          label-width="100px"
          class="demo-registerForm"
        >
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="registerForm.user_name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="registerForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="registerForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="role">
            <el-radio-group v-model="registerForm.role">
              <el-radio label="教师"></el-radio>
              <el-radio label="学生"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="registerForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="所属学校" prop="college">
            <el-input v-model="registerForm.college"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">注册</el-button>
          </el-form-item>
          <el-form-item>
            <div class="returnBottom">
              已有账号？
              <el-button type="text" @click="goLogin">去登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
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
    //测试放发-密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    //确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        callback(new Error("请输入正确的手机格式"));
      } else {
        callback();
      }
    };

    return {
      registerForm: {
        user_name: "",
        pass: "",
        checkPass: "",
        role: "",
        phone: "",
        college: "",
      },
      rules: {
        user_name: [
          {
            required: true,
            validator: testUsername,
            trigger: "blur",
          },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        college: [{ message: "请输入学校", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      let data = this.registerForm;
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          // console.log(this.registerForm);
          this.$axios
            .get(`/user/register`, {
              params: {
                user_name: data.user_name,
                user_password: data.pass,
                phone: data.phone,
                user_role: data.role,
                college: data.college,
              },
            })
            .then((res) => {
              this.$router.push("/");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    goLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
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
  padding: 30px;
  padding-right: 60px;
  width: 50%;
  height: 70%;
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
</style>
