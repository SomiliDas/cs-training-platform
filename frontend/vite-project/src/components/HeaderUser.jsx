import React from 'react'
import logo from "../assets/logo.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
const HeaderUser = () => {

  let navigate = useNavigate()

  let[id, setId] = useState()

  useEffect(()=>{
    const fetchId = async()=>{
      try{
        const res = await fetch("https://flight-training-platform-backend-cors.onrender.com/users/getId", {
          method : "GET",
          headers : {
            "Content-Type" : "application/json"
          },
          redirect : "follow",
          credentials : "include"
        })
        if(!res.ok){
          toast.error("something went wrong")
        }
        else{
          const data = await res.json()
          setId(data.userId)
        }
      }catch(err){
        console.log(err)
      }
    }
    fetchId()
  }, [])

  const logoutHandler = async()=>{
    try{
      const res = await fetch("https://flight-training-platform-backend.onrender.com/users/logout", {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        },
        credentials : "include",
        redirect : "follow"
      })
      if(!res.ok){
        toast.error("something went wrong")
      }
      else{
        toast.success("Logout succesful")
        navigate("/")
      }
    }catch(err){
      console.log(err)
    }
  }


  const HomeHandler = ()=>{
    logoutHandler()
    navigate("/")
  }

  return (
    <div className='bg-white w-full mt-4 mb-2 pl-10 pr-20'>
      <div className='flex items-center justify-between w-full'>
        <div className='w-[80px] h-[80px] rounded-full ml-5'>
          <img src={logo} className='w-full h-full  rounded-full ' />
        </div>
        <ul className='flex justify-between items-center gap-10 shadow-2xl px-3 py-2'>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline' onClick={HomeHandler}>Home</li>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><Link to = {`/users/profile/${id}`}>Profile</Link></li>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><Link to='/users/programs'>Programs</Link></li>
          <li ><button className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline' onClick={logoutHandler}>Logout</button></li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderUser
