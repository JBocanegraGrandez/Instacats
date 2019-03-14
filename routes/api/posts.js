const express = require("express");
const router = express.Router();
const passport = require("passport");
const validatePostInput = require("../../validation/posts");
const Post = require("../../models/Post");
const mongoose = require('mongoose');


// Get all Posts
router.get("/", (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
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

module.exports = router;