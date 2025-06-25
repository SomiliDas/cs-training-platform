import React from 'react'
import Header from '../components/Header'
import profilePic from '../assets/profilepic.jpg'

export default function AdminDashboard() {
  return (
    <div className='bg-white px-10'>
        <Header/>
        <div className='pt-3'>
            <div className='flex items-center gap-4 justify-center'>
                <div className='w-[80px] h-[80px] rounded-full'>
                    <img src={profilePic} className='w-full h-full object-cover rounded-full'/>
                </div>
                <div className='text-center text-blue-950 font-extrabold text-[45px] m-5'>
                    Admin DashBoard
                </div>
            </div>
            <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                <div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[25px]'>
                    <p className='my-2'>Total Students</p>
                    <p>41</p>
                </div>
                <div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[25px]'>
                    <p className='my-2'>Active Students</p>
                    <p>30</p>
                </div>
            </div>

            <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                <div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[25px]'>
                    <p className='my-2'>Enrolled Plans</p>
                    <p>12</p>
                </div>
                <div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[25px]'>
                    <p className='my-2'>Total Income</p>
                    <p>Rs. 300000</p>
                </div>
            </div>
                <div className='w-full flex items-center justify-center gap-3 mt-20'>
                    <button className='p-4 text-white bg-blue-600 rounded-lg cursor-pointer hover:underline font-bold'>Manage Courses</button>
                    <button className='p-4 text-white bg-blue-600 rounded-lg cursor-pointer hover:underline font-bold'>Configure Tasks</button>
                    <button className='p-4 text-white bg-blue-600 rounded-lg cursor-pointer hover:underline font-bold'>View Student Progress</button>
                </div>
                
        </div>
    </div>
  )
}
