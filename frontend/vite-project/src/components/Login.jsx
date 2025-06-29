import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  
  let[email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
       const response = await fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      // redirect: 'follow' 
    });

    const data = await response.json();
    if (response.ok && data.userId) {
      if(data.role == "admin"){
      //  window.location.href = `/admin`
      navigate(`/admin`)
      }
      else{
        toast.success("login successful")
        //  window.location.href = `/users/profile/${data.userId}`
        navigate(`/users/profile/${data.userId}`)
      }
    } else {
      
      toast.error("something went wrong")
    }
    } catch (error) {
      console.error("Login error:", error)
    }
  }





  return (
    <div className='mt-5 py-4 px-6'>
      <form onSubmit={handleSubmit}>
        <div className='mb-10' >
            <label className='text-blue-950 font-medium block text-left'>Email</label>
            <input type='text' name='email' value={email} required placeholder='Enter Email' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setEmail(e.target.value))} />
        </div>
        <div className='mb-10'>
            <label className='text-blue-950 font-medium block text-left'>Password</label>
            <input type='password' name='password' value={password} required placeholder='Enter Password' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setPassword(e.target.value))}/>
        </div>
        <input type='submit' value={"Log In"} className='w-full bg-blue-600 text-white p-2 rounded-lg cursor-pointer font-bold text-[20px] mb-5 hover:underline'/>
        <Link to = "/forgotpassword"><div className='text-center'>
          <button className='text-blue-950 font-bold hover:underline cursor-pointer'>Forgot Password</button>
        </div></Link>
      </form>
    </div>
  )
}

export default Login
