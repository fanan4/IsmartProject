import React, { useContext } from "react";

import { Outlet } from "react-router";

import UserContext from "../context/userContext";
import SignIn from "../pages/sign_in_page/sign_in";
import Spinner from "../components/Spinner/Spinner";
import Auth from "../pages/authentication";

const ProtectedRoutes = () => {
  // const { isAuth, initLoading } = useContext(UserContext);
  const token=localStorage.getItem('token')

  return token ? <Outlet /> : <Auth /> /*: <Spinner init />*/; 
};

export default ProtectedRoutes;
