<template>
  <div class="unit">
    <all-header></all-header>
    <br />
    <br />
    <Carousel> </Carousel>
    <br />
    <br />
    <tabs-hor></tabs-hor>

    <br />
    <br />
    <time-select></time-select>
    <br />
    <br />
    <el-divider></el-divider>
    <course-list></course-list>

    <br />
    <br />
    <CreateForm></CreateForm>
    <button class="cli" @click="createCourse">创建课程</button>
    <div class="so" v-if="isCourseCreate">你好</div>
    <oss-upload></oss-upload>

    <e-charts-view></e-charts-view>
    <OssUpload2 :param="createHomeworkForm"></OssUpload2>
  </div>
</template>
<script>
import AllHeader from "@/components/AllHeader.vue";
import TabsHor from "@/components/TabsHor.vue";
import CourseList from "@/components/CourseList";
import Carousel from "@/components/Carousel";
import TimeSelect from "@/components/TimeSelect";
import CreateForm from "@/components/CreateForm";
import OssUpload from "@/components/OssUpload.vue";
import EChartsView from "@/components/EChartsView.vue";
import OssUpload2 from "@/components/OssUpload2";
export default {
  components: {
    AllHeader,
    TabsHor,
    CourseList,
    Carousel,
    TimeSelect,
    CreateForm,
    OssUpload2,
    OssUpload,
    EChartsView,
  },
  name: "UnitTest",
  data() {
    return {
      isCourseCreate: false,
      createHomeworkForm: {
        //作业创建需要提交的信息
        type: "1",
        file_path: "",
        file_name: "",
        user_id: 0,
        id: 0,
        //以下为自由内容
        title: "标题",
        content: "1111",
        // release_time: "", //目前暂时设置作业的创建时间就是其发布时间，所以表单中暂时不需要获取发布时间信息
        deadline: "",
      },
    };
  },
  methods: {
    createCourse() {
      this.isCourseCreate = !this.isCourseCreate;
    },
  },
};
</script>

<style scoped></style>
