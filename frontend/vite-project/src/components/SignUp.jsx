import React from "react"



function SignUp() {
  return (
    <div className='mt-2 py-4 px-6'>
      <form>
        <div className='mb-5' >
            <label className='text-blue-950 font-medium block text-left'>Name</label>
            <input type='text' name='name' required placeholder='Enter Name' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg '/>
        </div>
        <div className='mb-5' >
            <label className='text-blue-950 font-medium block text-left'>Email</label>
            <input type='text' name='email' required placeholder='Enter Email' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg '/>
        </div>
        <div className='mb-5'>
            <label className='text-blue-950 font-medium block text-left'>Password</label>
            <input type='password' name='password' required placeholder='Enter Password' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg '/>
        </div>
        <input type='submit' value={"Sign Up"} className='w-full bg-blue-600 text-white p-2 rounded-lg cursor-pointer font-bold text-[20px] mb-5 hover:underline'/>
    
      </form>
    </div>
  )
}

export default SignUp
