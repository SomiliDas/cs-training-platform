import React from 'react'

const Header = () => {
  return (
    <div className='bg-white mb-10 '>
      <ul className='flex justify-between items-center'>
        <li className=' text-[25px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>Home</a></li>
        <li className=' text-[25px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>Features</a></li>
        <li className=' text-[25px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>Pricing</a></li>
        <li className=' text-[25px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>About</a></li>
        <li className=' text-[25px] font-bold text-blue-950 cursor-pointer hover:underline'><a href='#'>Login</a></li>
      </ul>
    </div>
  )
}

export default Header
