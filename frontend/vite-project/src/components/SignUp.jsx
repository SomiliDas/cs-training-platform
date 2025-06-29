import React from "react"
import { useState } from "react"
import { toast } from "react-toastify"



function SignUp() {

  let[name, setName] = useState("")
  let[email, setEmail] = useState("")
  let[password, setPassword] = useState("")
  let[dob, setDob] = useState("")

  let handleSignUp = async(e)=>{
    e.preventDefault()
    try{

      const res = await fetch("https://flight-training-platform-backend-cors.onrender.com/users/register", {
        method : "POST",
        headers : {
           'Content-Type': 'application/json'
        },
        body : JSON.stringify({name, email, password, dob}),
        credentials : "include",
        redirect : "follow"
      })
      const data = await res.json()
      if(res.ok && data.userId){
        toast.success("account created")
        window.location.href = `/users/profile/${data.userId}`
      }
      else{
        toast.error("something went wrong")
      }

    } catch (err){
      console.log(err)
    }
  }

  return (
    <div className='mt-2 py-4 px-6'>
      <form onSubmit={handleSignUp}>
        <div className='mb-5' >
            <label className='text-blue-950 font-medium block text-left'>Name</label>
            <input type='text' name='name' value={name} required placeholder='Enter Name' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setName(e.target.value))}/>
        </div>
        <div className='mb-5' >
            <label className='text-blue-950 font-medium block text-left'>Date of Birth (DD/MM/YYYY)</label>
            <input type='text' name='dob' value={dob} required placeholder='Enter Date of Birth' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setDob(e.target.value))}/>
        </div>
        <div className='mb-5' >
            <label className='text-blue-950 font-medium block text-left'>Email</label>
            <input type='text' name='email' value={email} required placeholder='Enter Email' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setEmail(e.target.value))}/>
        </div>
        <div className='mb-5'>
            <label className='text-blue-950 font-medium block text-left'>Password</label>
            <input type='password' name='password' value={password} required placeholder='Enter Password' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setPassword(e.target.value))}/>
        </div>
        <input type='submit' value={"Sign Up"} className='w-full bg-blue-600 text-white p-2 rounded-lg cursor-pointer font-bold text-[20px] mb-5 hover:underline'/>
    
      </form>
    </div>
  )
}

export default SignUp
