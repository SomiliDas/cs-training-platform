import React, { useEffect } from 'react'
import {useState } from 'react'
import HeaderAdmin from '../components/HeaderAdmin'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function UpdateProg() {


    let[title, setTitle] = useState("")
    let[description, setDescription] = useState("")
    let[programPic, setProgramPic] = useState(null)
    let progId = useParams().id

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchProg = async()=>{
            try{
                
                let res = await fetch(`http://localhost:8000/programs/${progId}`, {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    toast.error("something went wrong")
                }
                else{
                    let data = await res.json()
                    setTitle(data.program.title)
                    setDescription(data.program.description)
                    setProgramPic(data.program.programPic)
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchProg()
    }, [])


    let updateHandler = async(e)=>{
       
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("programPic", programPic)
        try{
            let res = await fetch(`http://localhost:8000/programs/update/${progId}`, {
                method:"PUT",
                credentials :"include",
                body : formData
            })
            if(!res.ok){
                toast.error("Updation Failed")
            }
            else{
                toast.success("Updation Successful")
                navigate("/programs")
            }
       }catch(err){
        console.log(err)
       }
    }


  return (
    <div>
      <HeaderAdmin/>
      <div className='bg-white px-20 mt-20 flex justify-center items-center'>
            <div className='flex justify-center ml-20 items-center w-[45%]'>
                <form className='shadow-2xl p-10 w-full' encType='multipart/form-data' onSubmit={updateHandler} >
                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Program Title</label>
                        <input type='text' name='title' value={title} required placeholder='Enter Title' className='p-2 border-1 border-gray-300 text-left block rounded-lg w-full' onChange={(e)=>(setTitle(e.target.value))} />
                    </div>
                    <div className='mb-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Program Description</label>
                        <textarea name='description' value={description} required placeholder='Enter Description' className='p-2 resize-none overflow-y-auto border-1 border-gray-300 text-left block rounded-lg w-full' onChange={(e)=>(setDescription(e.target.value))} />
                    </div>
                    
                    <div className='mb-7 flex justify-start items-center gap-7'>
                        <label className='block text-left text-blue-950 font-bold pl-2'>Program Picture</label>
                        <input type='file' name='programPic' required className='block w-[40%] bg-gray-300 p-2 rounded-lg'  onChange={(e)=>(setProgramPic(e.target.files[0]))}/>
                    </div>
                    <input type='submit' value={"Update Program"} className='p-3 bg-yellow-400 text-white rounded-lg font-bold block hover:underline cursor-pointer' />
                </form>
                
            </div>
      </div>
    </div>
  )
}
