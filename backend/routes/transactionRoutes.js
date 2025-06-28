const express = require("express")
const router = express.Router()


const isLoggedIn = require("../middlewares/isLoggedIn")



const{topUp, getBalance, deductMoney, transactionHistory, basePay } = require("../controllers/transactionController")

router.post("/basepay", isLoggedIn, basePay)

router.post("/topup", isLoggedIn, topUp)

router.get("/balance", isLoggedIn, getBalance)

router.post("/attempt-task/:taskId", isLoggedIn, deductMoney)

router.get("/history", isLoggedIn, transactionHistory)


module.exports = router