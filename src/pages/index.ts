import { lazy } from "react";
const Login = lazy(() => import("./auth/Login"));
import LoginHome from "./auth/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";
import Groups from "./dashboard/Groups";
import Teachers from "./dashboard/Teachers";
import Students from "./dashboard/Students";

import Stacks from "./dashboard/Stacks";
import StacksCreate from "./dashboard/StacksCreate";

export {
  LoginHome,
  Login,
  DashboardHome,
  Groups,
  Stacks,
  Teachers,
  Students,
  StacksCreate,
};
