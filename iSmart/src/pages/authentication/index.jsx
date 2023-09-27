import React, { useState } from 'react'
import './style.css'
import SignIn from './Login'
import SingUp from './SignUp' 
export default function Auth() {
  const [authStat,setAuthState]=useState(false)
  const StyleL={
    backgroundColor:'#c6f6d5' 
  }


  return (
    <div className='Auth'>
    <div className='AuthCont'>
       {/* header of signIn compenent */}
        <div className='AuthHeader'>
             WELCOM TO ISMART
        </div>
       {/* the body of signIn compenent */}
        <div className='AuthBody'>
              <div className='loginBtn' style={StyleL} onClick={()=>setAuthState(false)}>
                  <button>Login</button>
              </div>
            
              <div>
                
                 <SignIn/>
                
              
              </div> 
        </div>
    </div>
    </div>
  )
}
