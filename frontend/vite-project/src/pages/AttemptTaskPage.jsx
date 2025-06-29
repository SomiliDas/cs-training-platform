import React, { useEffect, useState } from 'react'

import HeaderUser from '../components/HeaderUser'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AttemptTaskPage() {

    const navigate = useNavigate()
    let[progressList, setProgressList] = useState([])
    let[totalTask, setTotalTasks] = useState(0)
    let[totalAttemptedTask, setTotalAttemptedTasks] = useState(0)
    let[totalnProgTask, setTotalInProgTasks] = useState(0)
    let[totalCompTask, setTotalCompTasks] = useState(0)

    useEffect(()=>{
        const fetchProgressList = async ()=>{
            try{
                let res = await fetch("https://flight-training-platform-backend.onrender.com/progress/tasks", {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    // toast.error("something went wrong")
                }
                else{
                    let data = await res.json()
                    setProgressList(data.progressList)
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchProgressList()
    }, [progressList])

    const statusHandler = async (taskId, status)=>{
        try{

            if(status === "Not Accepted"){
                let d_res = await fetch(`https://flight-training-platform-backend.onrender.com/transactions/attempt-task/${taskId}`, {
                    method:"POST",
                    credentials:"include"
                })
                if(!d_res.ok){
                    toast.error("Insufficient Balance")
                    navigate("/users/topup")
                    return
                }else{
                    status = "In Progress"
                }

            }
            else if (status=== "In Progress"){
                
                let s_res = await fetch(`https://flight-training-platform-backend.onrender.com/submissions/submit/${taskId}`, {
                    method:"POST",
                    credentials:"include"
                })
                if(!s_res.ok){
                    toast.error("Already Submitted")
                    return
                }
                else{
                    status = "Completed"
                }
            }
            let res = await fetch(`https://flight-training-platform-backend.onrender.com/progress/update/${taskId}`,{
                method: "PUT",
                credentials:"include",
                headers:{
                    "Content-Type" :"application/json"
                },
                body : JSON.stringify({status})
            })
            if(!res.ok){
                toast.error("failed to accept/complete task")
                return
            }
            else{
                let data = await res.json()
                console.log(data.progress)
                setProgressList(progressList.map((progress)=>(
                    progress._id === data.progress._id ?  data.progress : progress
                )))
            }

        }catch(err){
            console.log(err)
        }
    }


    useEffect(()=>{
        let attemptCount = 0
        let TotalCount = 0
        let InProgCount = 0
        let CompCount = 0
        progressList.map((progress)=>{
            if(progress.status === "Not Accepted"){
                TotalCount++
            }
            else if(progress.status === "In Progress"){
                InProgCount++
                TotalCount++
            }
            else{
                CompCount++
                TotalCount++
            }

        })
        attemptCount = InProgCount + CompCount
        setTotalTasks(TotalCount)
        setTotalAttemptedTasks(attemptCount)
        setTotalInProgTasks(InProgCount)
        setTotalCompTasks(CompCount)

    }, [progressList])


  return (
    <div className='bg-white'>
        <HeaderUser/>
        <p className='block text-center mt-10 text-blue-950 text-[40px] font-bold'>All Tasks </p>
        <div className='pr-20'>
            <div className='grid grid-cols-[48%_48%] gap-[2%]'>
                <div className='px-10'>
                    <div className='grid grid-cols-[48%_48%] gap-[4%] my-10'>
                        <div className='bg-white shadow-2xl w-full text-center text-blue-950 p-3 font-bold text-[25px] py-10'>
                            <p className=' my-1 '>Total Tasks</p>
                            <p className=' my-1 ' >{totalTask}</p>
                        </div>
                        <div className='bg-white shadow-2xl w-full text-center text-blue-950 p-3 font-bold text-[25px] py-10'>
                            <p className=' my-1'>Total Attempted Tasks</p>
                            <p className=' my-1' >{totalAttemptedTask}</p>
                        </div>
                        
                    </div>

                    <div className='grid grid-cols-[48%_48%] gap-[4%] my-10'>
                        <div className='bg-white shadow-2xl w-full text-center text-blue-950 p-3 font-bold text-[25px] py-10'>
                            <p className=' my-1'>Total Completed Tasks</p>
                            <p className=' my-1' >{totalCompTask}</p>
                        </div>
                        <div className='bg-white shadow-2xl w-full text-center text-blue-950 p-3 font-bold text-[25px] py-10'>
                            <p className=' my-1'>Total In Progress Tasks</p>
                            <p className=' my-1' >{totalnProgTask}</p>
                        </div>
                        
                    </div>
                </div>

                <div className=" mr-10 mt-10 bg-white overflow-y-auto h-[400px] w-full">
                    <table className=" text-blue-950 w-full">
                        <thead className='border-b-1  border-gray-300 text-[20px]'>
                        <tr className='bg-blue-100' >
                            <th className="px-6 py-5 text-left ">Task Name</th>
                            <th className="px-6 py-5 text-left ">Program</th>
                            <th className="px-6 py-5 text-left ">Cost</th>
                            <th className="px-6 py-5 text-left ">Status</th>
                            <th className="px-6 py-5 text-left ">Action</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                            {
                                progressList.length===0 ? <tr><td colSpan={"4"} className='p-4 text-center font-bold'>Not Enrolled In Any Programs Yet</td></tr>
                                                    :
                                                progressList.map((progress)=>(
                                                    <tr className="hover:bg-blue-50 border-b-1 border-gray-300">
                                                        <td className="px-6 py-4">{progress.task.title}</td>
                                                        <td className="px-6 py-4">{progress.task.program.title}</td>
                                                        <td className="px-6 py-4">Rs.{progress.task.cost}</td>
                                                        <td className={`px-6 py-4 font-semibold ${progress.status === "Not Accepted" ? 'text-red-500' : progress.status === "In Progress" ? 'text-yellow-500' : 'text-green-500'  } border-b border-gray-300`}>{progress.status}</td>
                                                        <td className="px-6 py-4">
                                                                <button className={`hover:underline text-white font-bold py-1 px-3 rounded text-sm ${progress.status === "Not Accepted" ? 'bg-yellow-400' : progress.status === "In Progress" ? 'bg-green-400' : null}`} onClick={()=>(statusHandler(progress.task._id, progress.status))}>
                                                                    {
                                                                        progress.status === "Not Accepted" ? "Accept" : progress.status === "In Progress" ? "Complete" : null
                                                                    }
                                                                </button>
                                                        </td>
                                                    </tr>
                                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
