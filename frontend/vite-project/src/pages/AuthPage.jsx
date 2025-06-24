import React, { useState } from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

const AuthPage = () => {
    let [status, setStatus] = useState("login")
  return (
    <div className='bg-white px-10 flex justify-center items-center h-screen'>

        <div className='bg-white shadow-2xl shadow-gray-500 w-[45%] h-[75%] p-5'>
            <p className='text-[30px] font-bold text-blue-950 mt-5 mb-2'>Flight Training Platform</p>
            <p className='text-[20px] font-medium text-blue-950 '> 
                {
                    status === 'login' ? "Log in your account" : "Create an account"
                }
            </p>
            <div className='flex items-center gap-10 justify-center mt-5 border-b-1 border-gray-300 mb-2'>
                <button className={`text-[20px] font-bold text-blue-950 cursor-pointer pb-2 ${status == 'login' ? "border-b-2 border-blue-950" : null} `} onClick={()=>{setStatus("login")}}>Login</button>
                <button className={`text-[20px] font-bold text-blue-950 cursor-pointer pb-2 ${status == 'signup' ? "border-b-2 border-blue-950" : null} `} onClick={()=>{setStatus("signup")}}>Sign Up</button>
            </div>
            {
                status === 'login' ? <Login/> : <SignUp/>
            }
        </div>
      
    </div>
  )
}

export default AuthPage
