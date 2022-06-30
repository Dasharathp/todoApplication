const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const createRoutes = require("./routes/create");
const searchRoutes = require("./routes/search");

// const req = require("express/lib/request");
const MONGODB_URI = "mongodb://127.0.0.1:27017/collegeApp"


const store = new MongoDBStore({uri: MONGODB_URI, collection: 'sessions'})

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));


app.use(session(
    {
        secret: "my secret", //key for encrypting the cookie
        resave: false, //doot save session even if it is for same user
        saveUninitialized: false,  //not saving the session if it is not touched or modified the session
        store: store  //for storing session into mongodb database
    }
    ));


app.use(authRoutes);
app.use(createRoutes);
app.use(postRoutes);
app.use(searchRoutes);

console.log("Im in index.js");
app.get("/", (req, res) => { // const isLoggedIn = req.get('Cookie').split(";")[1].trim().split("=")[1] == 'True';
   // console.log(req.session);
    const isLoggedIn = req.session.isLoggedIn;
    res.render("home.ejs", {isLoggedIn});
});

app.listen(3000, () => {
    console.log("Listening at 3000");
});

mongoose.connect(MONGODB_URI, () => {
    console.log("connected to db");
})
