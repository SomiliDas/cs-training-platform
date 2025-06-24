import React from 'react'
import Header from '../components/Header'
import profilePic from '../assets/profilepic.jpg'

export default function AdminDashboard() {
  return (
    <div className='bg-white'>
        <Header/>
        <div className='pt-3'>
            <div className='flex items-center gap-4 justify-center'>
                <div className='w-[50px] h-[50px] rounded-full'>
                    <img src={profilePic} className='w-full h-full object-cover'/>
                </div>
                <div className='text-center text-blue-950 font-extrabold text-[45px] m-5'>
                    Admin DashBoard
                </div>
            </div>
            <div className='grid grid-cols-[48%_48%] gap-[4%]'>
                <div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[20px]'>
                    <p className='my-2'>Total Students</p>
                    <p>41</p>
                </div>
                <div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[20px]'>
                    <p className='my-2'>Active Students</p>
                    <p>30</p>
                </div>
            </div>

            <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                <div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[20px]'>
                    <p className='my-2'>Enrolled Plans</p>
                    <p>12</p>
                </div>
                <div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[20px]'>
                    <p className='my-2'>Total Income</p>
                    <p>300000</p>
                </div>
            </div>
            <div className='grid grid-cols-[45%_45%] gap-[10%] mt-10'>
                <div className='w-full flex items-center justify-center gap-3'>
                    <button className='py-2 px-4 text-white bg-blue-600 rounded-lg cursor-pointer hover:underline'>Manage Courses</button>
                    <button className='py-2 px-4 text-white bg-blue-600 rounded-lg cursor-pointer hover:underline'>Configure Tasks</button>
                </div>
                <div>
                    <p className='text-blue-950 text-[25px] font-medium mb-2'>Current Progress</p>
                    <div className='overflow-y-scroll h-[120px] flex justify-center '>
                        <table >
                            <thead >
                                <tr>
                                    <th className='px-5 text-blue-950 font-bold text-[20px]'>Name</th>
                                    <th className='px-5 text-blue-950 font-bold text-[20px]'>Progress</th>
                                    <th className='px-5 text-blue-950 font-bold text-[20px]'>Tools</th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td className='py-2 text-[18px] text-blue-950 '>Alice Smith</td>
                                    <td className='py-2 text-[18px] text-blue-950 '>80%</td>
                                    <td className='py-2 text-[18px] text-blue-950 '><a>view</a></td>
                                </tr>
                                <tr>
                                    <td className='py-2 text-[18px] text-blue-950 '>Michael Johnson</td>
                                    <td className='py-2 text-[18px] text-blue-950 '>70%</td>
                                    <td className='py-2 text-[18px] text-blue-950 '><a>view</a></td>
                                </tr>
                                <tr>
                                    <td className='py-2 text-[18px] text-blue-950 '>Emily Brown</td>
                                    <td className='py-2 text-[18px] text-blue-950 '>85%</td>
                                    <td className='py-2 text-[18px] text-blue-950 '><a>view</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
