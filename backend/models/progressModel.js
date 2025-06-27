const mongoose = require("mongoose")

const progressSchema = mongoose.Schema({
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
    progress : {
        type : Number,
        default : 0,
        required : true
    },
    status : {
        type : String,
        enum : ["In Progress", "Completed"]
    }
})

module.exports = mongoose.model("progress", progressSchema)