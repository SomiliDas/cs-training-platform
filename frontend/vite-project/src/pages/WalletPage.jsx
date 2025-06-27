import React from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderUser from '../components/HeaderUser'

export default function WalletPage() {

    const navigate = useNavigate()

  return (
    <div className='bg-white'>
      <HeaderUser/>

            <div>
                <p className='block text-center text-[40px] font-extrabold text-blue-950 my-10 '>Wallet Overview</p>
                <div className='flex justify-center items-center'>
                        <div className=" mt-10 p-10 shadow-2xl">

                            <div className="flex justify-between items-center mb-6">
                                <div className="text-[20px] text-blue-950 font-bold">
                                Current Balance: <span className="font-bold text-green-600">Rs. 1500.00</span>
                                </div>
                                <input type='submit' value={"TopUp"} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:underline" onClick={()=>(navigate("/users/topup"))}/>
                            </div>

                    
                            <h3 className="text-xl font-semibold text-blue-950 mb-3">Recent Transactions</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                <thead className="bg-gray-200 text-gray-700 text-left">
                                    <tr>
                                    <th className="py-3 px-4 border-b">Reason</th>
                                    <th className="py-3 px-4 border-b">Type</th>
                                    <th className="py-3 px-4 border-b">Amount</th>
                                    <th className="py-3 px-4 border-b">Balance After</th>
                                    </tr>
                                </thead>
                                <tbody className="text-blue-950">
                                    <tr>
                                    <td className="py-2 px-4 border-b">Top Up</td>
                                    <td className="py-2 px-4 border-b ">Credit</td>
                                    <td className="py-2 px-4 border-b">₹1000</td>
                                    <td className="py-2 px-4 border-b">₹1500</td>
                                    </tr>
                                    <tr>
                                    <td className="py-2 px-4 border-b">Task: Flight Basics</td>
                                    <td className="py-2 px-4 border-b ">Debit</td>
                                    <td className="py-2 px-4 border-b">₹500</td>
                                    <td className="py-2 px-4 border-b">₹500</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>

                        </div>
                </div>
            </div>
      </div>
   
  )
}
