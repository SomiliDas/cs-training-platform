const express = require("express")
const router = express.Router()


const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")

const {getPrograms, getProgramById, createProgram, updateProgram, deleteProgram} = require("../controllers/programController")

const upload = require("../config/multer")

router.get("/getPrograms", getPrograms)

router.get("/:programId", isLoggedIn, getProgramById)





router.post("/create", upload.single("programPic"), isLoggedIn, isAdmin, createProgram)

router.put("/update/:programId" , isLoggedIn, isAdmin, upload.single("programPic"), updateProgram)

router.delete("/delete/:programId", isLoggedIn, isAdmin, deleteProgram)




module.exports = router