
// modules


const express = require('express');
const {showHomePage, createPost, storePost, showPost, deletePost, editPost, updatePost} = require('./controllers/PostController')
const {createUser, storeUser, showLoginPage, loginUser, logoutUser} = require('./controllers/UserController')
const authMiddleware = require("./middlewares/auth")
const redirectlfAuthenticated = require("./middlewares/redirectlfAuthenticated")



const db = require("./db");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require("./models/User");
const app = express();


var bodyParser = require('body-parser') 
const expressFileUpload = require("express-fileupload"); 

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(express.static("public"));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URL})
  }));

// methods 
app.get("/", showHomePage)

app.get("/posts/new", createPost)

app.post("/posts/store", storePost)

app.get("/posts/:ObjectId", showPost)


// LOGIN isn't finished 
/*
app.get("/auth/register", createUser)
app.post("/auth/register", storeUser)

app.get("/auth/login", showLoginPage)
app.post("/auth/login", loginUser)
app.get("/auth/logout", logoutUser)
*/

app.get("/posts/delete/:ObjectId", deletePost)

app.get("/posts/edit/:ObjectId", editPost)
app.post("/posts/edit/:ObjectId", updatePost)

app.listen(3000, () => {
    console.log("Server started on port 3000")
})







