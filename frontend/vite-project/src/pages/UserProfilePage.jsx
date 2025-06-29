import React from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import HeaderUser from '../components/HeaderUser'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const UserProilePage = () => {
    let[user, setUser] = useState()
    const studentId = useParams().id
    useEffect(()=>{
       const fetchUser = async ()=>{ try{
            const res = await fetch(`/api/users/profile/${studentId}`, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include",
                redirect : 'follow'
            })
            if(!res.ok){
                toast.error("something went wrong")
            }
            else{
                const data = await res.json()
                // console.log(data.user)
                setUser(data.user)
            }
            
        }catch(err){
            console.log(err)
        }
       }

       if(studentId){
        fetchUser()
       }

    }, [studentId])

    const navigate = useNavigate()


    if (!user) {
        return (
            <div className="text-center mt-10 text-lg text-gray-600">
            Loading user data...
            </div>
        );
    }

    const progHandler = ()=>{
        user.enrolledPrograms.length !== 0 ? navigate(`/users/myProgs`) : toast.error("Not enrolled In Any Program Yet")
    }

  return (
    <div className='bg-white'>
      <HeaderUser/>
        <div className='text-center'>
            <button className=' block ml-150 px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold cursor-pointer hover:underline' onClick={()=>(navigate(`/users/edit/${studentId}`, {state : {ename : user.name, eemail : user.email}}))}>Edit Profile</button>
            <div className=' mt-5 flex justify-center items-center'>
                <div className='h-[150px] w-[150px] rounded-full'>
                    <img src={`/images/${user.profilePic}`} className='h-full w-full object-cover border-1 border-gray-300 rounded-full'/>
                </div>
            </div>
                <p className='text-[45px] text-blue-950 font-extrabold mb-1'>{user.name}</p>
                <p className='text-[20px] font-medium text-blue-950'>{user.email}</p>
                <div className='pt-3 px-20 pb-10'>
            
                    <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                        <div className='w-full px-3 py-3 shadow-2xl text-blue-950 text-center font-bold text-[25px] hover:bg-blue-50 cursor-pointer' onClick={progHandler}>
                            <p className='my-2'>Enrolled Programs</p>
                        </div>
                        <Link to = "/users/tasks"><div className='w-full px-3 py-3 shadow-2xl text-blue-950 text-center font-bold text-[25px] hover:bg-blue-50 cursor-pointer'>
                            <p className='my-2'>All Tasks</p>
                        </div></Link>
                    </div>

                    <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                        <Link to = "/users/wallet"><div className='w-full px-3 py-3 shadow-2xl text-blue-950 text-center font-bold text-[25px] hover:bg-blue-50 cursor-pointer'>
                            <p className='my-2'>Wallet</p>
                        </div></Link>
                        <Link to="/users/track"><div className='w-full px-3 py-3 shadow-2xl text-blue-950 text-center font-bold text-[25px] hover:bg-blue-50 cursor-pointer'>
                            <p className='my-2'>Progress Tracker</p>
                        </div></Link>
                    </div>
                
                </div>
        </div>

        
        
      
    </div>
  )
}

export default UserProilePage
