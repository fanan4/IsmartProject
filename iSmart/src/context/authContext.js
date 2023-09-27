import React, { createContext, useContext, useState } from 'react'
import http from "../utils/axiosConfig";

const AuthContext=createContext()
export const  AuthProvider=({children}) =>{
      const [user,setUser]=useState({}) 
      const [token,setToken]=useState('')
      const [isAuthenticated ,setIsAuthanticated]=useState(false) 
      const [isLoading, setIsLoading] = useState(false);
      const login=async(userInfo)=>{
        setIsLoading(true);
        try {
           const res =await http.post('api/auth/signin',userInfo)  
           if(res.status==200){
             const { token,user } =res.data
              localStorage.setItem('token',token)
              localStorage.setItem('user',JSON.stringify(user))   
              setToken(token)
              setUser(user) 
              setIsAuthanticated(true) 
           } 

        } catch (error) {
            console.log(error) 
        }
        setIsLoading(false)
        
      }
      const logout=async()=>{
            localStorage.clear()
            setToken('')
            setUser({})  
            setIsAuthanticated(false)  
      }

     const isLogedIn=async()=>{
          const token=localStorage.getItem('token')
          const User=JSON.parse(localStorage.getItem('user')) 
              
          if(token ){
            console.log('before calling the apiiiiii ')
            const res=await http.get(`api/users/${User._id}`)    
            console.log('after callinggggapi ')
            if(res.status==200){
              console.log('the status code is OK ', res.status) 
              setUser(res.data.data.user)
              setIsAuthanticated(true) 
              setToken(token) 
            }
            
          }
     }


  return (
    <AuthContext.Provider
      value={{
         user,
         token,
         login,
         logout,
         isLogedIn,
         isAuthenticated,
         isLoading,
         setUser
       }
      }
    >
         { children }
    </AuthContext.Provider> 
  )
}

export default AuthContext
