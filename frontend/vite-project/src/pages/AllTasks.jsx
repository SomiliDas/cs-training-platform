import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import { toast } from 'react-toastify'

export default function AllTasks() {

    let[tasks, setTasks] = useState([])
    useEffect(()=>{
        let fetchTasks = async ()=>{
            try{
                let res = await fetch("http://localhost:8000/tasks/allTasks", {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    toast.error("No tasks created")
                }
                else{
                    let data = await res.json()
                    setTasks(data.tasks)

                }
            }catch(err){
                console.log(err)
            }
        }
        fetchTasks()
    }, [])

  return (
    <div>
      <HeaderAdmin/>
      <div className='bg-white flex justify-center items-center px-20 py-10'>
            <div className='mt-10  px-10 '>
                <p className='text-blue-950 font-bold text-[25px] p-3 text-center mr-13 mb-5 bg-blue-100 rounded-lg'> Created Tasks </p>
                <div className='overflow-y-auto h-[350px] w-full'>
                        <div className='flex items-center mt-3 pr-15 '>
                            <table className='w-full table-fixed'>
                                <thead>
                                    <tr className='border-b-1 border-gray-300 bg-blue-50 '>
                                        <th className='py-2 px-20 text-center text-blue-950 font-bold text-[20px]'>Title</th>
                                        <th className='py-2 px-20 text-center text-blue-950 font-bold text-[20px]'>Description</th>
                                        <th className='py-2 px-20 text-center text-blue-950 font-bold text-[20px]'>Program Name</th>
                                        <th className='py-2 px-20 text-blue-950 font-bold text-[20px]'>Cost</th>
                                    </tr>
                                </thead>
                                <tbody >
                                        {
                                            tasks.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className='text-center font-semibold p-2'>No tasks available</td>
                                            </tr>
                                            ) : (
                                            tasks.map((task, idx) => (
                                                <tr className='hover:bg-blue-100 border-b border-gray-300' key={idx}>
                                                    <td className='py-6 px-2 text-center text-blue-950 font-medium'>{task.title}</td>
                                                    <td className='py-6 px-2 text-center text-blue-950 max-w-[400px] whitespace-pre-wrap break-words text-sm'>{task.description}</td>
                                                    <td className='py-6 px-2 text-center text-blue-950 font-medium'>{task.program.title}</td>
                                                    <td className='py-6 px-2 text-center text-blue-950 font-semibold'>₹{task.cost}</td>
                                                </tr>
                                            ))
                                            )
                                        }
                                </tbody>

                            </table>
                        </div>
                </div>
            </div>
      </div>
    </div>
  )
}
