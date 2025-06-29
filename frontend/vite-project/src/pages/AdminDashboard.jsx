import React, { useEffect, useState } from 'react'
import profilePic from '../assets/profilepic.jpg'
import HeaderAdmin from '../components/HeaderAdmin'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AdminDashboard() {
    let navigate = useNavigate()
    let[totalPrograms, setTotalPrograms] = useState(0)
    let[totalStudents, setTotalStudents] = useState(0)
    let[totalTasks, setTotalTasks] = useState(0)
    let[totalPendingApprovals, setTotalPendingApprovals] = useState(0)
    useEffect(()=>{
        const getTotalPrograms = async()=>{
            try{
                let res = await fetch("https://flight-training-platform-backend.onrender.com/programs/getPrograms", {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    toast.error("No programs created yet")
                }
                else{
                    let data = await res.json()
                    setTotalPrograms(data.programs.length)

                }
            }catch(err){
                console.log(err)
            }
        }
        let getTotalStudents = async()=>{
            try{
                let res = await fetch("https://flight-training-platform-backend.onrender.com/users/admins/getUsers", {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    toast.error("No Students Found")
                }
                else{
                    let data = await res.json()
                    setTotalStudents(data.users.length)
                }
            }catch(err){
                console.log(err)
            }
        }

        const getTotalTasks = async()=>{
            try{
                let res = await fetch("https://flight-training-platform-backend.onrender.com/tasks/allTasks", {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    toast.error("No tasks created")
                }
                else{
                    let data = await res.json()
                    setTotalTasks(data.tasks.length)

                }
            }catch(err){
                console.log(err)
            }
        }


        const getPendingApprovals = async ()=>{
            try{
                const res = await fetch("https://flight-training-platform-backend.onrender.com/submissions/pending", {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    toast.error("something went wrong")
                }
                else{
                    const data = await res.json()
                    setTotalPendingApprovals(data.submissions.length)
                }
            }catch(err){
                console.log(err)
            }
        }

        
        getPendingApprovals()
        getTotalPrograms()
        getTotalStudents()
        getTotalTasks()
    }, [])


  return (
    <div className='bg-white'>
        <HeaderAdmin/>
        <div className='pt-3 px-20 pb-10'>
            <div className='flex items-center gap-4 justify-center'>
                <div className='w-[80px] h-[80px] rounded-full'>
                    <img src={profilePic} className='w-full h-full object-cover rounded-full'/>
                </div>
                <div className='text-center text-blue-950 font-extrabold text-[45px] m-5'>
                    Admin DashBoard
                </div>
            </div>
            <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                <Link to="/admin/getusers"><div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[25px] hover:bg-blue-50 cursor-pointer'>
                    <p className='my-2'>View Students</p>
                    <p>{totalStudents}</p>
                </div></Link>
                <Link to = "/admin/pending"><div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[25px] hover:bg-blue-50 cursor-pointer'>
                    <p className='my-2'>Pending Approvals</p>
                    <p>{totalPendingApprovals}</p>
                </div></Link>
            </div>

            <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                <Link to = "/admin/allTasks"><div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[25px] hover:bg-blue-50 cursor-pointer'>
                    <p className='my-2'>Total Tasks</p>
                    <p>{totalTasks}</p>
                </div></Link>
                <Link to="/users/programs"><div className='w-full px-3 py-5 shadow-2xl text-blue-950 text-center font-bold text-[25px] hover:bg-blue-50 cursor-pointer'>
                    <p className='my-2'>Enrolled Programs</p>
                    <p>{totalPrograms}</p>
                </div></Link>
            </div>
                <div className='w-full flex items-center justify-center gap-9 mt-15'>
                    <button className='p-4 text-white bg-blue-600 rounded-lg cursor-pointer hover:underline font-bold' onClick={()=>(navigate("/admin/createprogram"))}>Create Programs</button>
                    <button className='p-4 px-8 text-white bg-blue-600 rounded-lg cursor-pointer hover:underline font-bold' onClick={()=>(navigate("/admin/create/tasks"))}>Configure Tasks</button>
                    <button className='p-4 text-white bg-blue-600 rounded-lg cursor-pointer hover:underline font-bold' onClick={()=>(navigate("/admin/studentprogress"))}>View Student Progress</button>
                </div>
                
        </div>
    </div>
  )
}
