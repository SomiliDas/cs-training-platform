import React from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function PendingApprovals() {
    const [subs, setSubs] = useState([])
    useEffect(()=>{
        const getPendingApprovals = async ()=>{
            try{
                const res = await fetch("/api/submissions/pending", {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    toast.error("failed to get pending approvals")
                }
                else{
                    const data = await res.json()
                    setSubs(data.submissions)
                }
            }catch(err){
                console.log(err)
            }
        }
        getPendingApprovals()
    }, [])


    const acceptHandler = async(studentId , taskId)=>{
        try{
            const res = await fetch(`/api/submissions/approve/${studentId}/${taskId}`, {
                method:"PUT",
                credentials:"include"
            })
            if(!res.ok){
                toast.error("Approval failed")
            }else{
                const data = await res.json()
                setSubs(subs.filter((sub)=>(sub._id !== data.submission._id)))
                toast.error("Approval Succesfull")
            }
        }catch(err){
            console.log(err)
        }
    }

    const rejectHandler = async(studentId, taskId)=>{
        try{
            const res = await fetch(`/api/submissions/reject/${studentId}/${taskId}`, {
                method: "PUT",
                credentials : "include"
            })
            if(!res.ok){
                toast.error("Rejection Failed")
            }
            else{
                const data = await res.json()
                setSubs(subs.filter((sub)=>(sub._id !== data.submission._id)))
                toast.success("Rejection Successful")
            }
        }catch(err){
            console.log(err)
        }
    }


  return (
    <div>
      <HeaderAdmin/>
      <div className='flex justify-center items-center px-20 mt-15 w-full'>
        <table>
            <thead>
                <tr className='border-b-1 border-gray-300 bg-blue-50 '>
                    <th className='py-2 px-20 text-center text-blue-950 font-bold text-[20px]'>Name</th>
                    <th className='py-2 px-20 text-center text-blue-950 font-bold text-[20px]'>Email</th>
                    <th className='py-2 px-20 text-center text-blue-950 font-bold text-[20px]'>Task</th>
                    <th className='py-2 px-20 text-center text-blue-950 font-bold text-[20px]'>Program</th>
                    <th className='py-2 px-20 text-center text-blue-950 font-bold text-[20px]'>Actions</th>
                </tr>
                
            </thead>
            <tbody>
                {   
                    subs.length === 0 ? <tr><td colSpan="5" className='text-center font-semibold p-2'>NO PENDING APPROVALS</td></tr>
                    :
                    subs.map((sub , idx)=>(
                        <tr className='hover:bg-blue-100 border-b border-gray-300' key={idx}>
                            <td className='py-6 px-2 text-center text-blue-950 font-medium'>{sub.student?.name}</td>
                            <td className='py-6 px-2 text-center text-blue-950 font-medium'>{sub.student?.email}</td>
                            <td className='py-6 px-2 text-center text-blue-950 font-medium'>{sub.task?.title}</td>
                            <td className='py-6 px-2 text-center text-blue-950 font-medium'>{sub.task.program?.title}</td>
                            <td>
                                <div className="flex space-x-2 justify-center">
                                    <button className="bg-green-400 hover:underline text-white font-bold py-1 px-3 rounded text-sm" onClick={()=>(acceptHandler(sub.student._id, sub.task._id))}>Accept</button>
                                    <button className="bg-red-400 hover:underline text-white font-bold py-1 px-3 rounded text-sm" onClick={()=>(rejectHandler(sub.student._id, sub.task._id))}>Reject</button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </div>
    </div>
  )
}
