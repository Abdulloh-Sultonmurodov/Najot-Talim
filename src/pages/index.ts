import { lazy } from "react";
import LoginHome from "./auth/LoginHome";
import DashboardHome from "./dashboard/DashboardHome";
import Groups from "./dashboard/Groups";

const Login = lazy(() => import("./auth/Login"));

export { LoginHome, Login, DashboardHome, Groups };
