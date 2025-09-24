<template>
  <div class="self-container">
    <!-- 头部 -->
    <AllHeader>
      <span slot="allHeader_username">
        {{ $store.state.userLogin.user_name }}
      </span>
    </AllHeader>

    <div class="Main">
      <Carousel> </Carousel>
      <!-- 下拉菜单按钮 -->
      <div class="drop-down-layout" style="display: flex">
        <div class="drop_down_left" style="flex: 1"></div>
        <div class="drop_down" style="margin: 20px">
          <div class="drop_down_context"></div>
          <el-dropdown split-button type="primary" @command="handleCommand">
            创建/加入课程
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">创建课程</el-dropdown-item>
              <el-dropdown-item command="b">加入课程</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <!-- 折叠板 -->
      <div class="course-collapse">
        <div class="course_collapse_teach">
          <el-collapse accordion :value="1">
            <!-- 第一个折叠板 -->
            <el-collapse-item :name="1">
              <template slot="title">
                我教的<i class="header-icon el-icon-info"></i>
              </template>
              <!-- 我教的内容 -->
              <div>
                <div>
                  <!-- 时间选择<time-select> -->
                  <div class="time-select" style="display: flex">
                    <div class="for-flex" style="flex: 1"></div>
                    <div class="block" style="margin-right: 20px">
                      <span class="demonstration">开始学年</span>
                      <el-date-picker
                        v-model="timeSelect.value1"
                        type="year"
                        placeholder="选择年"
                      >
                      </el-date-picker>
                    </div>

                    <div class="block" style="margin-right: 20px">
                      <span class="demonstration">结束学年</span>
                      <el-date-picker
                        v-model="timeSelect.value2"
                        type="year"
                        placeholder="选择年"
                      >
                      </el-date-picker>
                    </div>

                    <div class="block" style="margin-right: 20px">
                      <span>所在学期</span>
                      <el-select
                        v-model="timeSelect.value"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in timeSelect.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>

                    <div class="block">
                      <el-button type="primary" @click="selectCourse"
                        >查询</el-button
                      >
                    </div>
                    <div class="for-flex" style="flex: 1"></div>
                  </div>
                </div>
                <div>
                  <el-divider></el-divider>
                </div>

                <!-- 模糊搜索 -->
                <div
                  class="research-course"
                  style="magin-top: 30px; display: flex"
                >
                  <div class="for-flex" style="flex: 1"></div>
                  <el-input
                    v-model="inputResearchCourse"
                    placeholder="请输入内容"
                    style="width: 20%"
                  >
                  </el-input>
                  <span>
                    <el-button
                      type="primary"
                      round
                      @click="researchCourseBystr(inputResearchCourse)"
                      >搜索</el-button
                    >
                  </span>
                  <div class="for-flex" style="flex: 1"></div>
                </div>

                <div>
                  <el-divider></el-divider>
                </div>

                <!-- 课程列表 -->
                <div
                  class="course-list-context"
                  style="
                    margin-top: 40px;
                    padding-left: 10px;
                    padding-right: 10px;
                  "
                >
                  <el-row>
                    <el-col
                      :span="24"
                      v-for="(item, index) in courseLists"
                      :key="index"
                      style="margin-top: 20px"
                    >
                      <el-card
                        :body-style="{
                          padding: '5px',
                          display: `flex`,
                        }"
                      >
                        <slot name="img">
                          <!-- 变1 -->
                          <img
                            src="https://tse2-mm.cn.bing.net/th/id/OIP-C.n0_p3rYRuofABd3XudbZnAHaEo?pid=ImgDet&rs=1"
                            class="image"
                          />
                        </slot>
                        <div style="width: 80%; margin-left: 10px">
                          <!-- 变2 -->
                          <div class="bottom clearfix" style="display: flex">
                            <slot name="course_list_context">
                              <el-descriptions
                                class="margin-top"
                                :title="item.course_name"
                                :column="2"
                              >
                                <template slot="extra">
                                  <el-button
                                    type="primary"
                                    @click="interCourse(item)"
                                    size="small"
                                    style="height: 35px"
                                  >
                                    进入
                                  </el-button>
                                </template>
                                <el-descriptions-item label="课程码">
                                  {{ item.course_code }}
                                </el-descriptions-item>
                                <el-descriptions-item label="时间">
                                  {{ item.semester }} {{ item.term }}
                                </el-descriptions-item>
                                <el-descriptions-item label="介绍">
                                  <div
                                    style="
                                      overflow: auto;
                                      height: 100px;
                                      width: 100%;
                                    "
                                  >
                                    {{ item.introduce }}
                                  </div>
                                </el-descriptions-item>
                              </el-descriptions>
                            </slot>
                            <el-button
                              type="warning"
                              size="small"
                              style="
                                height: 35px;
                                margin-left: 20px;
                                margin-right: 20px;
                              "
                              @click="deleteCourse(index, item.course_id)"
                            >
                              删除
                            </el-button>
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-collapse-item>

            <!-- 第二个折叠板 -->
            <!-- <el-collapse-item name="2">
              <template slot="title">
                我学的<i class="header-icon el-icon-info"></i>
              </template>
              <div>所加入的课程</div>
            </el-collapse-item> -->
          </el-collapse>
        </div>

        <div class="course_collapse_learn"></div>
      </div>

      <!-- 创建课程 -->
      <div class="course-create">
        <el-dialog title="创建课程" :visible.sync="courseCreateVisible">
          <el-form
            :model="courseForm"
            :rules="courseRules"
            ref="courseForm"
            label-width="100px"
            class="demo-ruleForm"
            style="margin-right: 30px"
          >
            <el-form-item label="课程名称" prop="course_name">
              <el-input v-model="courseForm.course_name"></el-input>
            </el-form-item>
            <el-form-item label="课程介绍" prop="introduce">
              <el-input
                type="textarea"
                v-model="courseForm.introduce"
              ></el-input>
            </el-form-item>
            <!-- 时间选择 -->
            <el-form-item>
              <!-- 时间选择<time-select> -->
              <div class="time-select" style="display: flex">
                <div class="for-flex" style="flex: 1"></div>
                <div class="block" style="margin-right: 10px">
                  <span class="demonstration">开始学年</span>
                  <el-date-picker
                    v-model="timeSelectCreate.value1"
                    type="year"
                    placeholder="选择年"
                    style="width: 100%"
                  >
                  </el-date-picker>
                </div>
                <div class="block" style="margin-right: 10px">
                  <span class="demonstration">结束学年</span>
                  <el-date-picker
                    v-model="timeSelectCreate.value2"
                    type="year"
                    placeholder="选择年"
                    style="width: 100%"
                  >
                  </el-date-picker>
                </div>
                <div class="block" style="margin-right: 10px">
                  <span>所在学期</span>
                  <el-select
                    v-model="timeSelectCreate.value"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in timeSelectCreate.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="for-flex" style="flex: 1"></div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitCourseForm(courseForm)">
                立即创建
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>

      <!-- 加入课程 的幕布-->
      <div class="course-inter">
        <el-dialog title="加入课程" :visible.sync="courseInterVisible">
          加入课程表单
          <el-form
            :model="jionCourseCodeForm"
            ref="jionCourseCodeForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              prop="course_code"
              :rules="[{ required: true, message: '加课码不能为空' }]"
            >
              <el-input
                v-model.number="jionCourseCodeForm.course_code"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="
                  userJionCourse(
                    this.$store.state.userLogin.user_id,
                    jionCourseCodeForm.course_code
                  )
                "
              >
                确定
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import AllHeader from "@/components/AllHeader";
import CourseList from "@/components/CourseList";
import Carousel from "@/components/Carousel";
import TimeSelect from "@/components/TimeSelect.vue";
import DropDown from "@/components/DropDown.vue";
export default {
  components: {
    AllHeader,
    CourseList,
    Carousel,
    TimeSelect,
    DropDown,
  },
  name: "TeacherView",
  //使用钩子，每次刷新页面时就验证登录
  data() {
    return {
      //用户信息
      user: {},

      //时间选择
      timeSelect: {
        value1: "2021",
        value2: "2022",
        value: "不限",
        options: [
          { value: "不限", label: "不限" },
          { value: "全年", label: "全年" },
          { value: "第一学期", label: "第一学期" },
          { value: "第二学期", label: "第二学期" },
        ],
      },

      //对话框的展示与隐藏
      courseCreateVisible: false,
      courseInterVisible: false,
      //创建课程表单
      courseForm: {
        course_name: "",
        introduce: "",
      },
      //创建课程检查表单
      courseRules: {
        course_name: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20个字符", trigger: "blur" },
        ],
        introduce: [
          {
            required: false,
            message: "输入课程介绍",
            trigger: "blur",
          },
          {
            min: 0,
            max: 1000,
            message: "内容超过1000字，请重新输入！",
            trigger: "blur",
          },
        ],
      },
      //创建课程的时间存储
      timeSelectCreate: {
        value1: "2021",
        value2: "2022",
        value: "全年",
        options: [
          { value: "全年", label: "全年" },
          { value: "第一学期", label: "第一学期" },
          { value: "第二学期", label: "第二学期" },
        ],
      },
      courseLists: [],
      //查询相关
      inputResearchCourse: "",

      //创建加入课程表单
      jionCourseCodeForm: {
        course_code: "",
      },
    };
  },

  //获取登录用户信息
  created() {
    this.isLogin();
    this.ver();
  },
  computed: {},
  mounted() {
    this.getAllCourse();
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
    //课程自动展示
    getAllCourse: function () {
      console.log("getAllCourse");
      let id = this.$store.state.userLogin.user_id;
      this.$axios
        .get(`/course/findTeachCourse`, {
          params: {
            user_id: id,
          },
        })
        .then((res) => {
          this.courseLists = res.data;
        });
    },

    /**
     * 时间选择
     */
    getCourseTime: function (v1, v2) {
      if (v1 != "2021") {
        v1 = (v1 + "").split(" ");
        v1 = v1[3];
        v2 = (v2 + "").split(" ");
        v2 = v2[3];
      }
      if (!(Number(v2) - Number(v1) === 1)) {
        this.$message.error("开始和结束学年应相差一年!");
        return "";
      }
      return v1 + "-" + v2;
    },
    //选择下拉框
    handleCommand(command) {
      if (command === "a") {
        // 创建课程
        console.log("创建课程");
        this.courseCreateVisible = this.courseCreateVisible = true;
      } else if (command === "b") {
        //加入课程
        console.log("加入课程");
        this.courseInterVisible = this.courseInterrVisible = true;
      } else {
        this.$message.error("选择出错！");
      }
    },

    /**
     * 教师模糊查询
     */
    researchCourseBystr(inputResearchCourse) {
      let id = this.$store.state.userLogin.user_id;
      console.log(id);
      //模糊查询课程信息
      this.$axios
        .get(`/course/findCourseByStr`, {
          params: {
            str: inputResearchCourse,
            user_id: id,
          },
        })
        .then((res) => {
          //获取数据，进行展示
          this.courseLists = res.data;
        });
    },

    /**
     * courseList方法
     */
    //进入课程
    interCourse(course) {
      //需要现将课程信息存储起来
      sessionStorage.setItem("course", JSON.stringify(course));
      this.$store.dispatch("setCourse", JSON.stringify(course));
      //直接跳转到教师课程页面，同时将课程信息存储到state(到对应页面)
      this.$router.push("/teacherCourse");
    },

    //删除课程
    deleteCourse(index, courseId) {
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //访问后台进行删除
          console.log("//访问后台进行删除");
          this.$axios
            .get(`/course/deleteCourse`, {
              params: {
                course_id: courseId,
              },
            })
            .then((res) => {
              if (res.status === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //根据id删除数据
                this.courseLists.splice(index, 1);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    /**
     * 创建课程
     */
    submitCourseForm(courseForm) {
      this.$refs.courseForm.validate((valid) => {
        if (valid) {
          //提交
          let user_id = Number(this.$store.state.userLogin.user_id);
          //时间判断
          let semester = this.getCourseTime(
            this.timeSelectCreate.value1,
            this.timeSelectCreate.value2
          );
          if (semester != "") {
            this.$axios
              .get(`/course/addCourse`, {
                params: {
                  course_name: courseForm.course_name,
                  introduce: courseForm.introduce,
                  semester: semester,
                  term: this.timeSelectCreate.value,
                  fk_user_id: user_id,
                },
              })
              .then((res) => {
                console.log("课程创建成功");
                if (res.status === 0) {
                  this.$message.success(res.msg);
                  //取消创建显式
                  this.courseCreateVisible = false;
                  //重新加载课程
                  this.getAllCourse();
                }
              });
          } else {
            // alert("选择错误！");
            console.log("选择错误！");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    /***
     * 加入课程-展示不实现
     */
    userJionCourse(user_id, join_Course_code) {
      //遍历判断是否是自己教授的课程
    },
    selectCourse() {
      let semester = this.getCourseTime(
        this.timeSelect.value1,
        this.timeSelect.value2
      );
      if (semester != "") {
        console.log("查询:" + semester);
        this.$axios
          .get(`/course/findCourseByTime`, {
            params: {
              semester: semester,
              term: this.timeSelect.value,
              teach_user_id: this.$store.state.userLogin.user_id,
            },
          })
          .then((res) => {
            this.courseLists = res.data;
          });
      } else {
        // alert("选择错误！");
        console.log("选择错误！");
      }
    },
  },
};
</script>

<style scoped>
/* courseCreate样式 */
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 20%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
