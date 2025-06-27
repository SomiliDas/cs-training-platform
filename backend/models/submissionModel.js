const mongoose = require("mongoose")

const submissionSchema = mongoose.Schema({
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    task : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "task",
        required : true
    },
    status : {
        type : String,
        enum : ["pending", "approved", "rejected"],
        default : "pending"
    }
})

module.exports = mongoose.model("submission", submissionSchema)