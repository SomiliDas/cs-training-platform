const express = require("express")
const router = express.Router()

const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")


const{submitted, viewPending, approval, rejection, viewApproved, viewRejected, viewPendingUsers} = require("../controllers/submissionControllers")

router.post("/submit/:taskId", isLoggedIn, submitted)

router.get("/pending", isLoggedIn, isAdmin, viewPending)

router.get("/user/pending", isLoggedIn, viewPendingUsers)

router.get("/user/approved", isLoggedIn, viewApproved)

router.get("/user/rejected", isLoggedIn, viewRejected)

router.put("/approve/:studentId/:taskId", isLoggedIn, isAdmin, approval)

router.put("/reject/:studentId/:taskId", isLoggedIn, isAdmin, rejection)




module.exports = router