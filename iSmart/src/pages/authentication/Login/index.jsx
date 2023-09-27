import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import AuthContext from '../../../context/authContext'
import { PulseLoader } from 'react-spinners' 
import colors from '../../../utils/colors'  
import { Navigate, useNavigate } from 'react-router-dom'
export default function SignIn() {
  const [email,SetEmail]=useState('')
  const [password,SetPassword]=useState('')
  const {login,isLoading, isAuthenticated,user}=useContext(AuthContext)
  const [empty,setEmpty]=useState(false)
  const navigate=useNavigate()
  const submit=(e)=>{
      if(email=='' || password==''){
        setEmpty(true)
      }else{
         setEmpty(false)

         login({
          email, 
          password
        })
      }
    
  }
  console.log('is authanticated :',isAuthenticated)
  
  if(isAuthenticated){ 
    console.log('is authanticated is true ')
       //const user=JSON.parse(localStorage.getItem('user')) 
       if(user.role==="Superadmin"){
          return <Navigate to={'/'}/> 
       }else if( user.role==="admin"){
        return <Navigate to={`/groups/${user.groupId}`}/>   
       }
        
     }   
  return (
    <div className='signInCont'>
        {/* first input filed */}
    <p>email <span style={{color:'red'}}>*</span></p>
     <div className='emailInpt'>
        <input type='text'placeholder='enter your email'value={email} onChange={(e)=>SetEmail(e.target.value)}/>
     </div>
     {/* the second input filed */}
     <p>password <span style={{color:'red'}} >*</span></p>
     <div className='PasswordInpt'>
        <input type='password' placeholder='enter your password' value={password} onChange={(e)=>SetPassword(e.target.value)}/>
     </div>
       { empty? <div style={{ color:'red',fontSize:'12px',marginTop:'10px',marginLeft:'20%' }}>Please fill out all the required fields.</div>:'' }  
     {
      !isLoading?<button className='submit' onClick={(e)=>submit(e)}> Login</button>:
                 <PulseLoader
                     color={colors.mainColor}
                     loading={true}
                     size={12}
                     aria-label="Loading Spinner" 
                     data-testid="loader" 
                  />  
     }
     
     <button className='getCrendial'>Foreget Password</button>
    </div>
  )
}
