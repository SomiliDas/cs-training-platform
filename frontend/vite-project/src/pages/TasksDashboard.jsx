import React from 'react'
import Header from '../components/Header'

export default function TasksDashboard() {
  return (
    <div className='bg-white'>
      <div className='px-10'> <Header/> </div>  
      <div>
        <p className='text-blue-950 text-[45px] my-5 font-bold text-center px-10'>Task DashBoard</p>
        <div className='grid grid-cols-[40%_55%] gap-[5%]'>
            <div className='flex justify-start ml-20 items-center'>
                <form className='shadow-2xl p-6 w-full'>
                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Task Title</label>
                        <input type='text' name='title' required placeholder='Enter Title' className='p-2 border-1 border-gray-300 text-left block rounded-lg w-full' />
                    </div>
                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Task Description</label>
                        <textarea name='description' required placeholder='Enter Description' className='p-2 resize-none overflow-y-auto border-1 border-gray-300 text-left block rounded-lg w-full' />
                    </div>
                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Program</label>
                        <input type='text' name='program' required placeholder='Enter Program' className='p-2 border-1 border-gray-300 text-left block rounded-lg w-full' />
                    </div>
                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Task Cost</label>
                        <input type='Number' name='cost' required placeholder='Enter Cost ' className='p-2 border-1 border-gray-300 text-left block rounded-lg w-full' />
                    </div>
                    <input type='submit' value={"Create Task"} className='p-3 bg-blue-600 text-white rounded-lg font-bold block hover:underline cursor-pointer' />
                </form>
                
            </div>
            <div className='mt-15 ml-10 px-10 '>
                <p className='text-blue-950 font-bold text-[25px] p-3 text-center mb-5 bg-blue-100 rounded-lg'> Created Tasks </p>
                <div className='flex justify-center items-center mt-10'>
                    <table>
                        <thead>
                            <tr className='border-b-1 border-gray-300 '>
                                <th className='py-2 px-20 text-blue-950 font-bold text-[20px]'>Title</th>
                                <th className='py-2 px-20 text-blue-950 font-bold text-[20px]'>Program</th>
                                <th className='py-2 px-20 text-blue-950 font-bold text-[20px]'>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='hover:bg-blue-100 border-b-1 border-gray-300'>
                                <td className='py-2 px-20 text-blue-950'>Pre-flight Checklist</td>
                                <td className='py-2 px-20 text-blue-950'>Flight Basics</td>
                                <td className='py-2 px-20 text-blue-950'>5000</td>
                            </tr>
                            <tr className='hover:bg-blue-100 border-b-1 border-gray-300'>
                                <td className='py-2 px-20 text-blue-950'>Navigation Exercise</td>
                                <td className='py-2 px-20 text-blue-950'>Medical </td>
                                <td className='py-2 px-20 text-blue-950'>8000</td>
                            </tr>
                            <tr className='hover:bg-blue-100 border-b-1 border-gray-300'>
                                <td className='py-2 px-20 text-blue-950'>Weather Analysis</td>
                                <td className='py-2 px-20 text-blue-950'>Metereology</td>
                                <td className='py-2 px-20 text-blue-950'>5000</td>
                            </tr>
                            <tr className='hover:bg-blue-100 border-b-1 border-gray-300'>
                                <td className='py-2 px-20 text-blue-950'>Emergency Procedures</td>
                                <td className='py-2 px-20 text-blue-950'>Flight Basics</td>
                                <td className='py-2 px-20 text-blue-950'>2000</td>
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
