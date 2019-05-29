const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');

const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

router.post("/:postId", passport.authenticate("jwt", {session: false}), (req, res) => {
    Post.findById(req.params.postId)
        .then(post => {
            const newComment = new Comment({
                author: req.user.id,
                body: req.body.body,
                postId: req.params.postId
            })

           post.comments.push(newComment);
           post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({noPostFound: "No post found"}))
})

module.exports = router;