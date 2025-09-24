import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView";
import RegisterView from "@/views/RegisterView";
import ForgetPassword from "@/views/ForgetPassword";

import TeacherView from "@/views/TeacherView";
import StudentView from "@/views/StudentView";
import AdminView from "@/views/AdminView";

import UnitTest from "@/views/UnitTest";
import MyInfo from "@/views/MyInfo";

import TeacherCourse from "@/views/TeacherCourse";
import StudentCourse from "@/views/StudentCourse";

import AddUser from "@/views/AddUser";

import TestView from "@/views/TestView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginView",
    component: LoginView, //观察到上下两种不同的引入
    meta: { title: "登录" },
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
    meta: { title: "注册" },
  },
  {
    path: "/forgetPassword",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: { title: "忘记密码" },
  },
  {
    path: "/teacherView",
    name: "TeacherView",
    component: TeacherView,
    meta: { title: "GDUT教学" },
  },
  {
    path: "/studentView",
    name: "StudentView",
    component: StudentView,
    meta: { title: "GDUT学习" },
  },
  {
    path: "/adminView",
    name: "AdminView",
    component: AdminView,
    meta: { title: "管理" },
  },
  {
    path: "/unit",
    name: "UnitTest",
    component: UnitTest,
    meta: { title: "组件测试" },
  },
  {
    path: "/me",
    name: "MyInfo",
    component: MyInfo,
    meta: { title: "我的" },
  },
  {
    path: "/teacherCourse",
    name: "TeacherCourse",
    component: TeacherCourse,
    meta: { title: "教师课程" },
  },
  {
    path: "/studentCourse",
    name: "StudentCourse",
    component: StudentCourse,
    meta: { title: "学生课程" },
  },

  {
    path: "/addUser",
    name: "AddUser",
    component: AddUser,
    meta: { title: "添加新用户" },
  },
  {
    path: "/testView",
    name: "TestView",
    component: TestView,
    meta: { title: "test" },
  },
];

const router = new VueRouter({
  routes,
});

//全局后置路由守卫，每次路由被切换之后调用，没有Next
router.afterEach((to, from) => {
  //设置网页title
  document.title = to.meta.title;
});

export default router;
