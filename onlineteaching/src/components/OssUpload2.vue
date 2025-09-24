<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :before-upload="ossPolicy"
    :action="objData.host"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
    >
      上传到服务器
    </el-button>

    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
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
  methods: {
    /**
     * 上传数据前的准备
     */
    ossPolicy(file) {
      console.log("上传前的数据准备：" + JSON.stringify(file)); //获取文件uids
      let _self = this;
      //在上传前进行服务器前进行服务器签名
      //返回一个Promise
      return new Promise((resolve, reject) => {
        //请求后端，获取参数
        axios.get("http://localhost:8089/oss/policy").then(
          (response) => {
            _self.objData.ossAccessKeyId = response.data.accessId;
            _self.objData.policy = response.data.policy;
            _self.objData.Signature = response.data.signature;
            _self.objData.dir = response.data.dir;
            _self.objData.host = response.data.host; //直传OSS的服务器地址
            _self.objData.key = response.data.dir + "${filename}"; //文件的名称，使用了占位符filename
            resolve(true); //resolve方法返回true，表示后续继续上传
          },
          (error) => {
            console.log(error.message);
            reject(false); //停止上传
          }
        );
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  },
};
</script>
