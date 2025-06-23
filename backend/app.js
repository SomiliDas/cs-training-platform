const express = require("express")
const app = express()
require("dotenv").config()

const dbConnection = require("./config/dbConnection")


app.get("/", (req, res)=>{
    res.send("hello")
})

app.listen(process.env.PORT)