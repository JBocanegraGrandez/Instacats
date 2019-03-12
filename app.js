const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require("body-parser");


// Database Schemas
const User = require('./models/User');

//  Routes:
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log("Connected to MongoDB :) "))
.catch(err => console.log(err));


// Express commands
app.get("/", (req, res) => {
    res.send("Hello World 3");
    const user = new User({
        username: 'test',
        email: 'test@test.com',
        password: 'test123'
    });
    user.save();
})

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())

app.use("/api/users", users);
app.use("/api/posts", posts);


const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));
