import React from 'react'
import HeaderUser from '../components/HeaderUser'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function TopUpPage() {

   const[amount, setAmount] = useState("")
    const[balance, setBalance] = useState(0)
    // const[userId, setUserId] = useState('')

    useEffect(()=>{
        const fetchBalance = async()=>{
            try{
                const res = await fetch("http://localhost:8000/api/transactions/balance", {
                    method : "GET",
                    credentials : "include"
                })
                if(!res.ok){
                   toast.error("failed to fetch balance")
                }
                else{
                    const data = await res.json()
                    setBalance(data.balance)
                    // setUserId(data.userId)
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchBalance()
     },[])

    const payHandler = async(e, amt)=>{
      e.preventDefault()
      try{
          let res
          if(balance === 0){
                  res = await fetch("http://localhost:8000/api/transactions/basepay",{
                  method:"POST",
                  headers:{
                    "Content-Type" :"application/json"
                  },
                  body: JSON.stringify({amount :amt}),
                  credentials :"include"
                })
          }
          else{
            res = await fetch("http://localhost:8000/api/transactions/topup",{
                  method:"POST",
                  headers:{
                    "Content-Type" :"application/json"
                  },
                  body: JSON.stringify({amount}),
                  credentials :"include"
                })
          }
          
        if(!res.ok){
          toast.error("Insufficient amount. Payment Failed")
          return
        }
        else{
          let data = await res.json()
          setBalance(data.balance)
          setAmount("")
          toast.success("Payment Successfull")
        }
      }catch(err){
        console.log(err)
      }
    }




  return (
    <div className='bg-white'>
      <HeaderUser/>
      <div>
        <p className='block text-center text-[40px] font-extrabold text-blue-950 my-10'>Top - Up Wallet </p>
        <div className='flex justify-center items-center'>
          <div className="w-[35%] mt-10 p-10 bg-white shadow-2xl">

            <div className="text-lg text-center mb-6">
              <span className='text-[20px] text-blue-950 font-bold'>Current Balance: </span>
              <span className="text-blue-600 font-bold">Rs. {balance}</span>
            </div>

            <form onSubmit={(e)=>(payHandler(e, Number(amount)))}>
              <label className="block mb-2 text-blue-950 font-bold">
                Enter Amount to Top Up:
              </label>
              <input
                type="number" name='amount' required value={amount} placeholder='Enter Amount' className="w-full p-3 mb-4 rounded-lg border border-gray-300 bg-white" onChange={(e)=>(setAmount(e.target.value))}/>

              <input type="submit" value={"Pay"} className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:underline text-[20px]"/>
            
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
