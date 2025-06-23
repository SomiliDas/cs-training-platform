const jwt = require("jsonwebtoken")

const tokenGenerator = (user)=>{
    return jwt.sign({email : user.email, userId : user._id, role : user.role}, process.env.JWT_SECRET)
}

module.exports = tokenGenerator