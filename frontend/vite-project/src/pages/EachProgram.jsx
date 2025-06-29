import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HeaderUser from '../components/HeaderUser'
import getUserRoleFromCookie from '../services/getCookies'
import HeaderAdmin from '../components/HeaderAdmin'
import { toast } from 'react-toastify'

const EachProgram = () => {
  const navigate = useNavigate()
  let[role, setRole] = useState("")
  let progId = useParams().id
  let [program, setProgram] = useState('')
  let[tasks, setTasks] = useState([])
  let[balance, setBalance] = useState(0)
  let[userId, setUserId] = useState('')
  let[enrolledProgs, setEnrolledProgs] = useState([])

  useEffect(()=>{
    let data = getUserRoleFromCookie()
    setRole(data)
  },[])


  useEffect(()=>{
    let getProgram = async()=>{
      try{
        let res = await fetch(`/api/programs/${progId}`, {
          method:"GET",
          headers : {
            "Content-Type" : "application/json"
          },
          credentials:"include"
        })
        if(!res.ok){
          toast.error("No program found")
        }
        else{
          let data = await res.json()
          setProgram(data.program)
        }
      }catch(err){
        console.log(err)
      }
    }
    let getTasks = async()=>{
      try{
        let res = await fetch(`/api/tasks/getTasks/${progId}`,{
           method:"GET",
            headers : {
              "Content-Type" : "application/json"
            },
            credentials:"include"
        })
        if(!res.ok){
          toast.error("No tasks found")
        }
        else{
          let data = await res.json()
          setTasks(data.tasks)
        }

      }catch(err){
        console.log(err)
      }
    }
    const fetchBalance = async()=>{
            try{
                const res = await fetch("/api/transactions/balance", {
                    method : "GET",
                    credentials : "include"
                })
                if(!res.ok){
                    toast.error('something went wrong')
                }
                else{
                    const data = await res.json()
                    setBalance(data.balance)
                    setUserId(data.userId)
                }
            }catch(err){
                console.log(err)
            }
        }

    getProgram()
    getTasks()
    
    fetchBalance()
  }, [])


  useEffect(()=>{
      const getEnrolledProgs = async()=>{
          try{
              let res = await fetch(`/api/users/${userId}`, {
                method:"GET",
                credentials:"include"
              })
              if(!res.ok){
                toast.error("something went wrong")
              }else{
                let data = await res.json()
                setEnrolledProgs(data.user.enrolledPrograms)

              }
          }catch(err){
            console.log(err)
          }
        } 

        if(userId){
            getEnrolledProgs()
          }
        
  }, [userId])



   const deleteHandler = async(progid)=>{
    try{
      let res = await fetch(`/api/programs/delete/${progid}`, {
        method:"DELETE",
        credentials:"include"
      })
      if(!res.ok){
        toast.error("deletion failed")
      }
      else{
        toast.success("deleted successfully")
        navigate("/programs")
      }
    }catch(err){
      console.log(err)
    }
   }


   const enrollHandler = async()=>{
    try{

      if(balance == 0){
        toast.error("Balance 0")
        navigate("/users/topup")
        return
      }
      let res = await fetch(`/api/users/enroll/${progId}`, {
        method:"POST",
        credentials:"include"
      })
      if(!res.ok){
        toast.error("enrollment failed")
      }
      else{
        
        setEnrolledProgs([...enrolledProgs, progId])
        toast.success("Enrolled successfully")
      }
    }catch(err){
      console.log(err)
    }
   }


   if (!program) {
    return <div className="text-center text-xl mt-20 text-gray-700">Loading...</div>;
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
                <p className="text-md text-blue-950 mt-2 block text-center text-[25px] font-bold">Base Pay: Rs. 5000</p>
                <div className='flex justify-center items-center'>
                    {
                      role === "student" ? 
                                <button className={`mt-4 px-6 py-2 text-white font-bold rounded-lg  ${enrolledProgs?.map(id=>id.toString()).includes(progId) ? 'bg-green-500' : 'bg-blue-600 hover:underline cursor-pointer'}`} onClick={enrollHandler}>
                                    {
                                      enrolledProgs?.map(id => id.toString()).includes(progId) ? "Enrolled" :  "Enroll Now"
                                    }
                                </button>
                                :
                                <div className='flex gap-5 items-center'>
                                  <button className="mt-4 px-6 py-2 bg-yellow-400 text-white font-bold rounded-lg hover:underline cursor-pointer" onClick={()=>(navigate(`/admin/updateprog/${progId}`))} >
                                    Update Program
                                  </button>
                                  <button className="mt-4 px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:underline cursor-pointer" onClick={()=>(deleteHandler(progId))}>
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
                     
                      tasks.map((task, idx)=>(
                        <div className="border border-gray-200 rounded-lg p-5 mb-4 bg-white shadow-sm" key={idx}>
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
