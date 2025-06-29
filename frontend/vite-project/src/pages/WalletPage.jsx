import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderUser from '../components/HeaderUser'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function WalletPage() {

    const navigate = useNavigate()
    const[balance, setBalance] = useState(0)
    // const[userId, setUserId] = useState('')
    const[transactions, setTransactions] = useState([])

    useEffect(()=>{
        const fetchBalance = async()=>{
            try{
                const res = await fetch("https://flight-training-platform-backend.onrender.com/transactions/balance", {
                    method : "GET",
                    credentials : "include"
                })
                if(!res.ok){
                    toast.error("something went wrong")
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

        const fetchTransHist = async()=>{
            try{
                let res = await fetch("https://flight-training-platform-backend.onrender.com/transactions/history", {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    toast.error("something went wrong")
                }else{
                    let data = await res.json()
                    setTransactions(data.transactions)
                }
            }catch(err){
                console.log(err)
            }
        }

        fetchBalance()
        fetchTransHist()
    },[])

    

  return (
    <div className='bg-white'>
      <HeaderUser/>

            <div>
                <p className='block text-center text-[40px] font-extrabold text-blue-950 my-10 '>Wallet Overview</p>
                <div className='flex justify-center items-center w-full'>
                        <div className=" mt-10 p-10 shadow-2xl w-[50%]">

                            <div className="flex justify-between items-center mb-6">
                                <div className="text-[20px] text-blue-950 font-bold">
                                Current Balance: <span className="font-bold text-green-600">Rs. {balance}</span>
                                </div>
                                <input type='submit' value={"TopUp"} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:underline" onClick={()=>(navigate("/users/topup"))}/>
                            </div>

                    
                            <h3 className="text-xl font-semibold text-blue-950 mb-3">Recent Transactions</h3>
                            <div className="overflow-y-auto h-[200px]">
                                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                <thead className="bg-gray-200 text-gray-700 text-left">
                                    <tr>
                                    <th className="py-3 px-4 border-b">Reason</th>
                                    <th className="py-3 px-4 border-b">Type</th>
                                    <th className="py-3 px-4 border-b">Amount</th>
                                    <th className="py-3 px-4 border-b">Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="text-blue-950">
                                    {
                                        transactions.length === 0 ? <tr><td colSpan={"4"} className="py-2 px-4 border-b">No Transactions</td></tr>
                                                                   :
                                                                   transactions.map((trans)=>(
                                                                        <tr className='hover:bg-blue-50'>
                                                                            <td className="py-2 px-4 border-b">{trans.reason}</td>
                                                                            <td className={`py-2 px-4 border-b border-gray-700 ${trans.transactionType === 'credit' ? 'text-green-500':'text-red-500'}`}>{trans.transactionType}</td>
                                                                            <td className="py-2 px-4 border-b">Rs.{trans.amount}</td>
                                                                            <td className="py-2 px-4 border-b">Rs. {trans.balanceAfter}</td>
                                                                        </tr>
                                                                   ))
                                    }
                                </tbody>
                                </table>
                            </div>

                        </div>
                </div>
            </div>
      </div>
   
  )
}
