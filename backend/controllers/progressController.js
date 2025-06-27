const progressModel = require("../models/progressModel")
const taskModel = require("../models/taskModel")
const userModel = require("../models/userModel")


const updateProgress = async(req, res)=>{
    try{
        let taskId = req.params.taskId
        let studentId = req.user.userId
        let status = req.body.status
        if (!["In Progress", "Completed"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        let progress_stud = await progressModel.findOneAndUpdate({student : studentId, task : taskId}, {$set : {status}}, {new : true})
        if(!progress_stud){
                progress_stud = await progressModel.create({
                student : studentId,
                task : taskId,
                status
            })
        }
        let progressValue = 0
        if(status === "In Progress"){
            progressValue = 50
        }
        if(status === "Completed"){
            progressValue = 100
        }

        progress_stud.progress = progressValue
        await progress_stud.save()

        res.status(200).json({progress_stud})
    }catch(err){
        res.status(500).json({message : err.message})
    }
}


const viewProgress = async(req, res)=>{
    try{
        const students = await userModel.find({role : "student"}).populate("enrolledPrograms")
        const summary = []
        for(let student of students){
            for(let program of student.enrolledPrograms){
                const tasks = await taskModel.find({program : program._id})
                const taskIds = tasks.map((task)=>(task._id))
                const completions = await progressModel.find({student : student._id, task : { $in: taskIds }})
                const completed = completions.filter(c => c.status === "Completed").length;
                const total = tasks.length;
                summary.push({
                    studentName: student.name,
                    programName: program.title,
                    progress: total === 0 ? 0 : Math.round((completed / total) * 100),
                    status: total > 0 && completed === total ? "Completed" : "In Progress"
                })
            }
            
        }
        
        return res.status(200).json({summary})


    }catch(err){
        return res.status(500).json({message : err.message})
    }
}



module.exports = {updateProgress, viewProgress}