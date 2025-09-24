<template>
  <div class="container-self" style="display: flex">
    <div class="for-flex" style="flex: 1"></div>
    <div class="Main">
      <el-card class="box-card">
        <el-form
          label-width="120px"
          ref="forgetpwdform"
          :model="forgetpwdform"
          :rules="rules"
        >
          <el-form-item prop="username" label="用户名：">
            <el-input type="text" v-model="forgetpwdform.username"> </el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-form-item prop="phone" label="手机号：">
                <el-input
                  v-model="forgetpwdform.phone"
                  maxlength="11"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-button @click="sendcodeMsg" :disabled="disabled">
                {{ sendcode }}
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item prop="code" label="验证码：">
                <el-input v-model="forgetpwdform.code"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="newpassword" label="新密码：">
            <el-input
              type="password"
              v-model="forgetpwdform.newpassword"
            ></el-input>
          </el-form-item>
          <el-form-item prop="repeatpassword" label="确认密码：">
            <el-input
              type="password"
              v-model="forgetpwdform.repeatpassword"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button type="default" @click="handleReturn">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="for-flex" style="flex: 1"></div>
  </div>
</template>

<script>
export default {
  name: "forgetpwd",
  props: ["centerDialogVisibleSecond"],
  data() {
    //用户名
    //手机号
    //验证码
    //密码
    //确认密码
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

    var testCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!/^[0-9]{4}$/.test(value)) {
        callback(new Error("请输入正确的验证码格式"));
      } else {
        callback();
      }
    };
    return {
      user: {},
      getCode: "",
      sendcode: "发送验证码",
      disabled: false,
      forgetpwdform: {
        username: "",
        phone: "",
        code: "",
        newpassword: "",
        repeatpassword: "",
      },
      rules: {
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        code: [
          {
            required: true,
            validator: testCode,
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            validator: testUsername,
            trigger: "blur",
          },
        ],
        newpassword: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur",
          },
        ],
        repeatpassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //手机号正则判断
    judgePhone() {
      const reg =
        /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/;
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if (this.forgetpwdform.phone == "") {
        this.$message("请输入手机号码");
        return false;
      } else if (!reg.test(this.forgetpwdform.phone)) {
        this.$message("手机号格式不正确");
        return false;
      } else {
        return true;
      }
    },
    //发送验证码
    sendcodeMsg() {
      let _this = this;
      if (_this.judgePhone()) {
        var num = 60;
        var timer = setInterval(function () {
          num--;
          _this.disabled = true;
          _this.sendcode = num + "秒后重新获取";
          if (num === 0) {
            _this.sendcode = "获取验证码";
            _this.disabled = false;
            clearInterval(timer);
          }
        }, 1000);
        // _this.$http
        //   .post(
        //     "你的接口",
        //     qs.stringify({ phoneNumber: _this.forgetpwdform.phone })
        //   )
        //   .then((res) => {
        //     _this.getCode = res;
        //   });
        //根据后台仿写一个接口
        _this.$axios
          .get(`/user/sendMessageToPhone`, {
            params: {
              username: _this.forgetpwdform.username,
              phone: _this.forgetpwdform.phone,
            },
          })
          .then((res) => {
            // 验证用户名和手机号是否匹配;
            _this.getCode = res.msg;
            _this.user = res.data;
            // console.log(res);
            this.$message({
              showClose: true,
              message: "短信验证码：" + res.msg,
            });
          });
      }
    },

    //表单提交
    handleSubmit() {
      console.log("我没有进来吗");
      let _this = this;
      console.log("验证码判断");
      if (_this.forgetpwdform.code != _this.getCode) {
        _this.$message({
          type: "error",
          message: "验证码错误，修改失败",
          duration: 1000,
        });
      } else {
        //验证成功后，需要保存修改的信息
        //根据use_name查询用户，并验证用户名和手机号是相匹配的
        _this.$axios
          .get(`/user/changePassword`, {
            params: {
              user_id: _this.user.user_id,
              password: _this.forgetpwdform.newpassword,
            },
          })
          .then((res) => {
            // console.log(res);
            _this.$message({
              type: "success",
              message: "修改成功，可登录",
              duration: 1000,
            });
          });
      }
    },

    handleReturn() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.box-card {
  width: 500px;
}
</style>
