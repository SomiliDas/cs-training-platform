import React from 'react'
import Header from '../components/Header'
import profilePic from '../assets/profilepic.jpg'

const UserProilePage = () => {
  return (
    <div className='bg-white'>
      <Header/>
        <div className='pt-10'>
            <button className='block ml-10 px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold cursor-pointer hover:underline'>Edit</button>
            <div className=' mt-5 flex justify-center items-center'>
                <div className='h-[250px] w-[250px] rounded-full'>
                    <img src={profilePic} className='h-full w-full object-cover border-1 border-gray-300 rounded-full'/>
                </div>
            </div>
                <p className='text-[45px] text-blue-950 font-extrabold mb-1'>Emily Johnson</p>
                <p className='text-[20px] font-medium text-blue-950'>emily.johnson@gmail.com</p>
                <div>
                    <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                        <div className=' text-[30px] font-bold text-blue-950 shadow-2xl p-2'>Enrolled Program</div>
                        <div className='text-[25px] font-medium text-blue-950 shadow-2xl p-2'>Flight Training Program</div>
                    </div>
                    <div className='grid grid-cols-[48%_48%] gap-[4%] mt-5'>
                        <div className=' text-[30px] font-bold text-blue-950 shadow-2xl p-2'>Wallet Balance</div>
                        <div className='text-[25px] font-medium text-blue-950 shadow-2xl p-2'>Rs. 20000</div>
                    </div>
                </div>
        </div>

        
        
      
    </div>
  )
}

export default UserProilePage
