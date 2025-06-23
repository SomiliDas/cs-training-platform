const jwt = require("jsonwebtoken")


const isLoggedIn = (req, res, next)=>{
    if(!req.cookies.token || req.cookies.token == ""){
        return res.status(401).redirect("/users/login")
    }
    else{
        try{
            let data = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
            req.user = data
            next()
        } catch(err){
            return res.status(401).send(err.message)
        }
    }
}

module.exports = isLoggedIn