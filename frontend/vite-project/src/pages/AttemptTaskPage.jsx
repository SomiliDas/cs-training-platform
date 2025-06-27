import React from 'react'

import HeaderUser from '../components/HeaderUser'

export default function AttemptTaskPage() {
  return (
    <div className='bg-white'>
        <HeaderUser/>
        <p className='block text-center my-10 text-blue-950 text-[40px] font-bold'>Attempted Tasks </p>
        <div className='grid grid-cols-[48%_48%] gap-[4%]'>
            <div className='px-10'>
                <div className='grid grid-cols-[48%_48%] gap-[4%] my-10'>
                    <div className='bg-white shadow-2xl w-full text-center text-blue-950 p-3 font-bold text-[25px]'>
                        <p className=' my-1'>Total Attempted Tasks</p>
                        <p className=' my-1' >12</p>
                    </div>
                    <div className='bg-white shadow-2xl w-full text-center text-blue-950 p-3 font-bold text-[25px]'>
                        <p className=' my-1'>Total Completed Tasks</p>
                        <p className=' my-1' >10</p>
                    </div>
                    
                </div>

                <div className='grid grid-cols-[48%_48%] gap-[4%] my-10'>
                    <div className='bg-white shadow-2xl w-full text-center text-blue-950 p-3 font-bold text-[25px]'>
                        <p className=' my-1'>Pending Review</p>
                        <p className=' my-1' >2</p>
                    </div>
                    <div className='bg-white shadow-2xl w-full text-center text-blue-950 p-3 font-bold text-[25px]'>
                        <p className=' my-1'>Average Score</p>
                        <p className=' my-1' >87%</p>
                    </div>
                    
                </div>
            </div>

            <div className=" ml-10 mt-10 bg-white overflow-y-auto h-[250px]">
                <table className=" text-blue-950 ">
                    <thead className='border-b-1  border-gray-300 text-[20px]'>
                    <tr >
                        <th className="px-10 py-5 text-left ">Task Name</th>
                        <th className="px-10 py-5 text-left ">Program</th>

                        <th className="px-10 py-5 text-left ">Score</th>
                        <th className="px-10 py-5 text-left ">Status</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                        <tr className="hover:bg-blue-100 border-b-1 border-gray-300">
                            <td className="px-10 py-4">Navigation Basics</td>
                            <td className="px-10 py-4">CPL Program</td>
                            <td className="px-10 py-4">90%</td>
                            <td className="px-10 py-4">Reviewed</td>
                        </tr>
                        <tr className="hover:bg-blue-100 border-b-1 border-gray-300">
                            <td className="px-10 py-4">Weather Assessment</td>
                            <td className="px-10 py-4">PPL Program</td>
                            <td className="px-10 py-4">—</td>
                            <td className="px-10 py-4 ">Pending</td>
                        </tr>
                        <tr className="hover:bg-blue-100 border-b-1 border-gray-300">
                            <td className="px-10 py-4">Engine Ops</td>
                            <td className="px-10 py-4">CPL Program</td>
                            <td className="px-10 py-4">85%</td>
                            <td className="px-10 py-4">Reviewed</td>
                        </tr>
                        <tr className="hover:bg-blue-100 border-b-1 border-gray-300">
                            <td className="px-10 py-4">Engine Ops</td>
                            <td className="px-10 py-4">CPL Program</td>
                            <td className="px-10 py-4">85%</td>
                            <td className="px-10 py-4">Reviewed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  )
}
