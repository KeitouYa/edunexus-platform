<template>
  <div class="course-list" style="margin-top: 20px">
    <el-row>
      <el-col :span="24" v-for="(item, index) in param.lists" :key="index">
        <el-card :body-style="{ padding: '0px', display: `flex` }">
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
                  :title="item.title"
                  :column="1"
                >
                  <template slot="extra">
                    <el-button
                      type="primary"
                      @click="interCourse"
                      size="small"
                      style="height: 35px"
                    >
                      进入
                    </el-button>
                  </template>
                  <el-descriptions-item :label="param.labels.deadline">
                    {{ item.deadline }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="param.labels.content">
                    {{ item.content }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="param.labels.homework_name">
                    {{ item.homework_name }}
                  </el-descriptions-item>
                  <el-descriptions-item :label="param.labels.homework_path">
                    {{ item.homework_path }}
                  </el-descriptions-item>
                </el-descriptions>
              </slot>
              <el-button
                type="warning"
                size="small"
                style="height: 35px; margin-left: 20px; margin-right: 20px"
                @click="deleteCourse"
              >
                删除
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  data() {
    return {
      currentDate: new Date(),
      courseLists: [
        {
          course_id: 3,
          course_name: "软件工程",
          course_code: "37RYU8WE",
          introduce: "1.了解数据库基本原理 2.学习SQL 3.设计数据库表并优化",
          semester: "2021-2022",
          term: "全年",
          fk_user_id: 25,
        },
      ],
    };
  },
  methods: {
    interCourse(access) {
      if (access === "1") {
        this.$router.push("/teacherCourse");
      } else if (access === "0") {
        this.$router.push("/studentCourse");
      }
    },

    deleteCourse() {
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //访问后台进行删除
          console.log("//访问后台进行删除");
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  props: {
    param: Object,
  },
};
</script>

<style>
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
