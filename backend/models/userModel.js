const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true
    },

    enrolledCourses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "course"
        }
    ],

    role : {
        type : String,
        default : "student",
        enum : ["student", "admin"]
    },
    walletBalance : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model("user", userSchema)