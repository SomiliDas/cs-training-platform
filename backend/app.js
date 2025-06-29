const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")

const dbConnection = require("./config/dbConnection")
const cors = require('cors')
const allowedOrigins = [
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, "public")))

const userRoutes = require("./routes/userRoutes")
const programRoutes = require("./routes/programsRoutes")
const taskRoutes = require("./routes/taskRoutes")
const transactionRoutes = require("./routes/transactionRoutes")
const progressRoutes = require("./routes/progressRoutes")
const submissionRoutes = require("./routes/submissionRoutes")

const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
app.use(cookieParser())




app.use("/users", userRoutes)
app.use("/programs", programRoutes)
app.use("/tasks", taskRoutes)
app.use("/transactions", transactionRoutes)
app.use("/progress", progressRoutes)
app.use("/submissions", submissionRoutes)

app.listen(process.env.PORT || 8000)
