//axios的封装
import axios from "axios";
import { Message } from "element-ui";
import router from "../router";
//创建一个axios实例,设置默认值
const instance = axios.create({
  baseURL: "/edu",
});

//定义拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data.status === 1) {
      Message.error({
        message: response.data.msg,
      });
      return;
    }
    return response.data;
  },
  (error) => {
    if (error.response.status === 504 || error.response.status === 404) {
      Message.error({ message: "没有找到服务，请确认请求地址是否正确" });
    } else if (error.response.status === 403) {
      Message.error({ message: "权限不足" });
    } else if (error.response.status === 401) {
      Message.error({ message: "尚未登录，请登录" });
      router.replace("/");
    } else {
      Message.error({ message: "未知错误" });
    }
  }
);
export default instance;
