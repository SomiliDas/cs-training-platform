const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    program : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "program"
    },
    cost : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model("task" , taskSchema)