const mongoose = require("mongoose")

const walletSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },

    amount : {
        type : Number,
        required : true
    },

    reason : {
        type : String   // reasons as in "enrolling", "task attempting" etc
    },
    balance : {
        type : Number
    },
    transactionType : {
        type : String,
        enum : ["credit", "debit"],
        required : true
    }
    
})

module.exports = mongoose.model("wallet", walletSchema)