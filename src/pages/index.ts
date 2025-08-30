import { lazy } from "react";
const Login = lazy(() => import("./auth/Login"));
import LoginHome from "./auth/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";
import Groups from "./dashboard/Groups";
import Stacks from "./dashboard/Stacks";
import Teachers from "./dashboard/Teachers";
import Students from "./dashboard/Students";

export { LoginHome, Login, DashboardHome, Groups, Stacks, Teachers, Students };
