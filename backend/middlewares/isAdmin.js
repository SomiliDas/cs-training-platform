

const isAdmin = (req, res, next)=>{
    if(req.user.role == "admin"){
        next()
    }
    else{
        res.status(401).redirect("/users/login")
    }
}

module.exports = isAdmin