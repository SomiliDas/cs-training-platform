import React from 'react'
import HeaderUser from '../components/HeaderUser'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditProfile = () => {

    let[name, setName] = useState("")
    let[email, setEmail] = useState("")
    let[password, setPassword] = useState("")
    let[profilePic, setProfilePic] = useState()
    const location = useLocation()
    const {ename, eemail} = location.state
    const id = useParams().id
    const navigate = useNavigate()
    
    useEffect(()=>{
        setName(ename)
        setEmail(eemail)
    }, [])



    const UpdateHandler = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("profilePic", profilePic)
        try{
            const res = await fetch(`http://localhost:8000/users/profile/${id}`, {
                method : "PUT",
                
                body : formData,
                credentials: "include",
                redirect : "follow"

            })

            if(!res.ok){
                toast.error("updation failed")
            }
            else{
                toast.success("updated successfully")
                navigate(`/users/profile/${id}`)
            }
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
        <HeaderUser/>
        <div className='flex justify-center items-center p-10 '>
            <div className='mt-2 py-4 px-6 w-[50%]'>
            <form className='shadow-2xl p-10' encType="multipart/form-data" onSubmit={UpdateHandler}>
                <div className='mb-5'  >
                    <label className='text-blue-950 font-medium mr-5'>Profile Picture</label>
                    <input type='file' name='profilePic'  className='bg-gray-300 px-2 rounded-lg w-[30%] ' onChange={(e)=>(setProfilePic(e.target.files[0]))}/>
                </div>
                <div className='mb-5' >
                    <label className='text-blue-950 font-medium block text-left'>Name</label>
                    <input type='text' name='name' value={name} required placeholder='Enter Name' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setName(e.target.value))}/>
                </div>
                <div className='mb-5' >
                    <label className='text-blue-950 font-medium block text-left'>Email</label>
                    <input type='text' name='email' value={email} required placeholder='Enter Email' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>(setEmail(e.target.value))}/>
                </div>
                <div className='mb-5'>
                    <label className='text-blue-950 font-medium block text-left'>Password</label>
                    <input type='password' name='password' value={password} required placeholder='Enter Password' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg ' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <input type='submit' value={"Update"} className='w-full bg-blue-600 text-white p-2 rounded-lg cursor-pointer font-bold text-[20px] mb-5 hover:underline'/>
            
            </form>
            </div>
        </div>
    </div>
  )
}

export default EditProfile
