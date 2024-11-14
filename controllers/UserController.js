const bcrypt = require("bcrypt")
const User = require("../models/User")
const createUser = (req, res) => {
    res.render("create-user.ejs");

}

const storeUser =  (req, res) => {
    try {
        User.create(req.body)
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
}

const showLoginPage = (req, res) => {
    console.log("Show login page")
    res.render("login.ejs");
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                req.session.userId = user._id
                res.redirect("/")
            } else {
                res.redirect("/auth/login")
            }
        } else {
            res.redirect("/auth/login")
        }
    } catch (error) {
        console.log(error);
    }

}



const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
}


module.exports = {
        createUser, storeUser, showLoginPage, loginUser, logoutUser
    }