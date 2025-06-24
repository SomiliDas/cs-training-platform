const mongoose = require("mongoose")

const transactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    amount: {
        type: Number,
        required: true
    },
    balanceAfter: {
        type: Number
    },
    reason: {
        type: String
    },
    transactionType: {
        type: String,
        enum: ["credit", "debit"],
        required: true
    },
})

module.exports = mongoose.model("transaction", transactionSchema)