import React from 'react'
import HeaderUser from '../components/HeaderUser'
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'

function ProgressTracker() {



  const COLORS = ["#4ade80", "#60a5fa", "#f87171"]

  const [approved, setApproved] = useState(0)
  const [rejected, setRejected] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [pending, setPending] = useState(0)
  const [score, setScore] = useState(0)


  useEffect(()=>{
    const fetchPending = async()=>{
      try{
        let p_res = await fetch(`http://localhost:8000/api/submissions/user/pending`, {
          method: "GET",
          credentials:"include"
        })
        if(!p_res.ok){
          toast.error("something went wrong")
        }
        else{
          let data = await p_res.json()
          setPending(data.submissions.length)
        }
      }catch(err){
        console.log(err)
      }
    }



    const fetchApproved = async()=>{
      try{
        let a_res = await fetch(`http://localhost:8000/api/submissions/user/approved`, {
          method: "GET",
          credentials:"include"
        })
        if(!a_res.ok){
          toast.error("something went wrong")
        }
        else{
          let data = await a_res.json()
          setApproved(data.submissions.length)
        }
      }catch(err){
        console.log(err)
      }
    }




    const fetchRejected = async()=>{
      try{
        let r_res = await fetch(`http://localhost:8000/api/submissions/user/rejected`, {
          method: "GET",
          credentials:"include"
        })
        if(!r_res.ok){
          toast.error("something went wrong")
        }
        else{
          let data = await r_res.json()
          setRejected(data.submissions.length)
        }
      }catch(err){
        console.log(err)
      }
    }


     fetchPending()
      fetchApproved()
      fetchRejected()

  }, [])

  useEffect(()=>{
    setCompleted(pending + approved + rejected)

      const reviewedCount = approved + rejected
      const calculatedScore =
        reviewedCount === 0
          ? 0
          : ((approved / reviewedCount) * 100).toFixed(2)


      setScore(calculatedScore)
  }, [approved, rejected, pending])


     const pieData = [
        { name: "Approved", value: approved },
        { name: "Pending", value: pending },
        { name: "Rejected", value: rejected },
      ]


      const barData = [
          { name: "Approved", count: approved },
          { name: "Pending", count: pending },
          { name: "Rejected", count: rejected },
        ]


  return (
    <div>
      <HeaderUser/>
      <div>
        <p className='block text-center text-[40px] text-blue-950 font-extrabold mt-10'>Progress Tracker</p>
        <div className='px-20 mt-10'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          

          <div className="bg-white shadow-2xl p-4">
            <h2 className="text-xl text-center font-semibold mb-4 text-blue-950">Task Summary</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          
          <div className="bg-white shadow-2xl  p-4">
            <h2 className="text-xl text-center font-semibold mb-4 text-blue-950">Task Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score */}
        <div className="mt-10 text-center">
          <p className="text-2xl font-medium text-gray-700">
            <strong>Score:</strong>{" "}
            <span className="text-green-600 text-3xl font-bold">{score}%</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            (Calculated as: [Approved / (Total Submissions - Pending)])
          </p>
        </div>
      </div>
        </div>
      </div>

  )
}

export default ProgressTracker
