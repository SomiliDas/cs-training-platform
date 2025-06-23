const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")

const dbConnection = require("./config/dbConnection")
dbConnection()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, "public")))

const index = require("./routes/index")
const userRoutes = require("./routes/userRoutes")
const programRoutes = require("./routes/programsRoutes")
const taskRoutes = require("./routes/taskRoutes")
const transactionRoutes = require("./routes/transactionRoutes")


const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
app.use(cookieParser())



app.use("/", index)

app.use("/users", userRoutes)
app.use("/programs", programRoutes)
app.use("/tasks", taskRoutes)
app.use("/transactions", transactionRoutes)

app.listen(process.env.PORT)