
const programModel = require("../models/programModel")

const getPrograms = async(req, res)=>{
    try{
        let programs = await programModel.find()
        if(programs.length === 0){
            return res.status(404).json({message : "no programs found"})
        } 
        else{
            return res.status(200).json({programs})
        }
    } catch(err){
        return res.status(500).json({message : err.message})
    }
}


const getProgramById = async(req, res)=>{
    try{
        let programId = req.params.programId
        let program = await programModel.findOne({_id : programId})
        if(!program){
            return res.status(404).json({message : "program not found"})
        }
        else{
            return res.status(200).json({program})
        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }

}


const createProgram = async (req, res)=>{
    try{
        let {title, description} = req.body
        let program = await programModel.create({
            title,
            description
        })
        if(req.file){
            program.programPic = req.file.filename
            await program.save()
        }
        return res.status(201).redirect("/programs/getPrograms")


    }catch(err){
        return res.status(500).json({message : err.message})
    }
}



const updateProgram = async(req, res)=>{
    try{
        let programId = req.params.programId
        let {title, description} = req.body
        let program = await programModel.findOneAndUpdate({_id : programId}, {$set : {title, description}}, { new: true })
        if(!program){
            return res.status(404).json({message : "program not found"})
        }
        if(req.file){
            program.programPic = req.file.filename
            await program.save()
        }
        return res.status(200).redirect("/programs/getPrograms")
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


const deleteProgram = async(req, res)=>{
    try{
        let programId = req.params.programId
        let program = await programModel.findOneAndDelete({_id : programId})
        if(!program){
            return res.status(404).json({message : "program not found"})
        }
        return res.status(200).redirect("/programs/getPrograms")
    }catch(err){
        return res.status(500).json({message : err.message})
    }

}



module.exports = {getPrograms, getProgramById, createProgram, updateProgram, deleteProgram}