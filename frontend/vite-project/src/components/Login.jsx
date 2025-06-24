import React from 'react'

function Login() {
  return (
    <div className='mt-5 py-4 px-6'>
      <form>
        <div className='mb-10' >
            <label className='text-blue-950 font-medium block text-left'>Email</label>
            <input type='text' name='email' required placeholder='Enter Email' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg '/>
        </div>
        <div className='mb-10'>
            <label className='text-blue-950 font-medium block text-left'>Password</label>
            <input type='password' name='password' required placeholder='Enter Password' className='w-full bg-white p-2 border-1 border-gray-300 rounded-lg '/>
        </div>
        <input type='submit' value={"Log In"} className='w-full bg-blue-600 text-white p-2 rounded-lg cursor-pointer font-bold text-[20px] mb-5 hover:underline'/>
        <button className='text-blue-950 font-bold hover:underline cursor-pointer'>Forgot Password</button>
      </form>
    </div>
  )
}

export default Login
