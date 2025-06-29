import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import HeaderUser from '../components/HeaderUser'
import getUserRoleFromCookie from '../services/getCookies'
import HeaderAdmin from '../components/HeaderAdmin'
import { toast } from 'react-toastify'

export default function ProgramsPage() {

  const [role, setRole] = useState(null)
  let [programs, setPrograms] = useState([])

  useEffect(()=>{
    let getPrograms = async()=>{
            try{
                let res = await fetch(`https://flight-training-platform-backend.onrender.com/programs/getPrograms`, {
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    credentials:"include"
                })
                if(!res.ok){
                    toast.error("something went wrong")
                }
                else{
                    let data = await res.json()
                    setPrograms(data.programs)
                }
            }catch(err){
                console.log(err)
            }
        }
        getPrograms()
  },[])

  useEffect(()=>{
    let data = getUserRoleFromCookie()
    console.log(data)
    setRole(data)
  }, [])

  const navigate = useNavigate()

  let moreInfoFunc = (id)=>{
    if(!role || role== null || role == ""){
      toast.error("Login First!")
    }
    else{
      navigate(`/users/program/${id}`)
    }
  }



  return (
    <div className='bg-white'>
      <div>
        {
          role == null ? <Header/> : role === "admin" ? <HeaderAdmin/> : <HeaderUser/>
        }
      </div>
      <div >
        <div>
            <h1 className="text-[40px] font-extrabold text-center text-blue-950 mt-5 mb-10">
                Training Programs
            </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20">
       
        {
          programs.length === 0 ? <p className="col-span-full text-center text-xl text-gray-500">No Programs Created</p>
          :
          programs.map((program)=>(
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={`http://localhost:8000/images/${program.programPic}`}
                alt={program.title}
                className="w-full h-48"
              />
              <div className="p-5 flex justify-between items-center">
                <h2 className="text-[20px] font-semibold text-blue-950">{program.title}</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold " onClick={()=>(moreInfoFunc(program._id))}>
                  More Info
                </button>
              </div>
            </div>
          ))
        }

      </div>
    </div>
      </div>
    </div>
  )
}
