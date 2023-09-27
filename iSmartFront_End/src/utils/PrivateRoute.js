import React, { useContext, useEffect } from 'react'
import SignIn from '../pages/authentication/Login'
import Auth from '../pages/authentication'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/authContext'
export default function  () {
    const token=localStorage.getItem('token') 
    const { user,isLogedIn, setUser }=useContext(AuthContext)

    useEffect(()=>{
         setUser(user) 
    },[user])
    //const user=JSON.parse(localStorage.getItem('user')) 
    console.log('user from context  is : ',user)
    if(token){
        
          if(user.role==='admin') return <Navigate to ={`/groups/${user.groupId}`}/> 
       return <Outlet />
    }
     return <Navigate to='/auth'/>   
         
}
