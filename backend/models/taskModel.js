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
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "course"
    },
    cost : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model("task" , taskSchema)