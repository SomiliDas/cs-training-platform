const walletModel = require("../models/walletModel")
const transactionModel = require("../models/transactionModel")
const userModel = require("../models/userModel")
const taskModel = require("../models/taskModel")

const topUp = async(req, res)=>{
    try{
        userId = req.user.userId
        let user = await userModel.findOne({_id : userId})
        let wallet = await walletModel.findOne({user : userId})
        if(!wallet || !user){
            return res.status(404).json({message : "wallet or user not found"})
        }
        else{
            let amount = Number(req.body.amount)
            wallet.balance += amount
            await wallet.save()
            user.walletBalance += amount
            await user.save()

            
            let transaction = await transactionModel.create({
                user : user._id,
                amount : amount,
                balanceAfter : wallet.balance,
                reason : "topup",
                transactionType : "credit"
            })

            return res.status(200).redirect(`/users/profile/${user._id}`)

        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


const getBalance = async(req, res)=>{
    try{
        let userId = req.user.userId
        let wallet = await walletModel.findOne({user : userId})
        if(!wallet){
             wallet = await walletModel.create({ user: userId, balance: 0 })
        }
        
        let balance = wallet.balance
        res.status(200).json({userId, balance})
    
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


const deductMoney = async(req, res)=>{
    try{
        let userId = req.user.userId
        let taskId = req.params.taskId
        let task = await taskModel.findOne({_id : taskId})
        if(!task){
            return res.status(404).json({message : "task not found"})
        }
        let wallet = await walletModel.findOne({user : userId})
        let user = await userModel.findOne({_id : userId})
        if(!wallet || !user){
            return res.status(404).json({message : "wallet or user not found"})
        }
        if(wallet.balance < task.cost){
            return res.status(400).json({message : "insufficient balance"})
        }
        wallet.balance -= task.cost
        await wallet.save()
        user.walletBalance -= task.cost
        await user.save()
        let transaction = await transactionModel.create({
            user : userId,
            amount : task.cost,
            balanceAfter : wallet.balance,
            reason : `${task.title} attempted`,
            transactionType : "debit"
        })

        return res.status(200).redirect("/transactions/balance")
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


const transactionHistory = async(req, res)=>{
    try{
        let userId = req.user.userId
        let transactions = await transactionModel.find({user : userId}).sort({_id :-1})
        return res.status(200).json({transactions})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}





module.exports = {topUp, getBalance, deductMoney, transactionHistory}