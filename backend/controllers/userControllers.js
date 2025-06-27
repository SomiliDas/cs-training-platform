const userModel = require("../models/userModel")
const programModel = require("../models/programModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const tokenGenerator = require("../utils/jwtTokenGenerator")
const taskModel = require("../models/taskModel")
const progressModel = require("../models/progressModel")

const registerUser = async (req, res)=>{
    let {name, email, password} = req.body
    let user = await userModel.findOne({email})
    if(user){
        return res.status(400).redirect("/users/login")
    }
    else{
        try{
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(password, salt, async (err, hash)=>{
                    user = await userModel.create({
                                name,
                                email,
                                password : hash
                            })
                    if(req.body.role){
                        user.role = req.body.role
                        await user.save()
                    }
                    let token = tokenGenerator(user)
                    res.cookie("token", token)
                    res.status(201).json({userId : user._id})
                })
            })
        } catch(err){
            res.status(500).json({message : err.message})
        }
    }

}


const loginUser = async(req, res)=>{
    if(req.cookies.token && req.cookies.token !== ""){
        let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
        let user = await userModel.findOne({email : data.email})
        if(user){
            return res.json({userId : user._id})
        }
    }
    else{
        try{

            let {email, password} = req.body
            let user = await userModel.findOne({email})
            if(!user){
                res.status(400).json({message : "something went wrong"})
            }
            else{
                let pass = await bcrypt.compare(password, user.password)
                if(pass){
                    let token = tokenGenerator(user)
                    res.cookie("token", token)
                    return res.status(200).json({userId : user._id, role : user.role})
                }
                else{
                    return res.status(400).json({message : "something went wrong"})
                }
            }

        }catch(err){
            res.status(500).json({message : err.message})
        }
    }
}



const getUserProfile = async (req, res)=>{
    let id = req.params.id
    let user = await userModel.findOne({_id : id}).select("-password")
    if(!user){
        return res.status(400).json( {message : "user not found"})
    }
    else{
        return res.status(200).json({user})
    }
}


const updateProfile = (req, res)=>{
    try{
        let id = req.params.id
        let {name, email, password} = req.body
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async(err, hash)=>{
                let user = await userModel.findOneAndUpdate({_id : id}, {$set : {name, email,  password: hash}}, { new: true })
                if(req.file){
                    user.profilePic = req.file.filename 
                    await user.save()
                }
                res.status(200).json({message: "updated"})
            })
        })
    }catch(err){
        res.status(500).json({message : err.message})
    }
}



const enrollInProgram = async (req, res)=>{
    try{
        let programId = req.params.programId
        let studentId = req.user.userId
        let user = await userModel.findOne({_id : studentId})
        let program = await programModel.findOne({_id : programId})
        if(user && program){
            if (user.enrolledPrograms.includes(program._id)) {
                return res.status(400).json({message : "Already enrolled in this program"});
            }
            user.enrolledPrograms.push(program._id)
            await user.save()

            const tasks = await taskModel.find({program : programId})

            for(let task of tasks){
                const exists = await progressModel.findOne({student : studentId, task : task._id})
                if(!exists){
                    await progressModel.create({
                        student : studentId,
                        task : task._id,
                        status : "In Progress"
                    })
                }
            }

            res.status(200).json({message : "progress model created"})
        }
        else{
            return res.status(404).json({ message: "User or Program not found" });
        }
    } catch(err){
        res.status(500).json({message : err.message})
    }

}


const walletBalance = async(req, res)=>{
    try{
        let id = req.params.id
        let user = await userModel.findOne({_id : id})
        if(!user){
            return res.status(404).json({message : "user not found"})
        }
        else{
            return res.status(200).json({walletBalance : user.walletBalance})
        }
    }catch(err){
        res.status(500).json({message : err.message})
    }
}


const addToWallet = async (req, res)=>{
    try{
        let amount = Number(req.body.amount)
        let id = req.user.userId
        let user = await userModel.findOne({_id : id})
        if(!user){
            res.status(404).json({message : "user not found"})
        }
        else{
            user.walletBalance += amount
            await user.save()
            res.status(200).redirect(`/users/profile/${user._id}`)
        }
    }catch(err){
        res.status(500).json({message : err.message})
    }
}



const getAllUsers = async(req, res)=>{
    try{
        let users = await userModel.find({role : "student"}).select("-password")
        res.status(200).json({users})
    }catch(err){
        res.status(500).json({message : err.message})
    }
}



const deleteUser = async (req, res)=>{
    try{
        let id = req.params.id
        let user = await userModel.findOneAndDelete({_id : id})
        if(!user){
            return res.status(404).json({message : "user not found"})
        }
        else{
            res.status(200).json({message : "deletion succesfull"})
        }
    }catch(err){
        res.status(500).json({message : err.message})
    }
}


const logout = (req, res)=>{
    res.clearCookie("token")
    res.status(200).json({message : "logout succesful"})
}


const getEnrolledPrograms = async(req, res)=>{
    try{
        let userId = req.user.userId
        let user = await userModel.findOne({_id : userId}).populate("enrolledPrograms")
        if(!user){
            return res.status(404).json({message :"user not found"})
        }
        let programs = user.enrolledPrograms
        return res.status(200).json({programs})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


const getId = async(req, res)=>{
    const userId = req.user.userId
    return res.status(200).json({userId})
}


module.exports = {registerUser, loginUser, getUserProfile, updateProfile, enrollInProgram, walletBalance, addToWallet, getAllUsers, deleteUser, logout, getEnrolledPrograms, getId}