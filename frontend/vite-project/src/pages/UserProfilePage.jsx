import React from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import HeaderUser from '../components/HeaderUser'
import { useEffect } from 'react'
import { useState } from 'react'

const UserProilePage = () => {
    let[user, setUser] = useState()
    const id = useParams().id
    useEffect(()=>{
       const fetchUser = async ()=>{ try{
            const res = await fetch(`http://localhost:8000/users/profile/${id}`, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                },
                credentials : "include",
                redirect : 'follow'
            })
            if(!res.ok){
                alert("something went wrong")
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

       if(id){
        fetchUser()
       }

    }, [id])

    const navigate = useNavigate()


    if (!user) {
        return (
            <div className="text-center mt-10 text-lg text-gray-600">
            Loading user data...
            </div>
        );
    }

  return (
    <div className='bg-white'>
      <HeaderUser/>
        <div className='text-center'>
            <button className=' block ml-150 px-4 py-1 bg-blue-600 rounded-lg text-white font-semibold cursor-pointer hover:underline' onClick={()=>(navigate(`/users/edit/${id}`, {state : {ename : user.name, eemail : user.email}}))}>Edit Profile</button>
            <div className=' mt-5 flex justify-center items-center'>
                <div className='h-[150px] w-[150px] rounded-full'>
                    <img src={`http://localhost:8000/images/${user.profilePic}`} className='h-full w-full object-cover border-1 border-gray-300 rounded-full'/>
                </div>
            </div>
                <p className='text-[45px] text-blue-950 font-extrabold mb-1'>{user.name}</p>
                <p className='text-[20px] font-medium text-blue-950'>{user.email}</p>
                <div className='px-20'>
                    <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                        <div className=' text-[25px] font-bold text-blue-950 shadow-2xl p-2 hover:bg-blue-50 hover:underline cursor-pointer'><Link to="/users/program">Enrolled Programs</Link></div>
                        <div className='text-[20px] font-medium text-blue-950 shadow-2xl p-2'>{user.enrolledPrograms?.length ?? 0}</div>
                    </div>
                    <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                        <div className=' text-[25px] font-bold text-blue-950 shadow-2xl p-2  cursor-pointer hover:underline hover:bg-blue-50'><Link to='/users/tasks'>Attempted Tasks</Link></div>
                        <div className='text-[20px] font-medium text-blue-950 shadow-2xl p-2'>5</div>
                    </div>
                    <div className='grid grid-cols-[48%_48%] gap-[4%] mt-10'>
                        <div className=' text-[25px] font-bold text-blue-950 shadow-2xl p-2 cursor-pointer hover:underline hover:bg-blue-50'><Link to="/users/wallet">Wallet Balance</Link></div>
                        <div className='text-[20px] font-medium text-blue-950 shadow-2xl p-2'>Rs. {user.walletBalance}</div>
                    </div>
                </div>
        </div>

        
        
      
    </div>
  )
}

export default UserProilePage
