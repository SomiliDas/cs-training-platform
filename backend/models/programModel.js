const mongoose = require("mongoose")

const programSchema = mongoose.Schema({
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
    ],
    programPic : {
        type: String,
        default : ""
    }

})

module.exports = mongoose.model("program", programSchema)