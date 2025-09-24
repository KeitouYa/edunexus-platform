<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      accept=".pdf, .doc, .docx,.png,.jpg,.zip"
      :action="objData.host"
      :data="objData"
      :before-upload="ossPolicy"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button size="small" type="text">点击上传</el-button>

      <div slot="tip" class="el-upload__tip">
        上传.pdf, .doc, .docx,.png,.jpg文件，且不超过2Mb
      </div>
    </el-upload>
    <el-button
      style="margin-left: 10px; width: 250px"
      size="small"
      type="success"
      @click="submitUpload"
    >
      确定
    </el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "OssUpload",
  data() {
    return {
      fileList: [{}],
      //上传到OSS所需要使用的参数
      objData: {
        ossAccessKeyId: "",
        policy: "",
        Signature: "",
        key: "", //上传的Object的名称
        host: "",
        dir: "",
      },
    };
  },
  props: {
    param: Object,
  },

  methods: {
    /**
     * 上传数据前的准备
     */
    ossPolicy(file) {
      /**
      文件类型和大小判断：
       */
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["pdf", "doc", "docx", "png", "jpg", "zip"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件只能是pdf,doc,docx,png,jpg,zip");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB", "error");
        return false;
      }
      console.log("上传前的数据准备：" + file.name); //获取文件uids
      let _self = this;
      //在上传前进行服务器前进行服务器签名
      //返回一个Promise
      return new Promise((resolve, reject) => {
        //请求后端，获取参数
        axios.get(`http://localhost:8089/oss/policy`).then(
          (response) => {
            console.log("查看返回的数据", response.data);
            _self.objData.ossAccessKeyId = response.data.accessId;
            _self.objData.policy = response.data.policy;
            _self.objData.Signature = response.data.signature;
            _self.objData.dir = response.data.dir;
            _self.objData.host = response.data.host; //直传OSS的服务器地址
            _self.objData.key = response.data.dir + `${file.name}`; //文件的名称，使用了占位符filename
            //获取的文件路径
            // let file_path = this.objData.host + "/" + this.objData.key;
            // console.log("文件路径", file_path);
            _self.handleSuccess(response, file, this.fileList);
            resolve(true); //resolve方法返回true，表示后续继续上传
          },
          (error) => {
            console.log("出错信息", error.message);
            reject(false); //停止上传
          }
        );
      });
    },

    submitUpload(value) {
      console.log("我懂了吗");
      //判断是否有文件上传
      console.log("上传的文件长度", this.fileList.length);
      this.$refs.upload.submit();
    },

    handleSuccess(response, file, fileList) {
      console.log("上传成功");
      // alert("上传成功！");
      console.log("上传成功", file.name);
      // console.log(JSON.stringify(file));
      // //文件路径
      let file_path = this.objData.host + "/" + this.objData.key;
      console.log("文件路径", file_path);
      this.param.file_path = file_path;
      this.param.file_name = file.name;
      console.log("param = ", this.param);
      // 上传成功后的操作
      // 创建作业，上传——后续直接通过后台进行判断操作
      // 上传成功后
      this.$axios({
        method: "post",
        url: `/oss/uploadFile`,
        data: this.param,
      }).then((res) => {
        console.log(res);
        // if (res.status === 0) {
        //   this.$message.success(res.msg);
        //   // console.log(res);
        //   console.log(this.param);
        //   // 测试用;
        // }
      });
    },
    handleRemove(file, fileList) {
      console.log("handleRemove", file, fileList);
    },
    handlePreview(file) {
      console.log("处理之前");
      console.log("handlePreview", file);
    },
  },
};
</script>

<style scoped></style>
