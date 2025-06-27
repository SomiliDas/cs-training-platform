const express = require("express")
const router = express.Router()


const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")


const {updateProgress, viewProgress} = require("../controllers/progressController")

router.put("/update/:taskId", isLoggedIn, updateProgress)


router.get("/admin/view", isLoggedIn, isAdmin, viewProgress)

module.exports = router