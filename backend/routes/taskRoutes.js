const express = require("express")
const router = express.Router()


const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")


const {getTasks, getTask, createTask, updateTask, deleteTask, getAllTasks } = require("../controllers/taskController")

router.get("/allTasks", isLoggedIn, isAdmin, getAllTasks)

router.get("/getTasks/:programId",isLoggedIn, getTasks)

router.get("/:taskId",isLoggedIn, getTask)






router.post("/create/:programId",isLoggedIn, isAdmin, createTask)

router.put("/update/:taskId", isLoggedIn, isAdmin, updateTask)

router.delete("/delete/:taskId", isLoggedIn, isAdmin, deleteTask)



module.exports = router

