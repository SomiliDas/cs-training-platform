import React from 'react'
import logo from "../assets/logo.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const HeaderAdmin = () => {

  let navigate = useNavigate()


  const logoutHandler = async()=>{
    try{
      const res = await fetch("http://localhost:8000/api/users/logout", {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        },
        credentials : "include",
        redirect : "follow"
      })
      if(!res.ok){
        toast.error("Logout Failed")
      }
      else{
        toast.success("LogOut Successful")
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
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><Link to = {`/admin`}>Admin DashBoard</Link></li>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><Link to='/users/programs'>Programs</Link></li>
          <li ><button className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline' onClick={logoutHandler}>Logout</button></li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderAdmin
