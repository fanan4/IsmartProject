import React, { useState } from 'react'
import './style.css'
export default function SingUp() {
   const [email,SetEmail]=useState('')
   const [password,SetPassword]=useState('')
   const [userName,SetUserName]=useState('')
   const [confirmPass,setConfirmPass]=useState('')
  return (
    <div className='signUpCont'>
    <p>Name</p>
    <div className='NameInpt'>
        <input type='name' placeholder='enter your Name' value={userName} onChange={(e)=>SetUserName(e.target.value)}/>
     </div>

     <p>Email Address</p>
     <div className='EmailInpt'>
        <input type='email' placeholder='enter your email' value={email} onChange={(e)=>SetEmail(e.target.value)}/>
     </div>
     
     <p>Password</p>
     <div className='PasswordInpt'>
        <input type='password' placeholder='enter your password' value={password} onChange={(e)=>SetPassword(e.target.value)}/>
     </div>

     <p>Confirm Password</p>
     <div className='ConfPasswordInpt'>
        <input type='password' placeholder='confirm your password' value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}/>
     </div>
     <div className='PicProfile'>
         <input type='file'  />
     </div>
     <button className='SubSignUp'>Sign Up</button>
    </div>
  )
}
