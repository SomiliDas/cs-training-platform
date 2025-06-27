const express = require("express")
const router = express.Router()
const upload = require("../config/multer")


const {registerUser, loginUser, getUserProfile, updateProfile, enrollInProgram, walletBalance, addToWallet, logout, getAllUsers, deleteUser, getEnrolledPrograms, getId} = require("../controllers/userControllers")


const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")




router.post("/register",  registerUser)

router.post("/login", loginUser)

router.get("/profile/:id", isLoggedIn, getUserProfile)

router.put("/profile/:id", isLoggedIn, upload.single("profilePic"), updateProfile)

router.post("/enroll/:programId", isLoggedIn, enrollInProgram)

router.get("/wallet/:id", isLoggedIn, walletBalance )

router.post("/wallet/add", isLoggedIn, addToWallet)

router.get("/logout",isLoggedIn, logout)

router.get("/enrolledPrograms",isLoggedIn, getEnrolledPrograms)

router.get("/getId", isLoggedIn, getId)



router.get("/admins/getUsers", isLoggedIn, isAdmin, getAllUsers)
router.delete("/admins/users/:id", isLoggedIn, isAdmin, deleteUser)

module.exports = router