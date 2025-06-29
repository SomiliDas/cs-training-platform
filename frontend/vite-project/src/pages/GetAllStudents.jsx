
import HeaderAdmin from '../components/HeaderAdmin'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'


function GetAllStudents() {
    
    let[users, setUsers] = useState([])
    useEffect(()=>{
        const getAllUsers = async()=>{
            try{
                const res = await fetch("http://localhost:8000/users/admins/getUsers", {
                    method:"GET",
                    headers :{
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    redirect : "follow"
                })
                if(!res.ok){
                    toast.error("something went wrong")
                }
                else{
                    let data = await res.json()
                    setUsers(data.users)

                }

            }catch(err){
                console.log(err)
            }
        }

        getAllUsers()

    },[])

    const handleDelete = async(id)=>{
        let res = await fetch(`http://localhost:8000/users/admins/users/${id}`,{
            method : "DELETE",
            credentials : "include"
            
        })
        if(!res.ok){
            toast.error("deletion failed")
        }
        else{
           let prevUsers = [...users]
           let newUsers = prevUsers.filter((user)=>(user._id !== id))
           setUsers(newUsers)
           toast.success("deletion successful")
           
        }
    }


  return (
    <div>
      <HeaderAdmin/>
      <div className='bg-white px-20 pb-10'>
    <div className='px-20 pb-10'>
      <h2 className='text-[40px] font-extrabold text-blue-950 my-6 block text-center'>All Users</h2>

      
      <div className='max-h-[70vh] overflow-y-auto shadow-2xl mt-10 border border-gray-300'>
        <table className='w-full table-auto text-left bg-white'>
          <thead className='bg-blue-100 text-[20px] sticky top-0 z-10'>
            <tr>
              <th className='px-6 py-3 text-blue-950 font-bold'>Name</th>
              <th className='px-6 py-3 text-blue-950 font-bold'>Email</th>
              <th className='px-6 py-3 text-blue-950 font-bold'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3" className='text-center py-6 text-gray-500'>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index} className='hover:bg-blue-50'>
                  <td className='px-6 py-4 border-t'>{user.name}</td>
                  <td className='px-6 py-4 border-t'>{user.email}</td>
                  <td className='px-6 py-4 border-t'>
                    <button
                      className='bg-red-500 hover:underline cursor-pointer text-white px-4 py-1 rounded'
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
      </div>
    </div>
  )
}

export default GetAllStudents
