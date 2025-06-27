const taskModel = require("../models/taskModel")
const programModel = require("../models/programModel")

const getTasks = async(req, res)=>{
    try{
        let programId = req.params.programId
        let program = await programModel.findOne({_id : programId}).populate("tasks")
        if(!program){
            return res.status(404).json({message : "program not found"})
        }
        else{
            let tasks = program.tasks
            return res.status(200).json({tasks})
        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


const getTask = async(req, res)=>{
    try{
        let taskId = req.params.taskId
        let task = await taskModel.findOne({_id : taskId})
        if(!task){
            return res.status(404).json({message : "task not found"})
        }
        else{
            return res.status(200).json({task})
        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

const createTask = async(req, res)=>{
    try{
        let programId = req.params.programId
        let program = await programModel.findOne({_id : programId})
        if(!program){
            return res.status(404).json({message : "program not found"})
        }
        else{
            let {title, description, cost} = req.body
            let task = await taskModel.create({
                title,
                description,
                cost
            })
            task.program = program._id
            await task.save()
            program.tasks.push(task._id)
            await program.save()
            return res.status(201).json({task})
        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


const updateTask = async (req, res)=>{
    try{

        let taskId = req.params.taskId
        let {title, description, cost} = req.body
        let updatedTask = await taskModel.findOneAndUpdate({_id : taskId}, {$set : {title, description, cost}}, {new : true})
        if(!updatedTask){
            return res.status(404).json({message : "task not found"})
        }
        else{
            return res.status(200).json({updatedTask})
        }

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


const deleteTask = async(req, res)=>{
    try{
        let taskId = req.params.taskId
        let task = await taskModel.findOneAndDelete({_id : taskId})
        if(!task){
            return res.status(404).json({message : "task not found"})
        }
        else{
            let program = await programModel.findOne({_id : task.program})
            program.tasks.pull(task._id)
            await program.save()
            return res.status(200).json({message : "deleted succesfully"})
        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

const getAllTasks = async(req, res)=>{
    try{
        let tasks = await taskModel.find().populate({path: 'program',
        select: 'title'})
        if(!tasks){
            return res.status(404).json({message : "no tasks found"})
        }
        else{

            return res.status(200).json({tasks})

        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}




module.exports = {getTasks, getTask, createTask, updateTask, deleteTask, getAllTasks}