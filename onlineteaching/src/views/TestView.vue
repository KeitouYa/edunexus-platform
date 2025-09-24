<template>
  <div class="home">
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
            <slot name="allHeader_username">{{
              $store.state.userLogin.user_name
            }}</slot>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">返回</el-dropdown-item>
            <el-dropdown-item command="2">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-button type="primary" @click="getDataForHomeworkOption">
      展示数据
    </el-button>
    <!-- 定义图表外层容器 -->
    <div id="myHomeChart" ref="homeEcharts"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course_user_num: 0, //班级中人数
      teacherInfo: {}, //学生当前所在课程的负责人 即教师
      homeworkOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      },
    };
  },
  created() {
    //用户信息
    this.isLogin();
    this.ver();
    this.isInCourse();
    this.ver2();
  },
  mounted() {
    // 调用当前图表
    this.getUsersIncourseInfo();
  },
  methods: {
    //这里需要有4个方法
    //isLogin(), ver() 获取用户信息
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
    //isInCourse ver2() 获取课程信息

    //获取登录用户信息
    isInCourse() {
      //判断sessionStorage中是否有登录信息
      if (sessionStorage.getItem("course") != null) {
        //存在登录信息就从sessionStorage中提取状态再传值给vuex中
        this.$store.commit("courseStatus", sessionStorage.getItem("course"));
      } else {
        //登录不成功就将vuex中的state清空
        this.$store.commit("courseStatus", null);
      }
      //返回登录状态islogin
      return this.$store.getters.isInCourse;
    },
    //通过登录状态来判断用户是否登录执行相关的操作
    ver2() {
      //用户已经登录
      if (this.$store.state.isInCourse) {
        console.log("已进入课程");
      } else {
        //如果没有成功进入就返回界面
        if (this.$store.state.userLogin.access === "1") {
          this.$router.push("/teacherView");
        } else if (this.$store.state.userLogin.access === "0") {
          this.$router.push("/studentView");
        }
        this.$message({
          message: "警告，请重新进入课程",
          type: "warning",
        });
      }
    },

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

    //提前获取课程内用户信息
    getUsersIncourseInfo() {
      /**获取课程负责人信息 */
      this.$axios
        .get(`/course/findTeacherByCourserId`, {
          params: {
            course_id: this.$store.state.courseIn.course_id,
          },
        })
        .then((res) => {
          //   console.log(res);
          this.teacherInfo = res.data;
        });
    },

    // 绘制图表
    dataChart() {
      //初始化图表，this.$refs.homeEcharts获取到图表容器
      var myChart = this.$echarts.init(this.$refs.homeEcharts);
      console.log("我就没进");
      console.log("option =  ", this.homeworkOption);
      // 把参数配置放到容器里
      myChart.setOption(this.homeworkOption);
    },
    // 销毁实例(看项目需要进行销毁实例)
    destroyChart() {
      this.$echarts.init(this.$refs.homeEcharts).dispose();
    },

    /**
     * 获取作业相关·数据
    //  */
    getDataForHomeworkOption() {
      //赋值
      this.$axios
        .get(`homework/submitHomeworkSituationAll`, {
          params: {
            user_id: this.teacherInfo.user_id,
            course_id: this.$store.state.courseIn.course_id,
            student_id: this.$store.state.userLogin.user_id,
          },
        })
        .then((res) => {
          console.log(res.data.length);
          let dataTitle = [];
          let dataGrade = [];
          res.data.forEach((d) => {
            dataTitle.push(d.title);
            dataGrade.push(Number(d.grade));
          });
          // console.log(dataTitle, dataGrade);
          this.homeworkOption.xAxis[0].data = dataTitle;
          this.homeworkOption.series[0].data = dataGrade;
          // console.log(this.homeworkOption);
          this.dataChart();
          // console.log(res.data);
          // console.log(this.attendanceReleasedLists.listsHistory);
          // console.log(this.attendanceReleasedLists.listsNotEnd);
        });
    },
  },
};
</script>
<style>
/* 给图表容器定义宽高 */
#myHomeChart {
  width: 1050px;
  height: 600px;
}
</style>
