import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/authContext";

const token=localStorage.getItem('token')
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json",
             Authorization:{'token':`Bearer ${token}`} },    
  
});


axiosInstance.interceptors.request.use((req)=>{
  const token=localStorage.getItem('token') 
  if( token ) {
    console.log('auth.token',token)
    req.headers.Authorization=`Bearer ${token}` 
  }
   return req
})

export default axiosInstance;      
