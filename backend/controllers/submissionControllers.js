const { populate } = require("dotenv")
const submissionModel = require("../models/submissionModel")



const submitted = async(req, res)=>{
    try{
        const studentId = req.user.userId
        const taskId = req.params.taskId
        const exist = await submissionModel.findOne({student : studentId, task : taskId})
        if(exist){
            return res.status(400).json({message : "already exists"})
        }
        const submission = await submissionModel.create({
            student : studentId,
            task : taskId
        })
        return res.status(200).json({submission})
    }catch(err){
        return res.status(500).json({message : err.message})
    }

}


const viewPending = async(req, res)=>{
    try{
        const submissions = await submissionModel.find({status : "pending"}).populate("student", "name email _id").populate({path : "task", select : "title program _id", populate : {path : "program", select : "title"}})
        return res.status(200).json({submissions})
        
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}



const viewPendingUsers = async(req, res)=>{
    try{
        const submissions = await submissionModel.find({student : req.user.userId ,status : "pending"}).populate("student", "name email _id").populate({path : "task", select : "title program _id", populate : {path : "program", select : "title"}})
        return res.status(200).json({submissions})
        
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

const viewApproved = async(req, res)=>{
    try{
        const submissions = await submissionModel.find({student : req.user.userId, status : "approved"}).populate("student", "name email _id").populate({path : "task", select : "title program _id", populate : {path : "program", select : "title"}})
        return res.status(200).json({submissions})
        
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

const viewRejected = async(req, res)=>{
    try{
        const submissions = await submissionModel.find({student : req.user.userId, status : "rejected"}).populate("student", "name email _id").populate({path : "task", select : "title program _id", populate : {path : "program", select : "title"}})
        return res.status(200).json({submissions})
        
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}




const approval = async (req, res)=>{
    try{
        const {studentId, taskId} = req.params
        const submission = await submissionModel.findOneAndUpdate({student : studentId, task : taskId}, {$set : {status : "approved"}}, {new : true})
        res.status(200).json({submission})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


const rejection = async(req, res)=>{
    try{
        const {studentId, taskId} = req.params
        const submission = await submissionModel.findOneAndUpdate({student : studentId, task : taskId}, {$set : {status : "rejected"}}, {new: true})
        return res.status(200).json({submission})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

module.exports = {submitted, viewPending, approval, rejection, viewApproved, viewRejected, viewPendingUsers}