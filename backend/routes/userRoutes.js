const express = require("express")
const router = express.Router()



const {registerUser} = require("../controllers/userControllers")
const {loginUser} = require("../controllers/userControllers")
const {getUserProfile} = require("../controllers/userControllers")
const {updateProfile} = require("../controllers/userControllers")
const {enrollInProgram} = require("../controllers/userControllers")
const {walletBalance} = require("../controllers/userControllers")
const {addToWallet} = require("../controllers/userControllers")


const {getAllUsers} = require("../controllers/userControllers")
const {deleteUser} = require("../controllers/userControllers")


const isLoggedIn = require("../middlewares/isLoggedIn")
const isAdmin = require("../middlewares/isAdmin")




router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/profile/:id", isLoggedIn, getUserProfile)

router.put("/profile/:id", isLoggedIn, updateProfile)

router.post("/enroll/:programId", isLoggedIn, enrollInProgram)

router.get("/wallet/:id", isLoggedIn, walletBalance )

router.post("/wallet/add", isLoggedIn, addToWallet)




router.get("/admins/users", isLoggedIn, isAdmin, getAllUsers)
router.delete("/admins/users/:id", isLoggedIn, isAdmin, deleteUser)

module.exports = router