import React, { createContext, useState, useEffect } from "react";

import http from "../utils/axiosConfig";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  const fetchUser = async () => {
    setInitLoading(true);
    try {
      const res = await http.get("api/users/me", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      setUser(res.data.user);
      setIsAuth(true);
    } catch (err) {
      console.log(err);
      setIsAuth(false);
    }
    setInitLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const signin = async (data) => {
    setIsLoading(true);
    try {
      const res = await http.post("api/auth/signin", data);
      localStorage.setItem("jwt", res.data.token);
      setIsAuth(true);
      console.log(res.data.token);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const signup = async (data) => {
    setIsLoading(true);
    try {
      const res = await http.post("api/auth/signup", data);
      localStorage.setItem("jwt", res.data.token);
      setIsAuth(true);
      console.log(res.data.token);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuth,
        isLoading,
        initLoading,
        setIsAuth,
        signin,
        signup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
