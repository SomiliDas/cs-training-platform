const mongoose = require("mongoose")

const courseSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tasks : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "task"
        }
    ]

})

module.exports = mongoose.model("course", courseSchema)