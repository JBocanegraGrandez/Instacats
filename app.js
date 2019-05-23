const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require("body-parser");
const passport = require('passport');



// Database Schemas
const User = require('./models/User');

//  Routes:
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const upload = require("./routes/api/upload")

// MongoDb Connect

mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log("Connected to MongoDB :) "))
.catch(err => console.log(err));


// Express commands
app.get("/", (req, res) => {
    res.send("Hello World 3");
   
})

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

//Bodyparser - postman tests
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

// Use routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/upload", upload);

// Heroku or localhost
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));
