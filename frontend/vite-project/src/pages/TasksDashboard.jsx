import React, { useEffect, useState } from 'react'
import HeaderAdmin from '../components/HeaderAdmin'

export default function TasksDashboard() {

    let[title, setTitle] = useState("")
    let[description, setDescription] = useState("")
    let[cost, setCost] = useState("")
    let[progId, setProgId] = useState()
    let [tasks, setTasks] = useState([])
    let[programs, setPrograms] = useState([])


    const [isEditMode, setIsEditMode] = useState(false)
    const[editTaskId, setEditTaskId] = useState("")
    

    useEffect(()=>{
        let getPrograms = async()=>{
            try{
                let res = await fetch(`http://localhost:8000/programs/getPrograms`, {
                    method:"GET",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    credentials:"include"
                })
                if(!res.ok){
                    alert("something went wrong")
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
    }, [])


      useEffect(()=>{
    let getTasks = async ()=>{
      try{
        let res = await fetch(`http://localhost:8000/tasks/allTasks`, {
          method:"GET",
          headers:{
            "Content-Type" : "application/json"
          },
          credentials:"include"
        })
        if(!res.ok){
          alert("failed")
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



    let taskHandler = async(e)=>{

        if(isEditMode){
            let res = await fetch(`http://localhost:8000/tasks/update/${editTaskId}`, {
                        method:"PUT",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify({title, description, cost, progId}),
                        credentials: "include"
                    })
                    if(!res.ok){
                        alert("deletion failed")
                    }
                    else{
                        let data = await res.json()
                        let updatedTasks = tasks.map((t) =>
                            t._id === editTaskId ? data.updatedTask : t
                        );

                        setTasks(updatedTasks);
                    }
        }

        e.preventDefault()
        try{
            let res = await fetch(`http://localhost:8000/tasks/create/${progId}`, {
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({title, description, cost}),
                credentials : "include"
            })
            if(!res.ok){
                alert("failed to create task")
            }
            else{
                let data = await res.json()
                let prevtasks = [...tasks]
                let newtasks = [...prevtasks, data.task]
                setTasks(newtasks)
                setTitle("")
                setDescription("")
                setProgId("")
                setCost("")
            }
        }catch(err){
            console.log(err)
        }
    }


    const handleDelete = async(id)=>{
        try{
            let res = await fetch(`http://localhost:8000/tasks/delete/${id}`,{
                method:"DELETE",
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include"
            })
            if(!res.ok){
                alert("delete failed")
            }
            else{
                let prevTasks = [...tasks]
                let newTasks = prevTasks.filter((task)=>(task._id !== id))
                setTasks(newTasks)

            }
        }catch(err){
            console.log(err)
        }
    }


        const handleUpdate = async(id)=>{
            try{
                let res = await fetch(`http://localhost:8000/tasks/${id}`,{
                    method:"GET",
                    headers : {
                        "Content-Type" : "application/json",
                        
                    },
                    credentials :"include"
                    
                })
                if(!res.ok){
                     console.log("failed to fetch task")
                }
                else{
                    let data = await res.json()
                    setTitle(data.task.title)
                    setDescription(data.task.description)
                    setCost(data.task.cost)
                    setProgId(data.task.program)
                    setIsEditMode(true)
                    setEditTaskId(id)
                }
            }catch(err){
                console.log(err)
            }
        }



  return (
    <div className='bg-white'>
      <div> <HeaderAdmin/> </div>  
      <div>
        <p className='text-blue-950 text-[45px] my-5 font-bold text-center px-10'>Task DashBoard</p>
        <div className='grid grid-cols-[40%_55%] gap-[5%]'>
            <div className='flex justify-start ml-20 items-center'>
                <form className='shadow-2xl p-6 w-full' onSubmit={taskHandler}>
                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Task Title</label>
                        <input type='text' name='title' value={title} required placeholder='Enter Title' className='p-2 border-1 border-gray-300 text-left block rounded-lg w-full' onChange={(e)=>(setTitle(e.target.value))} />
                    </div>
                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Task Description</label>
                        <textarea name='description' value={description} required placeholder='Enter Description' className='p-2 resize-none overflow-y-auto border-1 border-gray-300 text-left block rounded-lg w-full' onChange={(e)=>(setDescription(e.target.value))} />
                    </div>
                    

                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Select Program</label>
                        <select
                            className='p-2 border-1 border-gray-300 text-left block rounded-lg w-full'
                            required value={progId} onChange={(e)=>(setProgId(e.target.value))}
                        >   
                            <option>-- Select Program --</option>
                            {programs.map((program) => (
                            <option key={program._id} value={program._id} className='text-black'>
                                {program.title}
                            </option>
                            ))}
                        </select>
                    </div>


                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Task Cost</label>
                        <input type='Number' name='cost' value={cost} required placeholder='Enter Cost ' className='p-2 border-1 border-gray-300 text-left block rounded-lg w-full' onChange={(e)=>(setCost(e.target.value))}/>
                    </div>
                    <input type='submit' value={isEditMode ? "Update Task" : "Create Task"} className={`p-3  text-white rounded-lg font-bold block hover:underline cursor-pointer ${isEditMode? 'bg-yellow-400' : 'bg-blue-600'}`} />
                </form>
                
            </div>
            <div className='mt-10  px-10 '>
                <p className='text-blue-950 font-bold text-[25px] p-3 text-center mr-13 mb-5 bg-blue-100 rounded-lg'> Created Tasks </p>
                <div className='overflow-y-auto h-[350px] w-full'>
                        <div className='flex items-center mt-3 pr-15 '>
                            <table className='w-full table-fixed'>
                                <thead>
                                    <tr className='border-b-1 border-gray-300 bg-blue-50 '>
                                        <th className='py-2 text-blue-950 font-bold text-[20px]'>Title</th>
                                        <th className='py-2  text-blue-950 font-bold text-[20px]'>Description</th>
                                        <th className='py-2 text-blue-950 font-bold text-[20px]'>Program</th>
                                        <th className='py-2 text-blue-950 font-bold text-[20px]'>Cost</th>
                                        <th className='py-2 text-blue-950 font-bold text-[20px]'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody >
                                        {
                                            tasks.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className='text-center font-semibold p-2'>No tasks available</td>
                                            </tr>
                                            ) : (
                                            tasks.map((task, idx) => (
                                                <tr className='hover:bg-blue-100 border-b border-gray-300' key={idx}>
                                                <td className='py-6 px-6 mx-2 text-center text-blue-950 font-medium'>{task.title}</td>
                                                <td className='py-6 px-6 mx-2 text-center text-blue-950 max-w-[400px] whitespace-pre-wrap break-words text-sm'>{task.description}</td>
                                                <td className='py-6 px-6 mx-2 text-center text-blue-950 font-medium'>{task.program.title}</td>
                                                <td className='py-6 px-6 mx-2 text-center text-blue-950 font-semibold'>Rs. {task.cost}</td>
                                                <td className='py-6 px-6 mx-2 text-blue-950 text-center'>
                                                    <div className="flex space-x-2 justify-center">
                                                    <button
                                                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded text-sm"
                                                        onClick={() => handleUpdate(task._id)}
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                                                        onClick={() => handleDelete(task._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    </div>
                                                </td>
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
    </div>
  )
}
