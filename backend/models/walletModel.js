const mongoose = require("mongoose")

const walletSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },

    balance : {
        type : Number,
        default : 0
    }
    
})

module.exports = mongoose.model("wallet", walletSchema)