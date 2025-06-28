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

    enrolledPrograms : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "program"
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
    },
    profilePic : {
        type : String,
        default : "defaultProfilePic.jpg"
    },
    dob : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("user", userSchema)