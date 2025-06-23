const mongoose = require("mongoose")

let dbConnection = mongoose.connect(process.env.MONGODB_URI)
                    .then(()=>{
                        console.log("connected")
                    })
                    .catch((err)=>{
                        console.log(err.message)
                    })
    
module.exports = dbConnection