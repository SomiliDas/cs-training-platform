const express = require("express")
const router = express.Router()


const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")

const {getPrograms, getProgramById, createProgram, updateProgram, deleteProgram} = require("../controllers/programController")


router.get("/getPrograms", isLoggedIn, getPrograms)

router.get("/:programId", isLoggedIn, getProgramById)





router.post("/create", isLoggedIn, isAdmin, createProgram)

router.put("/update/:programId" , isLoggedIn, isAdmin, updateProgram)

router.delete("/delete/:programId", isLoggedIn, isAdmin, deleteProgram)




module.exports = router