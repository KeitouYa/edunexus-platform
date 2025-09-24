<template>
  <div>
    <el-button type="primary" @click="paramBoday(createHomeworkForm)"
      >传递对象参数</el-button
    >
    <!-- <oss-upload
      ref="upload"
      :user_id="fileInfo.user_id"
      :course_id="fileInfo.course_id"
      :param="createHomeworkForm"
    >
    </oss-upload> -->
    <hr />
    <!-- <oss-upload-2></oss-upload-2> -->
    <hr />
    <count-time></count-time>
    <hr />
    <now-time></now-time>
  </div>
</template>

<script>
import OssUpload2 from "@/components/OssUpload2.vue";
import OssUpload from "./OssUpload.vue";
import NowTime from "@/components/NowTime.vue";
export default {
  name: "FileView",
  components: { OssUpload, OssUpload2, NowTime },
  data() {
    return {
      currentTime: 0,
      startTime: 0,
      endTime: 0,
      fileInfo: {
        user_id: 25,
        course_id: 3,
      },
      createHomeworkForm: {
        type: "1",
        file_path: "path",
        file_name: "name", //以上是公共部分
        title: "作业1",
        content: "作业1作业1作业1",
        deadline: "2020",
      },
      liConHeight: 0, // 折叠面板内容初始高度
      proLists: [
        {
          name: "测试1",
        },
        {
          name: "测试2",
        },
      ],
    };
  },
  computed: {},

  methods: {
    countDownS_cb: function (x) {
      console.log(x);
    },
    countDownE_cb: function (x) {
      console.log(x);
    },
    paramBoday(param) {
      this.$axios({
        method: "post",
        url: "/oss/uploadFile",
        data: param,
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
