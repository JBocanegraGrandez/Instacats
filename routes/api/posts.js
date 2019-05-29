const express = require("express");
const router = express.Router();
const passport = require("passport");
const validatePostInput = require("../../validation/posts");
const Post = require("../../models/Post");
const mongoose = require('mongoose');
const Notification = require('../../models/Notification');
const User = require("../../models/User");


// Get all Posts
router.get("/", (req, res) => {
    let postsObj = {}
    Post.find()
        .populate('user')
        .then(posts => {
            posts.forEach( post => {
                const postData = {
                    _id: post._id,
                    user: post.user,
                    img: post.img,
                    caption: post.caption,
                    location: post.location,
                    tags: post.tags,
                    likes: post.likes,
                    comments: post.comments,
                    date: post.date
                }
                postsObj[post._id] = postData
            })
            res.json(postsObj)
        })
        .catch(err => res.status(400).json({noPostsFound: 'No Posts found' }))
});

// Get all post from single user 
router.get('/user/:user_id', (req, res) => {
    Post.find({user: req.params.user_id})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({noPostsFound: 'No Posts found for user'}))
})

// Get individual Post

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({noPostFound: 'No Post found with matching ID'}))
})

// Create new Post

router.post("/", 
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        const { errors, isValid} = validatePostInput(req.body);

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const newPost = new Post({
            user: req.user.id,
            caption: req.body.caption,
            location: req.body.location,
            tags: req.body.tags,
            img: req.body.img
        })
        
        newPost.save().then(post => res.json(post));
})

router.post("/:id/like", 
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        Post.findOne({_id: req.params.id})
            .then(post =>{
                if (post) {
                    User.findOne({_id: post.user})
                        .then(user => {
                            const newNotification = new Notification({
                                author: req.user._id,
                                type: "LIKE_PHOTO"
                            })
                            user.notifications.push(newNotification);
                           return user.save()
                        })
                    post.likes.push(req.user._id)
                    post.save().then( post => res.json(post))
                } else {
                    return res.status(400).json({post: "Post not found"})
                } 
            })
})

router.post("/:id/dislike", 
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        Post.findOne({_id: req.params.id})
            .then(post =>{  
                let updatedLikes = post.likes.filter(id => id.toString() !== req.user._id.toString());
                post.likes = updatedLikes;
                post.save().then(
                    post => res.json(post)
                )
            })
            .catch(err => res.status(404).json({noPostFound: "No post found"}))
})


module.exports = router;