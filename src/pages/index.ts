import { lazy } from "react";

const Login = lazy(() => import("./auth/Login"));
import LoginHome from "./auth/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";

import Students from "./dashboard/students/Students";
import StudentCreate from "./dashboard/students/StudentCreate";
import StudentMore from "./dashboard/students/StudentMore";

import Teachers from "./dashboard/teachers/Teachers";
import TeacherCreate from "./dashboard/teachers/TeacherCreate";
import TeacherMore from "./dashboard/teachers/TeacherMore";

import Groups from "./dashboard/groups/Groups";
import GroupCreate from "./dashboard/groups/GroupCreate";

import Stacks from "./dashboard/stacks/Stacks";
import StacksCreate from "./dashboard/stacks/StacksCreate";
import StacksMore from "./dashboard/stacks/StacksMore";

export {
  LoginHome,
  Login,
  DashboardHome,
  Groups,
  Stacks,
  Teachers,
  Students,
  StacksCreate,
  StacksMore,
  GroupCreate,
  TeacherCreate,
  StudentCreate,
  StudentMore,
  TeacherMore,
};
