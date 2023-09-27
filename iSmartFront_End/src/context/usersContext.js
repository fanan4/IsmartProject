import React, { createContext, useState, useEffect, useContext } from "react";

import http from "../utils/axiosConfig";
// import GlobalContext from "./globalContext";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await http.get("api/users", {
        // headers: {
        //   authorization: `Bearer ${localStorage.getItem("jwt")}`,
        // },
      });
      setUsers(res.data.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const addManyUsers=async(users)=>{
    console.log('hello to add many users: ',users)
    setIsLoading(true) 
       try {
        const res=await http.post('api/users/addMany',users)          
        if(res.status===201){
          fetchUsers() 
        }
       } catch (error) {
        console.log(error)
       }  
       setIsLoading(true)            
  }

  const addUser = async (user) => {
    setIsLoading(true);
    try {
      const res = await http.post("/api/users/", user);
      console.log(res.data);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getUserById = async (id, setUser) => {
    setIsLoading(true);
    try {
      const res = await http.get(`/api/users/${id}`);
      setUser(res.data.data.user);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const updateUser = async (id, user, setUser) => {
    setIsLoading(true);
    console.log("updating...");
    try {
      const res = await http.patch(`/api/users/${id}`, user);
      setUser(res.data.data.user);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const deleteUser = async (id) => {
    console.log('hello lets delete the user with id ',id)  
    setIsLoading(true);
    try {
      await http.delete(`/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getUserByRole=(role)=>{
     return users.filter(u=>u.role===role)
  }

  return (
    <UsersContext.Provider
      value={{ users, setUsers,fetchUsers, getUserById, addUser, updateUser, deleteUser, getUserByRole, addManyUsers }}   
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
