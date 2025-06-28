import React, { useEffect, useState } from 'react'
import HeaderUser from '../components/HeaderUser'
import { useNavigate } from 'react-router-dom'

export default function MyProgs() {

    let [programs, setPrograms] = useState([])
    const navigate = useNavigate()
    
      useEffect(()=>{
        let getPrograms = async()=>{
                try{
                    let res = await fetch(`http://localhost:8000/users/enrolledPrograms`, {
                        method:"GET",
                        credentials:"include"
                    })
                    if(!res.ok){
                        alert("failed to get programs")
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




  return (
    <div>
      <HeaderUser/>
      <div>
        <p className='block text-center font-extrabold text-[40px] text-blue-950'>My Enrolled Programs</p>
        <div>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20 mt-10">
       
                {
                programs.map((program)=>(
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <img
                        src={`http://localhost:8000/images/${program.programPic}`}
                        alt={program.title}
                        className="w-full h-48"
                    />
                    <div className="p-5 flex justify-between items-center">
                        <h2 className="text-[20px] font-semibold text-blue-950">{program.title}</h2>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold " onClick={()=>(navigate(`/users/program/${program._id}`))}>
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
