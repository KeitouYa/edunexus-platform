<template>
  <div class="teacherCourse">
    <!-- 头部 -->
    <all-header>
      <span slot="allHeader_username">
        {{ $store.state.userLogin.user_name }}
      </span>
    </all-header>
    <div class="Main" style="padding-left: 20px; padding-right: 22px">
      <div class="card-description-course">
        <!-- 把描述放在卡片中 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $store.state.courseIn.course_name }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              总人数：{{ course_user_num }}
            </el-button>
          </div>
          <div>
            <el-descriptions title="详情" :column="2">
              <el-descriptions-item label="课程码">
                {{ $store.state.courseIn.course_code }}
              </el-descriptions-item>
              <el-descriptions-item label="课程时间">
                <span>
                  {{ $store.state.courseIn.semester }}
                  {{ $store.state.courseIn.term }}
                </span>
              </el-descriptions-item>
              <el-descriptions-item label="课程介绍">
                <el-collapse :value="0">
                  <el-collapse-item title="LOOK" :name="1">
                    <div>
                      {{ $store.state.courseIn.introduce }}
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-card>
      </div>

      <div class="course-tab-all" style="margin-top: 30px">
        <template class="course-tab-all-context">
          <el-tabs
            v-model="course_activeName"
            type="border-card"
            @tab-click="handleClick"
          >
            <!-- -------------------成员管理------------------------- -->
            <el-tab-pane label="成员管理" name="0">
              <div class="users-in-course-info-table">
                <template>
                  <i class="el-icon-user"></i> {{ teacherInfo.user_role }}：{{
                    teacherInfo.user_name
                  }}
                </template>
                <el-divider direction="vertical"></el-divider>
                <template>
                  <i class="el-icon-phone-outline"></i>{{ teacherInfo.phone }}
                </template>

                <template> </template>
                <el-divider></el-divider>
                <template>
                  <el-table
                    ref="multipleTable"
                    :data="userInCourseInfo"
                    border
                    stripe
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column
                      fixed
                      prop="user_id"
                      label="用户ID"
                      width="100"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="user_name"
                      label="用户名"
                      width="180"
                    >
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号" width="180">
                    </el-table-column>
                    <el-table-column prop="user_role" label="学生" width="180">
                    </el-table-column>
                    <el-table-column
                      prop="college"
                      label="所属学校"
                      width="180"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="faculty"
                      label="所属院系"
                      width="180"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="total_grade"
                      label="成绩"
                      width="180"
                    >
                    </el-table-column>
                    <el-table-column prop="real_name" label="姓名" width="180">
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </el-tab-pane>
            <!--------------------- 作业管理 ---------------------------->
            <el-tab-pane label="作业管理" name="1">
              <!-- 添加按钮 -->
              <!-- <div class="add-homework-button" style="display: flex">
                <div class="for-flex" style="flex: 1"></div>
                <el-input
                  style="margin-left: 100px"
                  v-model="homeworkReleasedLists.searchHomework"
                  placeholder="请输入搜索内容"
                ></el-input>
                <el-button
                  type="primary"
                  style="margin-right: 100px; margin-left: 50px"
                  @click="searchHomeworkButton"
                >
                  搜索
                </el-button>
              </div> -->
              <el-divider></el-divider>
              <!-- 作业列表 -->
              <div class="show-homework-released" style="margin-top: 30px">
                <div class="stu-not-submit-homework">
                  <h3>未提交的作业</h3>
                  <template>
                    <el-row>
                      <el-col
                        :span="24"
                        v-for="(item, index) in homeworkReleasedLists.lists"
                        :key="index"
                        style="margin-top: 20px"
                      >
                        <el-card :body-style="{ padding: '0px' }">
                          <div
                            class="homework-show-card-up"
                            style="display: flex"
                          >
                            <div style="width: 100%; margin-left: 10px">
                              <div
                                class="bottom clearfix"
                                style="display: flex"
                              >
                                <slot name="course_list_context">
                                  <el-descriptions
                                    class="margin-top"
                                    :title="item.title"
                                    :column="1"
                                  >
                                    <el-descriptions-item
                                      :label="
                                        homeworkReleasedLists.labels.deadline
                                      "
                                    >
                                      {{ item.deadline }}
                                    </el-descriptions-item>
                                    <el-descriptions-item
                                      :label="
                                        homeworkReleasedLists.labels.content
                                      "
                                    >
                                      <el-collapse :value="0">
                                        <el-collapse-item
                                          title="LOOK"
                                          :name="1"
                                        >
                                          <div>
                                            {{ item.content }}
                                          </div>
                                        </el-collapse-item>
                                      </el-collapse>
                                    </el-descriptions-item>
                                    <el-descriptions-item
                                      :label="
                                        homeworkReleasedLists.labels
                                          .homework_path
                                      "
                                    >
                                      <el-link
                                        :href="item.homework_path"
                                        type="primary"
                                      >
                                        {{ item.homework_path }}
                                      </el-link>
                                    </el-descriptions-item>
                                  </el-descriptions>
                                </slot>

                                <el-button
                                  size="small"
                                  style="
                                    height: 35px;
                                    margin-left: 20px;
                                    margin-right: 20px;
                                  "
                                  type="primary"
                                  @click="
                                    stuSubmitHomeworHandleInfo(index, item)
                                  "
                                >
                                  提交
                                </el-button>
                                <!-- Table -->
                              </div>
                            </div>
                          </div>

                          <!-- 作业提交折叠板 - 和作业创建幕布有点像 -->
                          <!-- 添加幕布 -->
                          <div class="submit-homework-dialog">
                            <el-dialog
                              title="提交作业"
                              :visible.sync="
                                homeworkReleasedLists.dialogTableVisible
                              "
                              :before-close="submitHomewokDialogHandleChange"
                            >
                              <el-form
                                :model="submitHomeworkForm"
                                :rules="nowSubmitHomeworkRules"
                                ref="submitHomeworkForm"
                                label-width="100px"
                                class="demo-ruleForm"
                                style="margin-right: 30px"
                              >
                                <el-form-item label="作业备注" prop="content">
                                  <el-input
                                    type="textarea"
                                    v-model="submitHomeworkForm.note"
                                  >
                                  </el-input>
                                </el-form-item>
                                <el-form-item v-show="!isUploadBoolean">
                                  <el-button
                                    type="primary"
                                    @click="submitHomeworkContent"
                                  >
                                    直接发布
                                  </el-button>
                                </el-form-item>
                                <el-form-item>
                                  <el-button @click="isUpload">
                                    额外上传文件
                                  </el-button>
                                </el-form-item>

                                <el-form-item
                                  label="提交附件"
                                  v-show="isUploadBoolean"
                                >
                                  <oss-upload :param="submitHomeworkForm">
                                  </oss-upload>
                                </el-form-item>
                              </el-form>
                            </el-dialog>
                          </div>
                        </el-card>
                      </el-col>
                    </el-row>
                  </template>
                </div>
                <el-divider></el-divider>
                <div class="stu-submit-homework">
                  <h3>已提交的作业</h3>
                  <template>
                    <!-- 我要上表格了 -->
                    <el-table
                      ref="stuSubmitHomeworkMultipleTable"
                      :data="homeworkSubmitLists.lists"
                      style="width: 100%"
                      @selection-change="stuSubmitHomeworkHandleSelectionChange"
                    >
                      <el-table-column type="expand">
                        <template slot-scope="props">
                          <el-form
                            label-position="left"
                            inline
                            class="demo-table-expand"
                          >
                            <el-form-item label="作业 ID">
                              <span>{{ props.row.homework_id }}</span>
                            </el-form-item>
                            <el-form-item label="作业名称">
                              <span>{{ props.row.title }}</span>
                            </el-form-item>
                            <el-form-item
                              :label="homeworkSubmitLists.labels.content"
                            >
                              <span>{{ props.row.content }}</span>
                            </el-form-item>
                            <el-form-item label="作业附件">
                              <el-link
                                :href="props.row.homework_name"
                                type="primary"
                              >
                                {{ props.row.homework_name }}
                              </el-link>
                            </el-form-item>
                            <el-form-item label="附件地址">
                              <span>{{ props.row.homework_path }}</span>
                            </el-form-item>
                            <el-form-item label="截止日期">
                              <span>{{ props.row.deadline }}</span>
                            </el-form-item>
                            <el-form-item
                              :label="
                                homeworkSubmitLists.labels.submit_create_time
                              "
                            >
                              <span>{{ props.row.submit_create_time }}</span>
                            </el-form-item>
                            <el-form-item
                              :label="homeworkSubmitLists.labels.note"
                            >
                              <span>{{ props.row.note }}</span>
                            </el-form-item>
                            <el-form-item
                              :label="homeworkSubmitLists.labels.submit_name"
                            >
                              <span>{{ props.row.submit_name }}</span>
                            </el-form-item>
                            <el-form-item
                              :label="homeworkSubmitLists.labels.submit_path"
                            >
                              <span>{{ props.row.submit_path }}</span>
                            </el-form-item>
                            <el-form-item
                              :label="homeworkSubmitLists.labels.comments"
                            >
                              <span>{{ props.row.comments }}</span>
                            </el-form-item>
                            <el-form-item
                              :label="homeworkSubmitLists.labels.grade"
                            >
                              <span>{{ props.row.grade }}</span>
                            </el-form-item>
                          </el-form>
                        </template>
                      </el-table-column>
                      <!-- <el-table-column type="selection" width="55">
                      </el-table-column> -->
                      <el-table-column
                        prop="homework_id"
                        label="作业ID"
                        width="80"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="title"
                        label="作业名称"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column label="作业内容" width="200">
                        <template slot-scope="scope">
                          <el-collapse
                            v-model="activeNames"
                            @change="handleChange"
                          >
                            <el-collapse-item title="内容" name="1">
                              <div>
                                {{ scope.row.content }}
                              </div>
                            </el-collapse-item>
                          </el-collapse>
                        </template>
                      </el-table-column>

                      <el-table-column
                        prop="homework_name"
                        label="作业附件"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="homework_path"
                        label="附件地址"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="deadline"
                        label="截止日期"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="submit_create_time"
                        label="提交作业时间"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="note"
                        label="提交作业备注"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="submit_name"
                        label="提交文件名称"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="submit_path"
                        label="提交文件路径"
                        width="180"
                      ></el-table-column>
                      <el-table-column
                        prop="comments"
                        label="教师评语"
                        width="180"
                      >
                      </el-table-column>
                      <el-table-column prop="grade" label="成绩" width="100">
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="60"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <el-button
                            @click.native.prevent="
                              editSubmitHomeworkInfoRow(scope.$index, scope.row)
                            "
                            type="text"
                            size="small"
                          >
                            更改
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>

                  <!-- 修改所用的幕布 -->
                  <!-- 更改幕布 -->
                  <div class="submit-homework-dialog">
                    <el-dialog
                      title="输入更改信息"
                      :visible.sync="homeworkReleasedLists.dialogTableVisible2"
                      :before-close="editHomewokDialogHandleChange"
                    >
                      <el-form
                        :model="submitHomeworkForm2"
                        :rules="nowSubmitHomeworkRules2"
                        ref="submitHomeworkForm2"
                        label-width="100px"
                        class="demo-ruleForm"
                        style="margin-right: 30px"
                      >
                        <el-form-item label="作业备注" prop="content">
                          <el-input
                            type="textarea"
                            v-model="submitHomeworkForm2.note"
                          >
                          </el-input>
                        </el-form-item>
                        <el-form-item label="提交附件">
                          <oss-upload :param="submitHomeworkForm2">
                          </oss-upload>
                        </el-form-item>
                      </el-form>
                    </el-dialog>
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="考勤管理" name="2">
              <el-button type="main" @click="getAttendanceISendButton()">
                刷新
              </el-button>
              <!-- 考勤列表 -->
              <div class="show-attendance-released" style="margin-top: 30px">
                <el-row>
                  <el-col
                    :span="24"
                    v-for="(item, index) in attendanceReleasedLists.listsNotEnd"
                    :key="index"
                    style="margin-top: 20px"
                  >
                    <el-card :body-style="{ padding: '0px' }">
                      <div
                        class="attendance-show-card-up"
                        style="display: flex"
                      >
                        <div style="width: 100%; margin-left: 10px">
                          <div class="bottom clearfix" style="display: flex">
                            <slot name="attendance_list_context">
                              <el-descriptions
                                class="margin-top"
                                :title="getAttendanceTitle(item.create_time)"
                                :column="3"
                              >
                                <el-descriptions-item label="开始时间">
                                  {{ item.create_time }}
                                </el-descriptions-item>

                                <el-descriptions-item label="当前时间">
                                  <now-time></now-time>
                                </el-descriptions-item>

                                <el-descriptions-item label="结束时间">
                                  {{ item.deadline }}
                                </el-descriptions-item>

                                <!-- <el-descriptions-item label="考勤码">
                                  <span class="info">
                                    {{ item.info }}
                                  </span>
                                </el-descriptions-item> -->

                                <el-descriptions-item label="考勤情况">
                                  <span>
                                    <el-tag>{{ item.sign_result }}</el-tag>
                                  </span>
                                </el-descriptions-item>
                              </el-descriptions>
                            </slot>

                            <el-button
                              size="small"
                              style="
                                height: 35px;
                                margin-left: 20px;
                                margin-right: 20px;
                              "
                              type="primary"
                              v-if="item.editButton"
                              @click="attendanceUserSign(item.attendance_id)"
                            >
                              签到
                            </el-button>
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
              <el-divider></el-divider>
              <div
                class="show-attendance-released-history"
                style="margin-top: 30px"
              >
                <el-row>
                  <el-col
                    :span="24"
                    v-for="(
                      item, index
                    ) in attendanceReleasedLists.listsHistory"
                    :key="index"
                    style="margin-top: 20px"
                  >
                    <el-card :body-style="{ padding: '0px' }">
                      <div
                        class="attendance-show-card-up"
                        style="display: flex"
                      >
                        <div style="width: 100%; margin-left: 10px">
                          <div class="bottom clearfix" style="display: flex">
                            <slot name="attendance_list_context">
                              <el-descriptions
                                class="margin-top"
                                :title="getAttendanceTitle(item.create_time)"
                                :column="3"
                              >
                                <el-descriptions-item label="开始时间">
                                  {{ item.create_time }}
                                </el-descriptions-item>

                                <el-descriptions-item label="当前时间">
                                  <now-time></now-time>
                                </el-descriptions-item>

                                <el-descriptions-item label="结束时间">
                                  {{ item.deadline }}
                                </el-descriptions-item>

                                <el-descriptions-item label="考勤码">
                                  <span class="info">
                                    {{ item.info }}
                                  </span>
                                </el-descriptions-item>

                                <el-descriptions-item label="考勤情况">
                                  <span>
                                    <el-tag>{{ item.sign_result }}</el-tag>
                                  </span>
                                </el-descriptions-item>
                              </el-descriptions>
                            </slot>
                            <!-- Table -->
                          </div>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
              <!-- 签到幕布 -->
              <div class="course-inter">
                <el-dialog
                  title="签到"
                  :visible.sync="attendanceReleasedLists.dialogVisible"
                  :before-close="afterSignHandleChange"
                >
                  <el-form
                    :model="userSignCodeForm"
                    ref="userSignCodeForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    style="margin-right: 80px"
                  >
                    <el-form-item
                      prop="code"
                      :rules="[
                        {
                          required: true,
                          message: '签到码不能为空',
                          trigger: 'blur',
                        },
                      ]"
                    >
                      <el-input
                        v-model="userSignCodeForm.code"
                        placeholder="请输入签到码"
                      ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="userSignAttendance()">
                        签到
                      </el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </div>
            </el-tab-pane>
            <el-tab-pane label="资料管理" name="3">
              <div class="material-top">
                <el-button
                  type="primary"
                  @click="
                    materialUploadDialogVisible =
                      materialUploadDialogVisible = true
                  "
                  >上传文件</el-button
                >
                <!-- 上传文件幕布打开 -->
                <div class="add-file-dialog">
                  <el-dialog
                    title="上传文件"
                    :visible.sync="materialUploadDialogVisible"
                    :before-close="fileShowHandleChange"
                  >
                    <el-form
                      :model="uploadMaterialForm"
                      :rules="materialRules"
                      ref="uploadMaterialForm"
                      label-width="100px"
                      class="demo-ruleForm"
                      style="margin-right: 80px"
                    >
                      <el-form-item prop="description">
                        <el-input
                          placeholder="文件简介"
                          v-model="uploadMaterialForm.material_description"
                        ></el-input>
                      </el-form-item>
                      <el-form-item>
                        <oss-upload :param="uploadMaterialForm"> </oss-upload>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </div>
              </div>
              <el-divider></el-divider>
              <div class="material-main">
                <!-- 文件列表 - 以表格形式展示 -->
                <template>
                  <el-table
                    ref="multipleTable"
                    :data="materialLists.lists"
                    stripe
                    border
                    style="width: 100%"
                    @selection-change="materialHandleSelectionChange"
                  >
                    <!-- <el-table-column type="selection" width="55">
                    </el-table-column> -->
                    <!-- 以下列是可编辑和查看的 -->
                    <el-table-column label="文件名" width="200">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">
                          {{ scope.row.material_name }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="文件路径" width="300">
                      <template slot-scope="scope">
                        <el-link :href="scope.row.material_path" type="primary">
                          {{ scope.row.material_path }}
                        </el-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="文件简介" width="300">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">
                          {{ scope.row.material_description }}
                        </span>
                      </template>
                    </el-table-column>

                    <el-table-column label="发布人" width="200">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">
                          {{ scope.row.user_name }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="联系方式" width="200">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">
                          {{ scope.row.phone }}
                        </span>
                      </template>
                    </el-table-column>

                    <!-- <el-table-column
                      label="操作"
                      width="250"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="
                            deteMaterialInCourseInfoRow(
                              scope.$index,
                              scope.row.material_id
                            )
                          "
                          type="primary"
                          size="small"
                        >
                          删除
                        </el-button>
                      </template>
                    </el-table-column> -->
                  </el-table>
                  <!-- <div style="margin-top: 20px">
                    <el-button
                      type="primary"
                      @click="materialSelection(materialMultipleSelection)"
                    >
                      批量删除
                    </el-button>
                  </div> -->
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="成绩管理" name="4">
              <el-card class="box-card">
                <div class="home">
                  <div id="myHomeChart" ref="homeEcharts"></div>
                </div>
              </el-card>
              <el-divider></el-divider>
              <el-card class="box-card">
                <el-button type="primary" @click="homeworkGrade">
                  作业成绩
                </el-button>
              </el-card>
            </el-tab-pane>
          </el-tabs>
          <div class="drop_down_left" style="flex: 1"></div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AllHeader from "@/components/AllHeader.vue";
import OssUpload from "@/components/OssUpload.vue";
import CourseList from "@/components/CourseList.vue";
import Countdown from "@choujiaojiao/vue2-countdown";
import NowTime from "@/components/NowTime.vue";
export default {
  components: { AllHeader, OssUpload, CourseList, Countdown, NowTime },
  name: "TeacherCourse",
  data() {
    return {
      isUploadBoolean: false,
      course_activeName: "0", //
      course_user_num: 0, //班级中人数
      userInCourseInfo: [], //用户管理成员信息
      teacherInfo: {}, //学生当前所在课程的负责人 即教师
      /******一下是与作业有关的信息***********/
      //作业创建幕布的显示与隐藏
      homeworCreateVisible: false,
      attendanceCreateVisible: false,
      attendanceShowVisible: false,
      materialUploadDialogVisible: false,

      //学生还没有提交的作业
      homeworkReleasedLists: {
        type: "teacher-release-homework",
        user_id: 0,
        course_id: 0,
        labels: {
          title: "作业标题",
          content: "作业内容",
          homework_path: "附件路径",
          homework_name: "附件名称",
          deadline: "截止日期",
        },
        // searchHomework: "",
        //提交作业幕布的展示与隐藏
        dialogTableVisible: false,
        dialogTableVisible2: false,

        lists: [],
      },
      submitHomeworkForm: {
        type: "2",
        file_path: "",
        file_name: "",
        user_id: 0,
        id: 0, //这个是作业id
        note: "", //作业内容
      },
      submitHomeworkForm2: {
        type: "4",
        file_path: "",
        file_name: "",
        user_id: 0,
        id: 0, //这个是作业id
        note: "", //作业内容
      },
      //学生已经提交的作业
      homeworkSubmitLists: {
        dialogTableVisible: false,
        labels: {
          homework_id: "作业 ID",
          title: "作业标题",
          content: "作业内容",
          homework_name: "作业附件",
          homework_path: "附件路径",
          deadline: "截止日期",
          submit_create_time: "提交时间",
          note: "提交备注",
          submit_name: "提交文件",
          submit_path: "文件路径",
          comments: "教师评语",
          grade: "成绩",
        },
        lists: [],
      },

      /********以下是考勤相关的信息**************/
      //展示正在等待的考勤
      attendanceReleasedLists: {
        attendance_id: 0, //临时存储签到id
        dialogVisible: false,
        lists: [],
        listsHistory: [],
        listsNotEnd: [],
        labels: {
          countdown: "考勤倒计时",
          is_end: "考勤状态",
          attendance_type: "考勤类型 [0-数字考勤]",
          info: "考勤码",
          // create_tim: "发布时间",
          attendance_time: "考勤时长（分钟）",
        },
      },

      userSignCodeForm: {
        code: "",
      },

      notAttendanceSignLists: {
        lists: [],
      },

      /***********以下是资料管理相关************* */
      uploadMaterialForm: {
        //作业创建需要提交的信息
        type: "3",
        file_path: "",
        file_name: "",
        user_id: 0,
        id: 0,
        //以下为自由内容,文件描述
        material_description: "",
      },
      materialLists: {
        lists: [],
      },

      //考勤饼图
      attendanceOption: {
        title: {
          text: "考勤统计",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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

    //提前获取课程内用户信息
    getUsersIncourseInfo() {
      //获取文件资料的信息
      this.uploadMaterialForm.user_id = this.$store.state.userLogin.user_id;
      this.uploadMaterialForm.id = this.$store.state.courseIn.course_id;

      this.$axios
        .get(`/usercourse/selectUserInCourseByCourseIdC`, {
          params: {
            course_id: this.$store.state.courseIn.course_id,
          },
        })
        .then((res) => {
          this.userInCourseInfo = res.data;
          // console.log(res);
          this.course_user_num = this.userInCourseInfo.length;
        });
      //根据course_id获取user_id->user_name

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

    /*-------------------以上获取信息-------------- */
    //获取和对比时间
    getAttendanceISend(deadline) {
      //还是要获取时间戳来比较
      console.log("截止：", deadline);
      let d = parseInt(new Date(deadline).getTime() / 1000);
      // console.log(
      //   "时间戳",
      //   d,
      //   parseInt(new Date().getTime() / 1000),
      //   d - parseInt(new Date().getTime() / 1000)
      // );
      let dd = d - parseInt(new Date().getTime() / 1000);
      if (dd > 0) {
        // console.log("未结束");
        return "未结束";
      } else {
        // console.log("已结束");
        return "已经结束";
      }
    },

    /**
     * 与文件管理有关的加载
     */
    fileShowHandleChange() {
      this.materialUploadDialogVisible =
        this.materialUploadDialogVisible = false;
      this.$axios
        .get(`/material/findAllMaterialByFk`, {
          params: {
            /**该课程内的所有资料 */
            course_id: this.$store.state.courseIn.course_id,
          },
        })
        .then((res) => {
          console.log(res);
          this.materialLists.lists = res.data;
          console.log(this.materialLists.lists);
        });
    },

    /**
     * 刷新获取等待考勤信息
     */
    getAttendanceISendButton() {
      this.$axios
        .get(`attendance/findStudentSignSituation`, {
          params: {
            user_id: this.teacherInfo.user_id,
            course_id: this.$store.state.courseIn.course_id,
            student_id: this.$store.state.userLogin.user_id,
          },
        })
        .then((res) => {
          // console.log(res.data.length);
          //获取所有考勤信息
          this.attendanceReleasedLists.lists = res.data;
          this.attendanceReleasedLists.listsHistory = [];
          this.attendanceReleasedLists.listsNotEnd = [];
          this.attendanceReleasedLists.lists.forEach((a) => {
            if (this.getAttendanceISend(a.deadline) === "已经结束") {
              if (a.sign_result === null || a.user_sign_id === 0) {
                //未添加且结束
                a.sign_result = "旷课";
                this.$axios
                  .get(`/usersign/studentSignAuto`, {
                    params: {
                      student_id: this.$store.state.userLogin.user_id,
                      attendance_id: a.attendance_id,
                    },
                  })
                  .then((res) => {
                    console.log("结束且尚未签到", res);
                  });
              }
              this.attendanceReleasedLists.listsHistory.push(a);
            } else if (this.getAttendanceISend(a.deadline) === "未结束") {
              if (a.sign_result === null || a.user_sign_id === 0) {
                a.sign_result = "未签到";
                this.$set(a, "editButton", true);
              } else {
                this.$set(a, "editButton", false);
              }
              this.attendanceReleasedLists.listsNotEnd.push(a);
            }
          });

          // console.log(res.data);
          // console.log(this.attendanceReleasedLists.listsHistory);
          // console.log(this.attendanceReleasedLists.listsNotEnd);
          // console.log(this.attendanceReleasedLists.lists);
        });
    },

    /**
     * 考勤饼图
     */

    // 绘制图表
    dataChart(option) {
      //初始化图表，this.$refs.homeEcharts获取到图表容器
      var myChart = this.$echarts.init(this.$refs.homeEcharts);
      console.log("饼图");
      console.log("option =  ", option);
      // 把参数配置放到容器里
      myChart.setOption(option);
    },
    // 销毁实例(看项目需要进行销毁实例)
    destroyChart() {
      this.$echarts.init(this.$refs.homeEcharts).dispose();
    },

    /**
     * 获取数据
     */
    getDataForAttendanceOption() {
      //赋值
      this.$axios
        .get(`attendance/findStudentSignSituation`, {
          params: {
            user_id: this.teacherInfo.user_id,
            course_id: this.$store.state.courseIn.course_id,
            student_id: this.$store.state.userLogin.user_id,
          },
        })
        .then((res) => {
          // console.log(res.data.length);
          //获取所有考勤信息
          this.attendanceReleasedLists.lists = res.data;
          this.attendanceReleasedLists.listsHistory = [];
          this.attendanceReleasedLists.listsNotEnd = [];
          this.attendanceReleasedLists.lists.forEach((a) => {
            if (this.getAttendanceISend(a.deadline) === "已经结束") {
              if (a.sign_result === null || a.user_sign_id === 0) {
                //未添加且结束
                a.sign_result = "旷课";
                this.$axios
                  .get(`/usersign/studentSignAuto`, {
                    params: {
                      student_id: this.$store.state.userLogin.user_id,
                      attendance_id: a.attendance_id,
                    },
                  })
                  .then((res) => {
                    console.log("结束且尚未签到", res);
                  });
              }
              this.attendanceReleasedLists.listsHistory.push(a);
            } else if (this.getAttendanceISend(a.deadline) === "未结束") {
              if (a.sign_result === null || a.user_sign_id === 0) {
                a.sign_result = "未签到";
                this.$set(a, "editButton", true);
              } else {
                this.$set(a, "editButton", false);
              }
              this.attendanceReleasedLists.listsNotEnd.push(a);
            }
          });

          //统计数据 - 出勤，迟到，旷课 ，请假，早退，未签到
          let data = [
            { value: 0, name: "出勤" },
            { value: 0, name: "迟到" },
            { value: 0, name: "旷课" },
            { value: 0, name: "请假" },
            { value: 0, name: "早退" },
            { value: 0, name: "未签到" },
          ];
          this.attendanceReleasedLists.lists.forEach((a) => {
            if (a.sign_result === "出勤") {
              data[0].value += 1;
            } else if (a.sign_result === "迟到") {
              data[1].value += 1;
            } else if (a.sign_result === "旷课") {
              data[2].value += 1;
            } else if (a.sign_result === "请假") {
              data[3].value += 1;
            } else if (a.sign_result === "早退") {
              data[4].value += 1;
            } else if (a.sign_result === "未签到") {
              data[5].value += 1;
            }
          });
          let len = this.attendanceReleasedLists.lists.length;
          data.forEach((d) => {
            d.value = d.value / len;
          });
          console.log("饼图", data);
          this.attendanceOption.series[0].data = data;
          var myChart = this.$echarts.init(this.$refs.homeEcharts);
          // 把参数配置放到容器里
          this.dataChart(this.attendanceOption);
          // console.log(res.data);
          // console.log(this.attendanceReleasedLists.listsHistory);
          // console.log(this.attendanceReleasedLists.listsNotEnd);
        });
    },

    homeworkGrade() {
      this.$router.push("/testView");
    },

    /*-------------------课程总管理菜单-------------------------*/
    handleClick(tab, event) {
      //点击后传递的数据
      if (tab._props.name === "0") {
        console.log("成员管理");
        this.$axios
          .get(`/usercourse/selectUserInCourseByCourseIdC`, {
            params: {
              course_id: this.$store.state.courseIn.course_id,
            },
          })
          .then((res) => {
            this.userInCourseInfo = res.data;
            // console.log(res);
            this.course_user_num = this.userInCourseInfo.length;
          });
      } else if (tab._props.name === "1") {
        console.log("作业管理");
        //作业列表获取1
        this.$axios
          .get(`/homework/findStudentNotSubmitHomework`, {
            params: {
              user_id: this.teacherInfo.user_id,
              course_id: this.$store.state.courseIn.course_id,
              student_id: this.$store.state.userLogin.user_id,
            },
          })
          .then((res) => {
            if (res) {
              // this.$message.success(res.msg);
              this.homeworkReleasedLists.lists = res.data;
              //添加是否截止的判断
            }
          });
        //作业列表2
        // 获取已经提交的作业信息
        this.$axios
          .get(`/homework/findStudentSubmitHomework`, {
            params: {
              user_id: this.teacherInfo.user_id,
              course_id: this.$store.state.courseIn.course_id,
              student_id: this.$store.state.userLogin.user_id,
            },
          })
          .then((res) => {
            // console.log(res);
            this.homeworkSubmitLists.lists = res.data;
            //添加一个幕布开启动作
            for (var i = 0; i < this.homeworkSubmitLists.lists.length; i++) {
              this.$set(this.homeworkSubmitLists.lists[i], "editButton", false);
            }
            console.log(this.homeworkSubmitLists.lists);
          });
      } else if (tab._props.name === "2") {
        console.log("考勤管理");
        this.getAttendanceISendButton();
      } else if (tab._props.name === "3") {
        console.log("资料管理");
        //获取所有资料信息
        this.fileShowHandleChange();
      } else if (tab._props.name === "4") {
        console.log("成绩管理");
        this.getDataForAttendanceOption();
      }
    },

    /*-------------------成员管理------------------------- */
    //删除成员
    deleteUserFromCoursee(index, user_id) {
      this.$axios
        .get(`/usercourse/deleteUserFormCourse`, {
          params: {
            user_id: user_id,
            course_id: this.$store.state.courseIn.course_id,
          },
        })
        .then((res) => {
          if (res.status === 0) {
            this.$message.success(res.msg);
            this.userInCourseInfo.splice(index, 1);
            this.course_user_num = this.userInCourseInfo.length;
          }
        });
    },

    /*------------------作业管理------------------------- */
    submitHomeworkContent() {
      //上传的内容有title content deadline-以时间戳的形式传递
      this.$confirm("此次作业并没有添加附件, 是否直接提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //访问添加
          this.$axios
            .get(`/SubmitHomeworkController/submitMyHomework`, {
              params: {
                user_id: this.submitHomeworkForm.user_id,
                homework_id: this.submitHomeworkForm.id,
                note: this.submitHomeworkForm.note,
              },
            })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "发布成功!",
              });
              this.homeworkReleasedLists.dialogTableVisible =
                !this.homeworkReleasedLists.dialogTableVisible;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布",
          });
        });
    },
    // 上传文件组件选择性显现
    isUpload() {
      this.isUploadBoolean = !this.isUploadBoolean;
    },
    stuSubmitHomeworHandleInfo(index, item) {
      //提交作业
      this.homeworkReleasedLists.dialogTableVisible =
        this.homeworkReleasedLists.dialogTableVisible = true;
      //获取ID
      this.submitHomeworkForm.user_id = this.$store.state.userLogin.user_id;
      this.submitHomeworkForm.id = item.homework_id;
    },
    submitHomeworkContent() {
      //上传的内容有title content deadline-以时间戳的形式传递
      this.$confirm("此次作业并没有添加附件, 是否直接提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("作业ID", this.submitHomeworkForm.id);
          //访问添加
          this.$axios
            .get(`/SubmitHomeworkController/submitMyHomework`, {
              params: {
                user_id: this.submitHomeworkForm.user_id,
                homework_id: this.submitHomeworkForm.id,
                note: this.submitHomeworkForm.note,
              },
            })
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "发布成功!",
              });
              this.homeworkReleasedLists.dialogTableVisible =
                !this.homeworkReleasedLists.dialogTableVisible;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布",
          });
        });
    },
    /**更新列表 */
    submitHomewokDialogHandleChange() {
      this.homeworkReleasedLists.dialogTableVisible =
        this.homeworkReleasedLists.dialogTableVisible = false;
      //作业列表获取1
      this.$axios
        .get(`/homework/findStudentNotSubmitHomework`, {
          params: {
            user_id: this.teacherInfo.user_id,
            course_id: this.$store.state.courseIn.course_id,
            student_id: this.$store.state.userLogin.user_id,
          },
        })
        .then((res) => {
          if (res) {
            // this.$message.success(res.msg);
            this.homeworkReleasedLists.lists = res.data;
            //添加是否截止的判断
          }
        });
      //作业列表2
      // 获取已经提交的作业信息
      this.$axios
        .get(`/homework/findStudentSubmitHomework`, {
          params: {
            user_id: this.teacherInfo.user_id,
            course_id: this.$store.state.courseIn.course_id,
            student_id: this.$store.state.userLogin.user_id,
          },
        })
        .then((res) => {
          // console.log(res);
          this.homeworkSubmitLists.lists = res.data;
          //添加一个幕布开启动作
          for (var i = 0; i < this.homeworkSubmitLists.lists.length; i++) {
            this.$set(this.homeworkSubmitLists.lists[i], "editButton", false);
          }
          console.log(this.homeworkSubmitLists.lists);
        });
    },

    /**
     * //关闭幕布前的操作，刷新未提交和已提交的文件列表
     * 学生提交作业
     */

    homeworkCreateDialogHandleChange() {
      //查询
      this.$axios
        .get(`/usercourse/selectUserInCourseByCourseIdC`, {
          params: {
            course_id: this.$store.state.courseIn.course_id,
          },
        })
        .then((res) => {
          this.userInCourseInfo = res.data;
          // console.log(res);
          this.course_user_num = this.userInCourseInfo.length;
        });
      //排序 - 不排序了，直接通过后台排序
      this.homeworCreateVisible = false;
    },

    /**
     *  更改提交的作业
     */
    editSubmitHomeworkInfoRow(index, row) {
      // console.log(index, row.submit_homework_id);
      this.$confirm("此操作将更改提交信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //提交作业
          //提交作业
          this.homeworkReleasedLists.dialogTableVisible2 =
            this.homeworkReleasedLists.dialogTableVisible2 = true;
          //获取ID
          this.submitHomeworkForm2.user_id =
            this.$store.state.userLogin.user_id;
          this.submitHomeworkForm2.id = row.submit_homework_id;
          // this.$message({
          //   type: "success",
          //   message: "更改成功!",
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更改",
          });
        });
    },

    editHomewokDialogHandleChange() {
      //提交作业
      this.homeworkReleasedLists.dialogTableVisible2 =
        this.homeworkReleasedLists.dialogTableVisible2 = false;
      //需要重新加载
      //作业列表2
      // 获取已经提交的作业信息
      this.$axios
        .get(`/homework/findStudentSubmitHomework`, {
          params: {
            user_id: this.teacherInfo.user_id,
            course_id: this.$store.state.courseIn.course_id,
            student_id: this.$store.state.userLogin.user_id,
          },
        })
        .then((res) => {
          // console.log(res);
          this.homeworkSubmitLists.lists = res.data;
          //添加一个幕布开启动作
          for (var i = 0; i < this.homeworkSubmitLists.lists.length; i++) {
            this.$set(this.homeworkSubmitLists.lists[i], "editButton", false);
          }
          console.log(this.homeworkSubmitLists.lists);
        });
    },

    /**
     * 作业模糊查询 - 根据作业名称 截止日期查询
     */
    // searchHomeworkButton() {
    //   console.log(
    //     this.$store.state.courseIn.course_id,
    //     this.homeworkReleasedLists.searchHomework
    //   );
    //   this.$axios
    //     .get(`/homework/findHomeworkByStr`, {
    //       str: this.homeworkReleasedLists.searchHomework,
    //       course_id: this.$store.state.courseIn.course_id,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     });
    // },

    /**----------------考勤管理----------------------- */
    afterSignHandleChange() {
      //关闭之前再进行一次查询
      //展示所有考勤信息
      this.getAttendanceISendButton();
      this.attendanceReleasedLists.dialogVisible = false;
    },

    //进行签到
    attendanceUserSign(attendance_id) {
      //签到，把自己加进去
      this.attendanceReleasedLists.dialogVisible = true;
      this.attendanceReleasedLists.attendance_id = attendance_id;
    },

    userSignAttendance() {
      console.log("签到码：" + this.userSignCodeForm.code);
      console.log(
        this.$store.state.userLogin.user_id,
        this.attendanceReleasedLists.attendance_id
      );

      this.$axios
        .get(`/usersign/studentSign`, {
          params: {
            info: this.userSignCodeForm.code,
            student_id: this.$store.state.userLogin.user_id,
            attendance_id: this.attendanceReleasedLists.attendance_id,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },

    //编辑时的变化
    editUserSignInfoRow(index, row) {
      this.attendanceSignLists.editInput = !this.attendanceSignLists.editInput;
      if (this.attendanceSignLists.editInput === false) {
        this.attendanceSignLists.editButton = "确定编辑";
      } else if (this.attendanceSignLists.editInput === true) {
        this.attendanceSignLists.editButton = "编辑";
        //保存修改后的数据
        this.attendanceSignLists.lists[index].sign_result = row.sign_result;
        //获取当前时间
        this.attendanceSignLists.lists[index].update_time = new Date();
        //传入修改
        this.$axios
          .get(`/usersign/updateUserSign`, {
            params: {
              sign_result: row.sign_result,
              user_sign_id: row.user_sign_id,
            },
          })
          .then((res) => {
            // console.log(res);
          });
      }
      //根据index修改信息
    },
    getAttendanceTitle(create_time) {
      let create = create_time.split(" ");
      // console.log(create);
      return create[0];
    },
    editUserNotSignInfoRow(index, row) {
      this.notAttendanceSignLists.lists[index].edit_button =
        !this.notAttendanceSignLists.lists[index].edit_button;
      if (this.notAttendanceSignLists.lists[index].edit_button == false) {
        this.notAttendanceSignLists.lists[index].edit_button_name = "确定选择";
      } else if (this.notAttendanceSignLists.lists[index].edit_button == true) {
        this.notAttendanceSignLists.lists[index].edit_button_name = "选择";
        //确定选择后的操作
        // 保存修改后的数据
        this.notAttendanceSignLists.lists[index] = row.sign_result;
        //修改传入后端
        this.$axios
          .get(`usersign/addUserSign`, {
            params: {
              sign_result: row.sign_result,
              //用户加入
              user_id: row.user_id,
              attendance_id: row.attendance_id,
            },
          })
          .then((res) => {
            // console.log(res);
            this.notAttendanceSignLists.lists.splice(index, 1);
            this.attendanceSubmitLookInfo(row.attendance_id);
          });
      }
    },

    /*---------------------资料管理------------------- */

    //批量删除
    //选择框状态切换--将选中的数据随时存储在multipleSelection中
    materialHandleSelectionChange(val) {
      this.materialMultipleSelection = val;
    },
    materialSelection(materialMultipleSelection) {
      //删除数据
      //   console.log(materialMultipleSelection);
      //遍历删除
      materialMultipleSelection.forEach((m, index) => {
        console.log(index + "：" + m.material_id);
        this.deleteMaterialFromCourse(index, m.material_id);
      });
    },
  },
};
</script>

<style>
/* 卡片样式 */
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-top: 30px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
