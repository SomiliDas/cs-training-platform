import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import HeaderAdmin from '../components/HeaderAdmin';
import { toast } from 'react-toastify';

const COLORS = ["#00C49F", "#FFBB28"];

export default function StudentProgressPage() {

    const[students, setStudents] = useState([])
    const[progressData, setProgressData] = useState([])

    useEffect(()=>{
        const fetchProgress = async ()=>{
            try{
                let res = await fetch("/api/progress/admin/view", {
                    method:"GET",
                    credentials : "include"
                })
                if(!res.ok){
                    toast.error("something went wrong")
                }
                else{
                    let data = await res.json()
                    setStudents(data.summary)
                    const completed = data.summary.filter(s=>s.status === "Completed").length
                    const inProgress = data.summary.filter(s=>s.status === "In Progress").length
                    setProgressData([
                        {name : "Completed", value : completed},
                        {name : "In Progress", value : inProgress}
                    ])
                }
            }catch(err){
                console.log(err)
            }
        }

        fetchProgress()

    }, [])





  return (
    <div className='bg-white'>
      <HeaderAdmin/>
      <div>
        <div className="min-h-screen p-6">
            <h1 className="text-[45px] font-bold text-center mb-8 text-blue-950">Student Progress DashBoard</h1>

            <div className="grid grid-cols-[66%_31%] gap-[3%] mb-10 px-20">
                <div className="bg-white p-6 shadow-2xl">
                    <h2 className="text-xl font-semibold mb-4 text-blue-950">Overall Student Progress</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={students}>
                            <XAxis dataKey="studentName" />
                            <YAxis dataKey="progress"/>
                            <Bar dataKey="progress" fill="blue" />
                            <Tooltip/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 shadow-2xl">
                <h2 className="text-xl font-semibold mb-4 text-blue-950">Progress Distribution</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie data={progressData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                            {progressData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
    
                </div>
            </div>

        <div className="bg-white shadow-2xl p-6 px-20">
            <h2 className="text-[20px] font-semibold mb-4 text-blue-950">Student Progress Table</h2>
            <div className="overflow-x-auto">
            <table className="min-w-full text-left text-md">
                <thead className="bg-blue-50  text-blue-950">
                <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Progress</th>
                    <th className="p-3">Status</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={index} className="border-t hover:bg-blue-50">
                    <td className="p-3">{student.studentName}</td>
                    <td className="p-3">{student.programName}</td>
                    <td className="p-3">{student.progress}%</td>
                    <td className={`p-3 font-semibold ${student.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                        {student.status}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}
