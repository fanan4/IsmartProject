import React, { useContext } from "react";

import { Outlet } from "react-router";

import UserContext from "../context/userContext";
import Home from "../pages/home/home";

const HomeRedirect = () => {
  const { isAuth } = useContext(UserContext);

  return isAuth ? <Home /> : <Outlet />;
};

export default HomeRedirect;
