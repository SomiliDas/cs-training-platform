const express = require("express")
const router = express.Router()

const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")


const{submitted, viewPending, approval, rejection, viewApproved, viewRejected} = require("../controllers/submissionControllers")

router.post("/submit/:taskId", isLoggedIn, submitted)

router.get("/pending", isLoggedIn, viewPending)

router.get("/approved", isLoggedIn, viewApproved)

router.get("/rejected", isLoggedIn, viewRejected)

router.put("/approve/:studentId/:taskId", isLoggedIn, isAdmin, approval)

router.put("/reject/:studentId/:taskId", isLoggedIn, isAdmin, rejection)




module.exports = router