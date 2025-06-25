import React from 'react'
import Header from '../components/Header'
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const students = [
  { name: "John Doe", course: "Flight Basics", progress: 85, status: "In Progress" },
  { name: "Jane Smith", course: "Advanced Navigation", progress: 60, status: "In Progress" },
  { name: "Alan Turing", course: "Meteorology", progress: 100, status: "Completed" },
  { name: "Grace Hopper", course: "Air Traffic Communication", progress: 40, status: "In Progress" },
];

const progressData = [
  { name: "Completed", value: 1 },
  { name: "In Progress", value: 3 },
];

const COLORS = ["#00C49F", "#FFBB28"];

export default function StudentProgressPage() {
  return (
    <div className='bg-white px-10'>
      <Header/>
      <div>
        <div className="min-h-screen p-6">
            <h1 className="text-[45px] font-bold text-center mb-8 text-blue-950">Student Progress DashBoard</h1>

            <div className="grid grid-cols-[66%_31%] gap-[3%] mb-10">
                <div className="bg-white p-6 shadow-2xl">
                    <h2 className="text-xl font-semibold mb-4 text-blue-950">Overall Student Progress</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={students}>
                            <XAxis dataKey="name" />
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

        <div className="bg-white shadow-2xl p-6">
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
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.course}</td>
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
