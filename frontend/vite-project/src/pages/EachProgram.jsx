import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderUser from '../components/HeaderUser'
import getUserRoleFromCookie from '../services/getCookies'
import HeaderAdmin from '../components/HeaderAdmin'

const EachProgram = () => {
  const navigate = useNavigate()
  let[role, setRole] = useState("")
  let id = useParams().id
  let [program, setProgram] = useState("")
  let[tasks, setTasks] = useState([])

  useEffect(()=>{
    let data = getUserRoleFromCookie()
    setRole(data)
  },[])


  useEffect(()=>{
    let getProgram = async()=>{
      try{
        let res = await fetch(`http://localhost:8000/programs/${id}`, {
          method:"GET",
          headers : {
            "Content-Type" : "application/json"
          },
          credentials:"include"
        })
        if(!res.ok){
          alert("failed")
        }
        else{
          let data = await res.json()
          setProgram(data.program)
        }
      }catch(err){
        console.log(err)
      }
    }
    getProgram()
  }, [])


   useEffect(()=>{
    let getTasks = async()=>{
      try{
        let res = await fetch(`http://localhost:8000/tasks/getTasks/${id}`,{
           method:"GET",
            headers : {
              "Content-Type" : "application/json"
            },
            credentials:"include"
        })
        if(!res.ok){
          console.log("failed to get tasks")
        }
        else{
          let data = await res.json()
          setTasks(data.tasks)
        }

      }catch(err){
        console.log(err)
      }
    }
    getTasks()
   }, [])

   const deleteHandler = async(progid)=>{
    try{
      let res = await fetch(`http://localhost:8000/programs/delete/${progid}`, {
        method:"DELETE",
        credentials:"include"
      })
      if(!res.ok){
        alert("failed to delete")
      }
      else{
        navigate("/programs")
      }
    }catch(err){
      console.log(err)
    }
   }

  return (
    <div>
      <div>
        {
          role == "student" ? <HeaderUser/> : <HeaderAdmin/>
        }
      </div>
      <div>
        <div className=" px-20">
            <div className="mb-10">
                <h1 className="text-[40px] block text-center font-extrabold mt-10 mb-5 text-blue-950">{program.title}</h1>
                <p className="text-lg text-blue-950 mt-2 text-[20px] block text-center">
                  {program.description}
                </p>
                <p className="text-md text-blue-950 mt-2 block text-center text-[25px] font-bold">Base Pay: Rs. 1500</p>
                <div className='flex justify-center items-center'>
                    {
                      role === "student" ? 
                                <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:underline cursor-pointer" onClick={()=>(navigate("/users/topup"))}>
                                    Enroll Now
                                </button>
                                :
                                <div className='flex gap-5 items-center'>
                                  <button className="mt-4 px-6 py-2 bg-yellow-400 text-white font-bold rounded-lg hover:underline cursor-pointer" onClick={()=>(navigate(`/admin/updateprog/${id}`))} >
                                    Update Program
                                  </button>
                                  <button className="mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:underline cursor-pointer" onClick={()=>(deleteHandler(id))}>
                                    Delete Program
                                  </button>
                                </div>
                    }
                </div>
            </div>

      
            <h2 className="text-[25px] font-bold text-blue-950 mb-4">Included Tasks</h2>
            {/* Task List */}
            <div className='overflow-y-auto h-[300px]'>
                

                {
                  tasks.length !== 0 ?
                     
                      tasks.map((task)=>(
                        <div className="border border-gray-200 rounded-lg p-5 mb-4 bg-white shadow-sm">
                            <h3 className="text-xl font-semibold text-blue-950">{task.title}</h3>
                            <p className="text-gray-600 mt-1">
                                {task.description}
                            </p>
                            <p className="text-sm font-medium text-gray-700 mt-2">Cost: {task.cost}</p>
                        </div>
                          ))

                    :

                    <p className='font-bold p-2'>No Tasks Here</p>
                }
                

            </div>
        </div>
      </div>
    </div>
  )
}

export default EachProgram
