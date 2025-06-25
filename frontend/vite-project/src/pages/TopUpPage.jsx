import React from 'react'
import Header from '../components/Header'

export default function TopUpPage() {
  return (
    <div className='bg-white px-10'>
      <Header/>
      <div>
        <p className='block text-center text-[40px] font-extrabold text-blue-950 my-10'>Top - Up Wallet </p>
        <div className='flex justify-center items-center'>
          <div className="w-[35%] mt-18 p-10 bg-white shadow-2xl">

            <div className="text-lg text-center mb-6">
              <span className='text-[20px] text-blue-950 font-bold'>Current Balance: </span>
              <span className="text-blue-600 font-bold">₹1500.00</span>
            </div>

            <form>
              <label className="block mb-2 text-blue-950 font-bold">
                Enter Amount to Top Up:
              </label>
              <input
                type="number" name='amount' placeholder='Enter Amount' className="w-full p-3 mb-4 rounded-lg border border-gray-300 bg-white"/>

              <input type="submit" value={"Pay"} className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:underline text-[20px]"/>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
