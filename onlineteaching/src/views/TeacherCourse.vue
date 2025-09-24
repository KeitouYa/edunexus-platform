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
                  <el-table
                    ref="multipleTable"
                    :data="userInCourseInfo"
                    border
                    stripe
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" width="55">
                    </el-table-column>
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
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="120"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="
                            deleteUserInCourseInfoRow(
                              scope.$index,
                              userInCourseInfo
                            )
                          "
                          type="text"
                          size="small"
                        >
                          退课
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="margin-top: 20px">
                    <el-button
                      type="primary"
                      @click="toggleSelection(multipleSelection)"
                      >删除选择</el-button
                    >
                  </div>
                </template>
              </div>
            </el-tab-pane>
            <!--------------------- 作业管理 ---------------------------->
            <el-tab-pane label="作业管理" name="1">
              <!-- 添加按钮 -->
              <div class="add-homework-button" style="display: flex">
                <div class="for-flex" style="flex: 1"></div>
                <el-button
                  type="primary"
                  style="margin-right: 30px"
                  @click="homeworCreateVisible = homeworCreateVisible = true"
                >
                  发布作业
                </el-button>
              </div>
              <!-- 添加幕布 -->
              <div class="add-homework-dialog">
                <el-dialog
                  title="创建作业"
                  :visible.sync="homeworCreateVisible"
                  :before-close="homeworkCreateDialogHandleChange"
                >
                  <el-form
                    :model="createHomeworkForm"
                    :rules="courseRules"
                    ref="createHomeworkForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    style="margin-right: 30px"
                  >
                    <el-form-item label="作业标题" prop="title">
                      <el-input v-model="createHomeworkForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="作业内容" prop="content">
                      <el-input
                        type="textarea"
                        v-model="createHomeworkForm.content"
                      >
                      </el-input>
                    </el-form-item>
                    <el-form-item label="截止日期" prop="deadline">
                      <div class="block">
                        <el-date-picker
                          v-model="createHomeworkForm.deadline"
                          type="datetime"
                          placeholder="选择日期时间"
                        >
                        </el-date-picker>
                      </div>
                    </el-form-item>
                    <el-form-item v-show="!isUploadBoolean">
                      <el-button type="primary" @click="addHomeworkContent">
                        直接发布
                      </el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click="isUpload"> 额外上传文件 </el-button>
                    </el-form-item>
                    <el-form-item label="作业附件" v-show="isUploadBoolean">
                      <oss-upload :param="createHomeworkForm"> </oss-upload>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </div>
              <el-divider></el-divider>
              <!-- 作业列表 -->
              <div class="show-homework-released" style="margin-top: 30px">
                <el-row>
                  <el-col
                    :span="24"
                    v-for="(item, index) in homeworkReleasedLists.lists"
                    :key="index"
                    style="margin-top: 20px"
                  >
                    <el-card :body-style="{ padding: '0px' }">
                      <div class="homework-show-card-up" style="display: flex">
                        <slot name="img">
                          <!-- 变1 -->
                          <img
                            style="width: 250px"
                            src="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg"
                            class="image"
                          />
                        </slot>
                        <div style="width: 80%; margin-left: 10px">
                          <div class="bottom clearfix" style="display: flex">
                            <slot name="course_list_context">
                              <el-descriptions
                                class="margin-top"
                                :title="item.title"
                                :column="1"
                              >
                                <el-descriptions-item
                                  :label="homeworkReleasedLists.labels.deadline"
                                >
                                  {{ item.deadline }}
                                </el-descriptions-item>
                                <el-descriptions-item
                                  :label="homeworkReleasedLists.labels.content"
                                >
                                  <el-collapse :value="0">
                                    <el-collapse-item title="LOOK" :name="1">
                                      <div>
                                        {{ item.content }}
                                      </div>
                                    </el-collapse-item>
                                  </el-collapse>
                                </el-descriptions-item>

                                <el-descriptions-item
                                  :label="
                                    homeworkReleasedLists.labels.homework_path
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
                              @click="homeworksubmitLookInfo(item.homework_id)"
                            >
                              提交详情
                            </el-button>
                            <!-- Table -->

                            <el-button
                              type="warning"
                              size="small"
                              style="
                                height: 35px;
                                margin-left: 20px;
                                margin-right: 20px;
                              "
                              @click="deleteHomework(index, item.homework_id)"
                            >
                              删除
                            </el-button>
                          </div>
                        </div>
                      </div>
                      <!-- 作业提交情况折叠板 -->
                      <div class="homework-show-stu-submit">
                        <el-dialog
                          width="96%"
                          title="作业提交"
                          :visible.sync="homeworkSubmitLists.dialogTableVisible"
                        >
                          总人数：{{ course_user_num }} 提交人数：{{
                            homeworkSubmitLists.lists.length
                          }}
                          <template>
                            <el-table
                              ref="multipleTable"
                              :data="homeworkSubmitLists.lists"
                              stripe
                              border
                              style="width: 100%; height: 500px"
                              @selection-change="handleSelectionChange"
                            >
                              <!-- 需要展示的信息列
                              - 选择框
                              - 用户名
                              - 提交时间
                              - 提交状态（0未超时,1超时）- 可修改
                              - 提交内容
                              - 提交附件（作业名+作业地址-点击即可下载）
                              - 教师评语 - 
                              - 成绩 - 可修改，可排序
                              - 编辑按钮
                              共需要设置9列
                            
                             -->
                              <el-table-column type="selection" width="55">
                              </el-table-column>
                              <!-- 以下列是可编辑和查看的 -->
                              <el-table-column label="用户名/学号" width="200">
                                <template slot-scope="scope">
                                  <span style="margin-left: 10px">
                                    {{ scope.row.user_name }}/{{
                                      scope.row.user_number
                                    }}
                                  </span>
                                </template>
                              </el-table-column>

                              <el-table-column
                                label="作业附件（点击下载）"
                                width="200"
                              >
                                <template slot-scope="scope">
                                  <el-link
                                    :href="scope.row.submit_path"
                                    type="primary"
                                  >
                                    {{ scope.row.submit_name }}
                                  </el-link>
                                </template>
                              </el-table-column>
                              <el-table-column label="作业内容" width="200">
                                <template slot-scope="scope">
                                  <span style="margin-left: 10px">
                                    {{ scope.row.note }}
                                  </span>
                                </template>
                              </el-table-column>

                              <el-table-column label="教师评语" width="200">
                                <template slot-scope="scope">
                                  <el-input
                                    :disabled="homeworkSubmitLists.editInput"
                                    v-model="scope.row.comments"
                                    placeholder="教师评论"
                                  >
                                    {{ scope.row.comments }}
                                  </el-input>
                                </template>
                              </el-table-column>

                              <el-table-column label="成绩" width="200">
                                <template slot-scope="scope">
                                  <el-input
                                    :disabled="homeworkSubmitLists.editInput"
                                    v-model="scope.row.grade"
                                    placeholder="满分100"
                                  >
                                    {{ scope.row.grade }}
                                  </el-input>
                                </template>
                              </el-table-column>
                              <el-table-column label="提交时间" width="200">
                                <template slot-scope="scope">
                                  <span style="margin-left: 10px">
                                    {{ scope.row.create_time }}
                                  </span>
                                </template>
                              </el-table-column>

                              <el-table-column
                                label="状态（0-未超时，1-超时）"
                                width="200"
                              >
                                <template slot-scope="scope">
                                  <span style="margin-left: 10px">
                                    {{ scope.row.homework_status }}
                                  </span>
                                </template>
                              </el-table-column>

                              <el-table-column
                                label="操作"
                                width="120"
                                show-overflow-tooltip
                              >
                                <template slot-scope="scope">
                                  <el-button
                                    @click.native.prevent="
                                      editUserHomeworkSubmitInfoRow(
                                        scope.$index,
                                        scope.row
                                      )
                                    "
                                    type="primary"
                                    size="small"
                                  >
                                    {{ homeworkSubmitLists.editButton }}
                                  </el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                            <!-- <div style="margin-top: 20px">
                              <el-button
                                type="primary"
                                @click="toggleSelection(multipleSelection)"
                              >
                                删除选择
                              </el-button>
                            </div> -->
                          </template>
                        </el-dialog>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>

            <el-tab-pane label="考勤管理" name="2">
              <!-- 添加按钮 -->
              <div class="add-attendance-button" style="display: flex">
                <div class="for-flex" style="flex: 1"></div>
                <el-button
                  type="primary"
                  style="margin-right: 30px"
                  @click="
                    attendanceCreateVisible = attendanceCreateVisible = true
                  "
                >
                  发布考勤
                </el-button>
              </div>
              <!-- 设置添加幕布 
                - 考勤所拥有的信息：
                - attendance_id
                - attendance_type 考勤类型：默认为0即数字考勤
                - info 考勤信息-这里是考勤码4位数值 
                - attendance_time 考勤时长-以分钟为单位 考勤市场
                - is_end 考勤是否结束
                - create_time 考勤创建时间- 但是不将这个作为考勤情况
                - 考勤方式：
                 - 倒计时考勤
                 - 提前结束考勤
              -->
              <div class="add-attendance-dialog">
                <el-dialog
                  title="数字考勤"
                  :visible.sync="attendanceCreateVisible"
                  :before-close="attendanceReHandleChange"
                >
                  <el-form
                    :model="createAttendanceForm"
                    :rules="attendanceRules"
                    ref="createAttendanceForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    style="margin-right: 30px"
                  >
                    <!-- 选择考勤时长 -->
                    <el-form-item label="考勤截止时间" prop="deadline">
                      <!-- <template>
                        <el-select
                          v-model="createAttendanceForm.attendance_time"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in attendanceTimeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                        分钟
                      </template> -->
                      <!-- 时间选择框 -->
                      <div class="block">
                        <el-date-picker
                          v-model="createAttendanceForm.deadline"
                          type="datetime"
                          placeholder="选择日期时间"
                        >
                        </el-date-picker>
                      </div>
                    </el-form-item>

                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="
                          createAttendanceSubmit(createAttendanceForm.deadline)
                        "
                      >
                        立即发布
                      </el-button>
                      <el-button
                        @click="
                          attendanceCreateVisible =
                            attendanceCreateVisible = false
                        "
                      >
                        取消
                      </el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </div>
              <!-- 设置正在考勤的展示幕布

               - 从创建时间开始计时 - 需要再次查询考勤表 
              考勤展示内容：
              * 考勤数字 - t_attendance_id ->根据当前尚未截止的考勤来查询
              select * from t_attendance_id where is_end = 0。
              根据以上展示考勤数字
              * 考勤人数 select * from t_user_id where fk_attendance_id = ?查询到参与该考勤的所有表信息->users.size()获取考勤人数->只返回前端一个人数

              * 设置计时器 - 不用Java后端设置，在前端设置，在点击发布的那一刻，- 标识的数字内容发生变化，
              通过watch检测后，进行正在考勤的幕布展示- 考勤数字，
              获取的信息 - 当前时间+时长
              这个幕布不要了
              -->
              <!-- <div class="show-attendance-dialog">
                <el-dialog
                  title="当前考勤"
                  :visible.sync="attendanceShowVisible"
                  :before-close="attendanceShowHandleClose"
                >
                  <Countdown
                    :time="time"
                    format="hh:mm:ss"
                    @on-end="onCountdownEnd"
                  >
                    <template slot-scope="{ time }">{{ time }}</template>
                  </Countdown>
                </el-dialog>
              </div> -->

              <el-divider></el-divider>

              <!-- 考勤列表 -->
              <div class="show-attendance-released" style="margin-top: 30px">
                <el-row>
                  <el-col
                    :span="24"
                    v-for="(item, index) in attendanceReleasedLists.lists"
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

                                <el-descriptions-item label="考勤状态">
                                  <span>
                                    {{ item.status }}
                                    <el-button
                                      type="text"
                                      @click="
                                        getAttendanceISendButton(index, item)
                                      "
                                    >
                                      刷新
                                    </el-button>
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
                              @click="
                                attendanceSubmitLookInfo(item.attendance_id)
                              "
                            >
                              签到详情
                            </el-button>
                            <!-- Table -->

                            <el-button
                              type="warning"
                              size="small"
                              style="
                                height: 35px;
                                margin-left: 20px;
                                margin-right: 20px;
                              "
                              @click="
                                deleteAttendance(index, item.attendance_id)
                              "
                            >
                              删除
                            </el-button>
                          </div>
                        </div>
                      </div>
                      <!-- 人员签到情况幕布-->
                      <div class="attendance-show-user-sign">
                        <el-dialog
                          width="80%"
                          title="考勤记录"
                          :visible.sync="attendanceSignLists.dialogTableVisible"
                          :before-close="qiandaoXiangqQaingHandle"
                        >
                          总人数：{{ course_user_num }} 签到人数：{{
                            attendanceSignLists.lists.length
                          }}
                          签到率：{{
                            (attendanceSignLists.lists.length * 100) /
                            course_user_num
                          }}%
                          <template>
                            <el-table
                              ref="multipleTable"
                              :data="attendanceSignLists.lists"
                              stripe
                              border
                              style="width: 100%"
                              @selection-change="
                                attendancdHandleSelectionChange
                              "
                            >
                              <el-table-column type="selection" width="55">
                              </el-table-column>
                              <!-- 以下列是可编辑和查看的 -->
                              <el-table-column label="用户名/学号" width="200">
                                <template slot-scope="scope">
                                  <span style="margin-left: 10px">
                                    {{ scope.row.user_name }}/{{
                                      scope.row.user_number
                                    }}
                                  </span>
                                </template>
                              </el-table-column>

                              <el-table-column label="考勤情况" width="200">
                                <!-- <template slot-scope="scope">
                                  <el-input
                                    :disabled="scope.row.editControl"
                                    v-model="scope.row.sign_result"
                                  >
                                    {{ scope.row.sign_result }}
                                  </el-input>
                                </template> -->
                                <!-- 选择 -->
                                <template slot-scope="scope">
                                  <el-select
                                    v-model="scope.row.sign_result"
                                    :disabled="scope.row.editControl"
                                  >
                                    <el-option
                                      v-for="item in attendanceStatusSelectOptions"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"
                                    >
                                    </el-option>
                                  </el-select>
                                </template>
                              </el-table-column>

                              <el-table-column
                                label="操作"
                                width="120"
                                show-overflow-tooltip
                              >
                                <template slot-scope="scope">
                                  <el-button
                                    @click.native.prevent="
                                      editUserSignInfoRow(
                                        scope.$index,
                                        scope.row
                                      )
                                    "
                                    type="primary"
                                    size="small"
                                  >
                                    {{
                                      scope.row.editControl
                                        ? "编辑"
                                        : "确认编辑"
                                    }}
                                  </el-button>
                                </template>
                              </el-table-column>
                              <el-table-column label="签到时间" width="400">
                                <template slot-scope="scope">
                                  <span style="margin-left: 10px">
                                    {{ scope.row.update_time }}
                                  </span>
                                </template>
                              </el-table-column>
                            </el-table>
                            <!-- <div style="margin-top: 20px">
                              <el-button
                                type="primary"
                                @click="toggleSelection(multipleSelection)"
                              >
                                删除选择
                              </el-button>
                            </div> -->
                          </template>
                          <el-divider></el-divider>
                          <h3>未签到的学生</h3>
                          <span>
                            未签到人数：{{
                              notAttendanceSignLists.lists.length
                            }}
                          </span>
                          <template>
                            <el-table
                              ref="multipleTable"
                              :data="notAttendanceSignLists.lists"
                              stripe
                              border
                              style="width: 100%"
                            >
                              <el-table-column type="selection" width="55">
                              </el-table-column>
                              <!-- 以下列是可编辑和查看的 -->
                              <el-table-column label="用户名/学号" width="250">
                                <template slot-scope="scope">
                                  <span style="margin-left: 10px">
                                    {{ scope.row.user_name }}/{{
                                      scope.row.user_number
                                    }}
                                  </span>
                                </template>
                              </el-table-column>

                              <el-table-column label="考勤情况" width="250">
                                <template slot-scope="scope">
                                  <el-select
                                    v-model="scope.row.sign_result"
                                    :disabled="scope.row.edit_button"
                                  >
                                    <el-option
                                      v-for="item in attendanceStatusSelectOptions"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value"
                                    >
                                    </el-option>
                                  </el-select>
                                </template>
                              </el-table-column>

                              <el-table-column
                                label="操作"
                                width="250"
                                show-overflow-tooltip
                              >
                                <template slot-scope="scope">
                                  <el-button
                                    @click.native.prevent="
                                      editUserNotSignInfoRow(
                                        scope.$index,
                                        scope.row
                                      )
                                    "
                                    type="primary"
                                    size="small"
                                  >
                                    {{ scope.row.edit_button_name }}
                                  </el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                            <!-- <div style="margin-top: 20px">
                              <el-button
                                type="primary"
                                @click="toggleSelection(multipleSelection)"
                              >
                                删除选择
                              </el-button>
                            </div> -->
                          </template>
                        </el-dialog>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
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
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <!-- 以下列是可编辑和查看的 -->
                    <el-table-column label="文件名" width="200">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">
                          {{ scope.row.material_name }}
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column label="文件路径" width="425">
                      <template slot-scope="scope">
                        <el-link :href="scope.row.material_path" type="primary">
                          {{ scope.row.material_path }}
                        </el-link>
                      </template>
                    </el-table-column>
                    <el-table-column label="文件简介" width="200">
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

                    <el-table-column
                      fixed="right"
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
                    </el-table-column>
                  </el-table>
                  <div style="margin-top: 20px">
                    <el-button
                      type="primary"
                      @click="materialSelection(materialMultipleSelection)"
                    >
                      批量删除
                    </el-button>
                  </div>
                </template>
              </div>
            </el-tab-pane>
            <el-tab-pane label="成绩管理" name="4">
              <el-card>
                考勤
                <div class="home">
                  <div id="myHomeChart" ref="homeEcharts"></div>
                </div>
              </el-card>
              <el-divider></el-divider>
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
import EChartsView from "@/components/EChartsView.vue";
export default {
  components: {
    AllHeader,
    OssUpload,
    CourseList,
    Countdown,
    NowTime,
    EChartsView,
  },
  name: "TeacherCourse",
  data() {
    //创建方法，用于截止日期的检测
    var testDeadline = (rule, value, callback) => {
      let d = parseInt(new Date(value).getTime() / 1000);
      let d2 = parseInt(new Date().getTime() / 1000);
      if (d < d2) {
        callback("截止日期不能早于当前时间发生，不能为历史日期！");
        // this.$message.error("截止日期不能为历史日期！");
        // console.log("若截止时间比当前时间还早");
      } else {
        callback();
        // console.log("截止日期合理");
      }
    };
    return {
      isUploadBoolean: false,
      course_activeName: "0",
      course_user_num: 0,
      userInCourseInfo: [],

      /******一下是与作业有关的信息***********/
      //作业创建幕布的显示与隐藏
      homeworCreateVisible: false,
      attendanceCreateVisible: false,
      attendanceShowVisible: false,
      materialUploadDialogVisible: false,

      createHomeworkForm: {
        //作业创建需要提交的信息
        type: "1",
        file_path: "",
        file_name: "",
        user_id: 0,
        id: 0,
        //以下为自由内容
        title: "",
        content: "",
        // release_time: "", //目前暂时设置作业的创建时间就是其发布时间，所以表单中暂时不需要获取发布时间信息
        deadline: "",
      },
      //作业展示
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
        lists: [],
      },
      //展示已经提交的信息
      homeworkSubmitLists: {
        editButton: "编辑",
        editInput: true,
        dialogTableVisible: false,
        showValue: {
          valueShow: true,
          value1: false,
        },
        lists: [],
      },

      //发布作业内容限制

      courseRules: {
        title: [
          {
            required: true,
            message: "请输入作业标题",
            trigger: "blur",
          },
        ],
        deadline: [
          {
            required: true,
            validator: testDeadline,
            trigger: "blur",
          },
        ],
        content: [
          {
            required: false,
            message: "输入作业内容",
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

      /********以下是考勤相关的信息**************/
      //倒计时初始时间
      // time: 0,
      createAttendanceForm: {
        deadline: "",
      },
      attendanceRules: {
        deadline: [
          {
            required: true,
            validator: testDeadline,
            trigger: "blur",
          },
        ],
      },
      attendanceTimeOptions: [
        {
          value: "1",
          label: "1",
        },
        {
          value: "2",
          label: "2",
        },
        {
          value: "3",
          label: "3",
        },
        {
          value: "4",
          label: "4",
        },

        {
          value: "5",
          label: "5",
        },
        {
          value: "10",
          label: "10",
        },
        {
          value: "15",
          label: "15",
        },
        {
          value: "20",
          label: "20",
        },
        {
          value: "25",
          label: "25",
        },
        {
          value: "30",
          label: "30",
        },
        {
          value: "0",
          label: "不限",
        },
      ],
      attendanceStatusSelectOptions: [
        {
          value: "出勤",
          label: "出勤",
        },
        {
          value: "迟到",
          label: "迟到",
        },
        {
          value: "请假",
          label: "请假",
        },
        {
          value: "早退",
          label: "早退",
        },
        {
          value: "旷课",
          label: "旷课",
        },
      ],
      //展示已经结束
      attendanceReleasedLists: {
        lists: [],
        labels: {
          countdown: "考勤倒计时",
          is_end: "考勤状态",
          attendance_type: "考勤类型 [0-数字考勤]",
          info: "考勤码",
          // create_tim: "发布时间",
          attendance_time: "考勤时长（分钟）",
        },
      },
      attendanceSignLists: {
        editButton: "编辑",
        editInput: true,
        dialogTableVisible: false,
        isAttendanceEnd: false,
        lists: [],
      },
      notAttendanceSignLists: {
        lists: [],
      },

      /**
       * 可视化展示考勤数据
       */

      //
      data1: [], //出勤
      data2: [
        {
          attendance_id: 56,
          course_id: 3,
          create_time: "2022-10-22 13:17:42",
          rate: 66.6667,
          sign_result: "迟到",
          student_num: 3,
          student_sign_num: 2,
          teacher_id: 25,
          user_sign_id: 7,
        },
      ], //迟到
      option: {
        title: {
          text: "考勤分析",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["出勤率", "迟到率"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          //在这里放考勤发布时间
          data: ["1", "2", "3"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "出勤率",
            type: "line",
            //在这里放出勤率 rate
            data: [1, 2, 3],
            smooth: true,
          },
          {
            name: "迟到率",
            type: "line",
            //在这里放迟到率
            data: [4, 5, 6],
            smooth: true,
          },
        ],
      },
      value: "",
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
    };
  },
  created() {
    //用户信息
    this.isLogin();
    this.ver();
    this.isInCourse();
    this.ver2();
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
      //获取展示na
      //创建课程获取信息：
      this.createHomeworkForm.user_id = this.$store.state.userLogin.user_id;
      this.createHomeworkForm.id = this.$store.state.courseIn.course_id;
      //获取作业的信息
      this.homeworkReleasedLists.user_id = this.$store.state.userLogin.user_id;
      this.homeworkReleasedLists.id = this.$store.state.courseIn.course_id;
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
    getAttendanceISendButton() {
      this.$axios
        .get(`attendance/findAttendanceFkId`, {
          params: {
            user_id: this.$store.state.userLogin.user_id,
            course_id: this.$store.state.courseIn.course_id,
          },
        })
        .then((res) => {
          // console.log(res);
          this.attendanceReleasedLists.lists = res.data;
          //比如想把另外一个数组中编列出来的值加入到这个数组中
          for (var i = 0; i < this.attendanceReleasedLists.lists.length; i++) {
            this.$set(
              this.attendanceReleasedLists.lists[i],
              "status",
              this.getAttendanceISend(
                this.attendanceReleasedLists.lists[i].deadline
              )
            );
          }
          // console.log(res.data);
          console.log(this.attendanceReleasedLists.lists);
        });
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
            course_id: this.$store.state.courseIn.course_id,
          },
        })
        .then((res) => {
          // console.log(res);
          this.materialLists.lists = res.data;
          console.log(this.materialLists.lists);
        });
    },

    // 绘制图表
    dataChart(option) {
      //初始化图表，this.$refs.homeEcharts获取到图表容器
      var myChart = this.$echarts.init(this.$refs.homeEcharts);
      console.log("我就没进");
      console.log("option =  ", option);
      // 把参数配置放到容器里
      myChart.setOption(option);
    },
    // 销毁实例(看项目需要进行销毁实例)
    destroyChart() {
      this.$echarts.init(this.$refs.homeEcharts).dispose();
    },

    /**
     * 获取考勤整体图表数据
     */
    getTotalAttendanceSituation() {
      this.$axios
        .get(`/attendance/findTotalAttendanceSituation`, {
          params: {
            cid: this.$store.state.courseIn.course_id,
            tid: this.$store.state.userLogin.user_id,
            result: "出勤",
          },
        })
        .then((res) => {
          // return res.data;
          this.data1 = res.data;
          this.option.xAxis.data = this.data1?.map((d) => d.create_time);
          this.option.series[0].data = this.data1?.map((d) => d.rate);
          // console.log("获取数据", this.option.xAxis.data);
          this.dataChart(this.option);
          // console.log("data1的值", this.data1);
        });

      this.$axios
        .get(`/attendance/findTotalAttendanceSituation`, {
          params: {
            cid: this.$store.state.courseIn.course_id,
            tid: this.$store.state.userLogin.user_id,
            result: "迟到",
          },
        })
        .then((res) => {
          // return res.data;
          this.data2 = res.data;
          this.option.xAxis.data = this.data2?.map((d) => d.create_time);
          this.option.series[1].data = this.data2?.map((d) => d.rate);
          // console.log("获取数据", this.option.xAxis.data);
          this.dataChart(this.option);
          // console.log("data1的值", this.data1);
        });
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
          .get(`/homework/findAllHomework`, {
            params: {
              user_id: this.$store.state.userLogin.user_id,
              course_id: this.$store.state.courseIn.course_id,
            },
          })
          .then((res) => {
            if (res) {
              // this.$message.success(res.msg);
              this.homeworkReleasedLists.lists = res.data;
            }
          });
        //作业内提交信息的获取
      } else if (tab._props.name === "2") {
        console.log("考勤管理");
        this.getUsersIncourseInfo();
        this.getAttendanceISendButton();
      } else if (tab._props.name === "3") {
        console.log("资料管理");
        //获取所有资料信息
        this.fileShowHandleChange();
      } else if (tab._props.name === "4") {
        console.log("成绩管理");
        //获取考勤数据
        this.getTotalAttendanceSituation();
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
        })
        .then((res) => {
          console.log("用户删除");
        });
    },
    deleteUserInCourseInfoRow(index, userInCourseInfo) {
      //   console.log(index, userInCourseInfo[index]);
      //从后台出发，从后台移除-userCourse表
      this.deleteUserFromCoursee(index, userInCourseInfo[index].user_id);
    },

    //选择框状态切换--将选中的数据随时存储在multipleSelection中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(multipleSelection) {
      //删除数据
      //   console.log(multipleSelection);
      //遍历删除
      multipleSelection.forEach((m, index) => {
        console.log(index + "：" + m.user_id);
        this.deleteUserFromCoursee(index, m.user_id);
      });
    },

    /*------------------作业管理------------------------- */
    /**
     * 直接点击作业，不上传文件
     */
    addHomeworkContent() {
      //上传的内容有title content deadline-以时间戳的形式传递
      this.$confirm("此次作业并没有添加附件, 是否直接发布?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //访问添加
          this.$axios
            .get(`/homework/releaseHomework`, {
              params: {
                user_id: this.$store.state.userLogin.user_id,
                course_id: this.$store.state.courseIn.course_id,
                title: this.createHomeworkForm.title,
                content: this.createHomeworkForm.content,
                deadline: this.createHomeworkForm.deadline,
              },
            })
            .then((res) => {
              this.$message({
                type: "success",
                message: "发布成功!",
              });
              this.homeworCreateVisible = !this.homeworCreateVisible;
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
    //发布作业 - user_id+course_id+作业内容
    //查看某个提交的作业
    homeworksubmitLookInfo(homework_id) {
      //幕布的展示与隐藏
      this.homeworkSubmitLists.dialogTableVisible =
        this.homeworkSubmitLists.dialogTableVisible = true;
      //获取数据
      // console.log(homework_id);
      this.$axios
        .get(`SubmitHomeworkController/findByHomeworkId`, {
          params: {
            homework_id: homework_id,
          },
        })
        .then((res) => {
          if (res.status === 0) {
            this.homeworkSubmitLists.lists = res.data;
          }
        });
    },
    //单独下载学生提交的作业
    downLoadHomeworkSubmit(url) {
      axios
        .get(
          `https://education-online-demo1.oss-cn-guangzhou.aliyuncs.com/edu-online//10.jpg`
        )
        .then(
          (res) => {
            console.log(res);
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //批改作业，编辑内容
    editUserHomeworkSubmitInfoRow(index, row) {
      this.homeworkSubmitLists.editInput = !this.homeworkSubmitLists.editInput;
      if (this.homeworkSubmitLists.editInput === false) {
        this.homeworkSubmitLists.editButton = "确定编辑";
      } else if (this.homeworkSubmitLists.editInput === true) {
        this.homeworkSubmitLists.editButton = "编辑";
        //保存修改后的数据
        this.homeworkSubmitLists.lists[index].comments = row.comments;
        this.homeworkSubmitLists.lists[index].total_grade = row.total_grade;
        console.log(
          "编辑后的：" + JSON.stringify(this.homeworkSubmitLists.lists[index])
        );
        //后台数据库需要修改t_submit_homework
        //参数user_id=fk_user_id,homework_id=fk_homework_id
        //要修改的信息：grade 和 note
        //共4个参数
        this.$axios
          .get(`/SubmitHomeworkController/addTeacherCommentsAndGrade`, {
            params: {
              submit_homework_id: row.submit_homework_id,
              comments: row.comments,
              grade: row.grade,
            },
          })
          .then((res) => {
            // console.log(res);
          });
      }
      //根据index修改信息
    },
    //删除作业
    deleteHomework(index, homework_id) {
      this.$confirm("此操作将永久删除该作业, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //访问后台进行删除
          console.log("//访问后台进行删除");
          this.$axios
            .get(`/homework/deleteHomework`, {
              params: {
                homework_id: homework_id,
              },
            })
            .then((res) => {
              if (res.status === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //根据id删除数据
                this.homeworkReleasedLists.lists.splice(index, 1);
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

    /**----------------考勤管理----------------------- */

    createAttendanceSubmit(deadline) {
      //获得时长
      console.log("考勤截止时间：", deadline);
      let dd =
        parseInt(new Date(deadline).getTime / 1000) -
        parseInt(new Date().getTime);
      //判断时间
      if (dd <= 0) {
        this.$message.error("截止日期不能小于等于当前日期");
      }
      // console.log(res);
      //发布成功后，需要将发布的信息添加到考勤表中，再查询刷新考勤列表
      this.$axios
        .get(`/attendance/addAttendance`, {
          params: {
            deadline: deadline,
            user_id: this.$store.state.userLogin.user_id,
            course_id: this.$store.state.courseIn.course_id,
          },
        })
        .then((res) => {
          console.log("发布考勤");
        });
    },

    attendanceReHandleChange() {
      //关闭之前再进行一次查询
      //展示所有考勤信息
      this.getAttendanceISendButton();
      this.attendanceCreateVisible = this.attendanceCreateVisible = false;
    },

    qiandaoXiangqQaingHandle() {
      this.getUsersIncourseInfo();
      this.getAttendanceISendButton();
      this.attendanceSignLists.dialogTableVisible = false;
    },

    // 一下倒计时相关的先不要了
    // onCountdownEnd() {
    //   // 倒计时结束的逻辑
    //   console.log("考勤结束！");
    //   this.$message.success("考勤结束！");
    //   //可以在这里执行考勤结束的任务
    //   done(); //关闭页面
    //   this.attendanceShowVisible = false;
    //   //访问后台，展示考勤记录 - 查询所有考勤（根据user_id和course_id）
    //   this.$axios.get(``, {
    //     params: {},
    //   });
    // },
    // checkViChange() {
    //   if (!document.hidden) {
    //     this.getServerTime();
    //   }
    // },
    // //获取数据前先默认不加载
    // getDate(attendance_time) {
    //   //访问后台接口获取数据，并计算处理数据
    //   //第一次访问获取时间戳差值
    //   this.$axios
    //     .get(`/attendance/addAttendance`, {
    //       params: {
    //         attendance_time: attendance_time,
    //         user_id: this.$store.state.userLogin.user_id,
    //         course_id: this.$store.state.courseIn.course_id,
    //       },
    //     })
    //     .then((res) => {
    //       // let time = parseInt(new Date().getTime() / 1000);
    //       // console.log(time);
    //       // console.log(res.data.attendance_time, res.size / 1000, time);
    //       // let t =
    //       //   parseInt(new Date().getTime() / 1000) -
    //       //   res.size / 1000 +
    //       //   60 * res.data.attendance_time;
    //       // console.log("时间戳差值：", t);
    //       // console.log(res);
    //       this.attendanceCreateVisible = this.attendanceCreateVisible = false;
    //       this.attendanceShowVisible = this.attendanceShowVisible = true;
    //       this.time =
    //         parseInt(new Date().getTime() / 1000) -
    //         res.size / 1000 +
    //         60 * res.data.attendance_time;
    //       this.hideCountdown = true;
    //       //拿到后进行数据渲染
    //       //将时间存储起来LocalStorage
    //     });
    // },

    // attendanceShowHandleClose() {
    //   this.$message.warning("当前正在考勤，请勿关闭页面！");
    // },

    //考勤删除
    deleteAttendance(index, attendance_id) {
      this.$confirm("此操作将永久删除该考勤信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //访问后台进行删除
          console.log("//访问后台进行删除");
          this.$axios
            .get(`/attendance/deleteAttendance`, {
              params: {
                attendance_id: attendance_id,
              },
            })
            .then((res) => {
              if (res.status === 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //根据id删除数据
                this.attendanceReleasedLists.lists.splice(index, 1);
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

    //签到情况
    attendanceSubmitLookInfo(attendance_id) {
      //获取已经签到的人员信息
      this.$axios
        .get(`/usersign/findUserSignInfo`, {
          params: {
            attendance_id: attendance_id,
          },
        })
        .then((res) => {
          // console.log(res);
          /**
           * 签到的人员列表
           */
          /**
           * 在这里也添加控制信息
           */
          let lists = [];
          lists = this.userInCourseInfo;

          this.attendanceSignLists.lists = res.data;
          for (var i = 0; i < this.attendanceSignLists.lists.length; i++) {
            this.$set(this.attendanceSignLists.lists[i], "editControl", true);
          }
          // console.log("res.data = ", this.attendanceSignLists.lists[0]);
          //课程内所有成员userInCourseInfo
          //课程内所有签到的成员 this.attendanceSignLists.lists
          //两个都有user_id
          //循环遍历

          //根据user_name，取出user_nam也在this.attendanceSignLists.lists中的元素：
          for (var i = 0; i < this.attendanceSignLists.lists.length; i++) {
            for (var j = 0; j < lists.length; j++) {
              if (
                lists[j].user_name ===
                this.attendanceSignLists.lists[i].user_name
              ) {
                lists.splice(j, 1);
              }
            }
          }
          //添加
          for (var i = 0; i < lists.length; i++) {
            //记住是这样填的
            this.$set(lists[i], "sign_result", "");
            this.$set(lists[i], "edit_button", true);
            this.$set(lists[i], "edit_button_name", "选择");
            this.$set(lists[i], "attendance_id", attendance_id);
          }
          console.log(lists);
          this.notAttendanceSignLists.lists = lists;
          this.attendanceSignLists.dialogTableVisible =
            this.attendanceSignLists.dialogTableVisible = true;
        });
    },
    //编辑时的变化
    editUserSignInfoRow(index, row) {
      //这个部分需要修改一下了
      this.attendanceSignLists.lists[index].editControl =
        !this.attendanceSignLists.lists[index].editControl;
      if (this.attendanceSignLists.lists[index].editControl === true) {
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
        let result = row.sign_result;
        console.log(result);
        //修改传入后端
        this.$axios
          .get(`usersign/addUserSign`, {
            params: {
              sign_result: result,
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
    deleteMaterialFromCourse(index, material_id) {
      this.$axios
        .get(`/material/deleteFile`, {
          params: {
            material_id: material_id,
          },
        })
        .then((res) => {
          if (res != null && res.status === 0) {
            // console.log(res);
            this.materialLists.lists.splice(index, 1);
          }
        });
    },
    deteMaterialInCourseInfoRow(index, material_id) {
      console.log("点击单个删除");
      this.deleteMaterialFromCourse(index, material_id);
    },

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
.chart {
  height: 400px;
}
</style>
