const express = require("express")
const app = express()
require("dotenv").config()
const path = require("path")


const dbConnection = require("./config/dbConnection")
dbConnection();

const cors = require('cors')
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8000',
  "https://flight-training-platform.onrender.com"
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




app.use("/api/users", userRoutes)
app.use("/api/programs", programRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/progress", progressRoutes)
app.use("/api/submissions", submissionRoutes)

app.use(express.static(path.join(__dirname, "..", "frontend", "vite-project", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "frontend", "vite-project", "dist", "index.html"));
});


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
