import React from 'react'
import logo from "../assets/logo.jpg"
const Header = () => {
  return (
    <div className='bg-white w-full mt-4 mb-2'>
      <div className='flex items-center justify-between w-full'>
        <div className='w-[80px] h-[80px] rounded-full ml-5'>
          <img src={logo} className='w-full h-full  rounded-full ' />
        </div>
        <ul className='flex justify-between items-center gap-10 shadow-2xl px-3 py-2'>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>Home</a></li>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>Features</a></li>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>Pricing</a></li>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>About</a></li>
          <li className=' text-[20px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>Login</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Header
