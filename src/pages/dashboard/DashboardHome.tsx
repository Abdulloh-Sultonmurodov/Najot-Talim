import { useEffect } from "react";
import { PATH } from "../../components";

const DashboardHome = () => {
  useEffect(() => {
    location.pathname = PATH.stacks;
  }, []);

  return "";
};

export default DashboardHome;
