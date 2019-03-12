const mongoose = require('mongoose');
const express = require("express");
const app = express();
const db = require('./config/keys').mongoURI;
const bodyParser = require("body-parser");

//  Routes:
const users = require("./routes/api/users.js");
const posts = require("./routes/api/posts");

mongoose
.connect(db, {useNewUrlParser: true})
.then(() => console.log("Connected to MongoDB :) "))
.catch(err => console.log(err));


// Express commands
app.get("/", (req, res) => res.send("Hello World 3"));
app.use("/api/users", users);
app.use("/api/posts", posts);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())


const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));
