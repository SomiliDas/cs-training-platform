const express = require("express")
const router = express.Router()

const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")


const{submitted, viewPending, approval, rejection} = require("../controllers/submissionControllers")

router.post("/submit", isLoggedIn, submitted)

router.get("/pending", isLoggedIn, isAdmin, viewPending)

router.put("/approve/:studentId/:taskId", isLoggedIn, isAdmin, approval)

router.put("/reject/:studentId/:taskId", isLoggedIn, isAdmin, rejection)




module.exports = router