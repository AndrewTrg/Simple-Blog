const User = require("../models/User");
module.exports = async (req, res, next) => {
    console.log("Req session", req.session)
    if (req.session.userId) {
        const user = await User.findById(req.session.userId)
        if (user) {
            console.log(user);
            res.redirect("/")
        } else {
            console.log("The user doesn't exist")
            next()
        }
    } else {
        console.log("User is not found")
        res.redirect("/auth/login")
    }
}



;

















