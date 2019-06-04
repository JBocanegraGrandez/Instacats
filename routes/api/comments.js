const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');

const Comment = require('../../models/Comment');
const User =  require('../../models/User');
const Post = require('../../models/Post');
const Notification = require('../../models/Notification')

router.post("/:postId", passport.authenticate("jwt", {session: false}), (req, res) => {
    debugger
    Post.findById(req.params.postId)
        .populate('user')
        .then(post => {
            User.findOne({_id: post.user._id})
                .then( user => {
                    const newNotification = new Notification({
                        author: req.user._id,
                        type: "NEW_COMMENT"
                    })
                    user.notifications.push(newNotification);
                    return user.save()
                })
            const newComment = new Comment({
                author: req.user.id,
                body: req.body.body,
                postId: req.body.postId
            })

           post.comments.push(newComment);
           post.save().then(post => res.json(post))
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({noPostFound: "No post found"})})
})

router.post("/:postId/:commentId/like",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Post.findOne({ _id: req.params.postId })
            .then(post => {
                if (post) {
                    const currentComment = post.comments.filter(comment => 
                        comment._id.toString() === req.params.commentId.toString()
                    )
                    const index = post.comments.indexOf(currentComment)
                    User.findOne({ _id: currentComment.author })
                        .then(user => {
                            const newNotification = new Notification({
                                author: req.user._id,
                                type: "LIKE_COMMENT"
                            })
                            user.notifications.push(newNotification);
                            return user.save()
                        })
                    currentComment.likes.push(req.user._id)
                    // how to properly save it into array? indexOf wont work,
                    post.save().then(post => res.json(post))
                } else {
                    return res.status(400).json({ post: "Post not found" })
                }
            })
    })
module.exports = router;