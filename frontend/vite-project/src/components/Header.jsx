import React from 'react'
import logo from "../assets/logo.jpg"
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='bg-white w-full mt-4 mb-2 pl-10 pr-20'>
      <div className='flex items-center justify-between w-full'>
        <div className='w-[80px] h-[80px] rounded-full ml-5'>
          <img src={logo} className='w-full h-full  rounded-full ' />
        </div>
        <ul className='flex justify-between items-center gap-20 shadow-2xl px-3 py-2'>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><Link to="/">Home</Link></li>
           <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><Link to='/programs'>Programs</Link></li>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><Link to='/auth'>Login</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Header
