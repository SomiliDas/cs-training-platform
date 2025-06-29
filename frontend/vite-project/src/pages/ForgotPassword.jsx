import React from 'react'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ForgotPassword() {

    let[name, setName] = useState("")
    let[email, setEmail] = useState("")
    let[newPass, setNewPass] = useState("")
    let[rePass, setRePass] = useState("")
    let[dob, setDob] = useState("")
    let navigate = useNavigate()


    const PassHandler = async (e)=>{
        e.preventDefault()
        try{
            if(newPass !== rePass){
                alert("Passwords don't match")
                return
            }
            let res = await fetch("http://localhost:8000/api/users/forgotPass",{
                method:"PUT",
                headers:{
                    "Content-Type" :"application/json"
                },
                body : JSON.stringify({name, email, dob, newPass}),
                credentials:"include"
            })
            if(!res.ok){
                toast.error("something went wrong")
            }
            else{
                toast.success("Password Changed Successfully")
                navigate("/auth")
            }
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='mt-20 px-20 flex justify-center items-center w-full'>
        <div className='mt-2 py-10 px-10 shadow-2xl w-[50%]'>
        <form onSubmit={PassHandler}>
            <div className='mb-5' >
                <label className='text-blue-950 font-medium block text-left'> Verify Name</label>
                <input type='text' name='name' value={name} required placeholder='Enter Name' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setName(e.target.value))}/>
            </div>
            <div className='mb-5' >
                <label className='text-blue-950 font-medium block text-left'>Verify Date of Birth (DD/MM/YYYY)</label>
                <input type='text' name='dob' value={dob} required placeholder='Enter Date of Birth' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setDob(e.target.value))}/>
            </div>
            <div className='mb-5' >
                <label className='text-blue-950 font-medium block text-left'>Verify Email</label>
                <input type='text' name='email' value={email} required placeholder='Enter Email' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setEmail(e.target.value))}/>
            </div>
            <div className='mb-5'>
                <label className='text-blue-950 font-medium block text-left'>New Password</label>
                <input type='password' name='newPass' value={newPass} required placeholder='Enter Password' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setNewPass(e.target.value))}/>
            </div>
            <div className='mb-5'>
                <label className='text-blue-950 font-medium block text-left'>Re-Enter Password</label>
                <input type='password' name='rePass' value={rePass} required placeholder='Enter Password' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setRePass(e.target.value))}/>
            </div>
            <input type='submit' value={"Change Password"} className='w-full bg-blue-600 text-white p-2 rounded-lg cursor-pointer font-bold text-[20px] mb-5 hover:underline'/>
        
        </form>
        </div>
    </div>
  )
}
