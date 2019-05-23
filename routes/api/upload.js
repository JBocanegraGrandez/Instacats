const express = require("express");
const router = express.Router();
const User = require("../../models/User");


const upload = require('../../services/upload')
const singleUpload = upload.single('image');

const passport = require("passport");


router.post("/", singleUpload, passport.authenticate('jwt', { session: false }), function (req, res) {
    
    User.findOne({ username: req.user.username })
        .then( user => {
            user.profileURL = req.file.location
            user.save()
        })
    return res.json({'imageURL': req.file.location}) 
});


// router.post("/", singleUpload, passport.authenticate('jwt', { session: false }), function (req, res) {
//     new Post ({
//         Post.description =  req.body.description
//         return Post.save()
//     }). then( post => {
//         User.findOne(username: req.user.username)
//             user.post.push(post._id)
//     })
//     return res.json({'imageURL': req.file.location}) 
// });


module.exports = router;