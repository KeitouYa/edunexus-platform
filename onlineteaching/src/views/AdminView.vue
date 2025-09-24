<template>
  <div>
    <all-header>
      <span slot="allHeader_username">
        {{ $store.state.userLogin.user_name }}
      </span>
    </all-header>

    <div class="add-user">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          style="margin-right: 30px"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="user_name1">
            <el-input v-model="ruleForm.user_name1"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass1">
            <el-input
              type="password1"
              v-model="ruleForm.pass1"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass1">
            <el-input
              type="password"
              v-model="ruleForm.checkPass1"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="role1">
            <el-radio-group v-model="ruleForm.role1">
              <el-radio label="管理员"></el-radio>
              <el-radio label="教师"></el-radio>
              <el-radio label="学生"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号" prop="phone1">
            <el-input v-model="ruleForm.phone1"></el-input>
          </el-form-item>
          <el-form-item label="所属学校" prop="college1">
            <el-input v-model="ruleForm.college1"></el-input>
          </el-form-item>

          <el-form-item label="工号" prop="user_number1">
            <el-input v-model="ruleForm.user_number1"></el-input>
          </el-form-item>
          <el-form-item label="所属院系" prop="faculty1">
            <el-input v-model="ruleForm.faculty1"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="real_name1">
            <el-input v-model="ruleForm.real_name1"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即添加</el-button>
            <el-button @click="cancelForm">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div class="show-user">
      <el-card class="box-card">
        <h3>用户管理</h3>
        <template>
          <div style="margin: 20px; display: flex">
            <!-- <div class="for-flex" style="flex：1"></div> -->
            <el-button
              type="primary"
              @click="toggleSelection(multipleSelection)"
            >
              删除选择
            </el-button>
            <el-button
              type="primary"
              @click="dialogVisible = dialogVisible = true"
              >添加用户</el-button
            >
            <el-input
              style="margin-left: 40px; margin-right: 20px"
              v-model="searchInput"
              placeholder="请输入内容"
            ></el-input>
            <el-button type="primary" @click="searchButton">搜索</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="userInCourseInfo"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column fixed prop="user_id" label="用户ID" width="80">
            </el-table-column>
            <el-table-column prop="user_name" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="180">
            </el-table-column>
            <el-table-column prop="user_role" label="权限角色" width="180">
            </el-table-column>
            <el-table-column prop="user_password" label="加密密码" width="300">
            </el-table-column>
            <el-table-column prop="real_name" label="真实姓名" width="180">
            </el-table-column>
            <el-table-column prop="college" label="所属学校" width="180">
            </el-table-column>
            <el-table-column prop="faculty" label="所属院系" width="180">
            </el-table-column>
            <el-table-column prop="user_number" label="工号/学号" width="180">
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="
                    deleteUserInfoRow(scope.$index, userInCourseInfo)
                  "
                  type="text"
                  size="small"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
import AllHeader from "@/components/AllHeader.vue";
export default {
  components: { AllHeader },
  data() {
    return {
      user_num: 0,
      searchInput: "",
      dialogVisible: false,
      userInCourseInfo: [],

      ruleForm: {
        user_name1: "",
        pass1: "",
        checkPass1: "",
        role1: "",
        phone1: "",
        college1: "",
        user_number1: "",
        faculty1: "",
        real_name1: "",
      },
      rules: {
        user_name1: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        pass1: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        checkPass1: [{ required: true, message: "输入", trigger: "blur" }],
        phone1: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        college1: [
          { required: true, message: "请输入所在学校", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.isLogin();
    this.ver();
  },
  computed() {},
  mounted() {
    this.getUsersIncourseInfo();
  },
  methods: {
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

    //提前获取课程内用户信息
    getUsersIncourseInfo() {
      /**直接查询用户表 */
      this.$axios.get(`/user/findAll`).then((res) => {
        this.userInCourseInfo = res.data;
        console.log(res);
        this.user_num = this.userInCourseInfo.length;
      });
    },

    /**
     * 删除方法
     */

    deleteUser(user_id) {
      this.$axios
        .get(`/user/deleteUserById`, {
          params: {
            user_id: user_id,
          },
        })
        .then((res) => {
          //   console.log(res);
          //   this.$message({
          //     type: "success",
          //     message: "删除成功!",
          //   });
          //   //刷新
          //   this.getUsersIncourseInfo();
        });
    },
    /**
     * 删除某用户
     */
    deleteUserInfoRow(index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteUser(this.userInCourseInfo[index].user_id);
          //刷新
          this.userInCourseInfo.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    /**
     * 批量删除
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(multipleSelection) {
      this.$confirm("此操作将永久删除所选用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          multipleSelection.forEach((m, index) => {
            console.log(index + "：" + m.user_id);
            this.deleteUser(m.user_id);
            //只能刷新
            this.getUsersIncourseInfo();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      //删除数据
      //   console.log(multipleSelection);
      //遍历删除
    },

    /**
     * 用户添加幕布
     */

    submitForm() {
      //选择性添加用户
      this.$axios
        .get(`/user/adminAddUser`, {
          params: {
            user_name: this.ruleForm.user_name1,
            user_password: this.ruleForm.pass1,
            phone: this.ruleForm.phone1,
            user_role: this.ruleForm.role1,
            college: this.ruleForm.college1,
            faculty: this.ruleForm.faculty1,
            user_number: this.ruleForm.user_number1,
            real_name: this.ruleForm.real_name1,
          },
        })
        .then((res) => {
          //   console.log(res);
          this.$message.success("添加成功！");
          this.dialogVisible = false;
          this.getUsersIncourseInfo();
        });
    },

    handleClose(done) {
      done();
    },
    searchButton() {
      //根据字符串模糊查询
      this.$axios
        .get(`/user/searchUserByStr`, {
          params: {
            str: this.searchInput,
          },
        })
        .then((res) => {
          console.log(res);
          this.userInCourseInfo = res.data;
        });
    },
  },
};
</script>
