const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const Notification = require('../../models/Notification');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const passport = require('passport');

// Validations

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// User route test via get
router.get("/test", (req, res) => res.json({ msg: "This is the users route"}));


// User auth route test via get
router.get("/current", passport.authenticate('jwt', {session: false}), (req, res) => {
   return res.json({
       id: req.user.id,
       username: req.user.username,
       email: req.user.username
    });
})

//User update route needs some work

router.patch("/update", (req, res) => {

    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                  user.username = req.body.username;
                  user.name =  req.body.name;
                  user.lastname = req.body.lastname;
                  user.description = req.body.description;
                  user.save()
                      .then(user => {
                          const payload = {
                              _id: user.id,
                              username: user.username,
                              email: user.email,
                              description: user.description,
                              name: user.name,
                              lastname: user.lastname,
                              followers: user.followers,
                              following: user.following,
                              profileURL: user.profileURL,
                              notifications: user.notifications,
                              posts: user.posts
                              
                          }
                          jwt.sign(
                              payload,
                              keys.secretOrKey,
                              { expiresIn: 36000 },
                              (err, token) => {
                                  res.json({
                                      sucess: true,
                                      token: "Bearer " + token
                                  });
                              }
                          )
                      })
            }
            else {
                return res.status(400).json({ noUserFound: "No user found" })
            }
            
        })
})



// User register route
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.status(400).json({email: "Email already taken"})
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    lastname: req.body.lastname,
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash,
                        newUser.save()
                        .then(user => {
                            const payload = {
                                _id: user.id,
                                username: user.username,
                                email: user.email,
                                name: user.name,
                                lastname: user.lastname,
                                description: user.description,
                                profileURL: user.profileURL,
                                followers: user.followers,
                                following: user.following,
                                notifications: user.notifications,
                                posts: user.posts
                            }
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 36000 },
                                (err, token) => {
                                    res.json({
                                        sucess: true,
                                        token: "Bearer " + token
                                    });
                                }
                            )
                        })
                        .catch(err => console.log(err))
                    });
                });
                
                
            }
        } )
});

//User login route

router.post("/login", (req, res) => {
    const{ errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then( user => {
            if (!user) {
                return res.status(400).json({email: 'The email you entered does not belong to an account'})
            }
            
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            _id: user.id,
                            username: user.username,
                            email: user.email,
                            name: user.name,
                            lastname: user.lastname,
                            description: user.description,
                            profileURL: user.profileURL,
                            followers: user.followers,
                            following: user.following,
                            notifications: user.notifications,
                            posts: user.posts
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 36000},
                            (err, token) => {
                                res.json({ 
                                    sucess: true,
                                    token: "Bearer " + token
                                });
                            }
                        )

                    } else {
                        return res.status(400).json({password: 'Incorrect password'});
                    }
                })
        })
})

// Get single user 

router.get('/:username', (req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            const userData = {
                _id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                description: user.description,
                followers: user.followers,
                following: user.following,
                profileURL: user.profileURL,
                notifications: user.notifications,
                posts: user.posts
            }
            res.json(userData)
        })
        .catch(err => res.status(404).json({ noUserFound: 'No User found with matching ID' }))
})


// Get all users 


router.get("/", (req, res) => {
    let usersObj = {}
    User.find()
        .then((users) => {
            users.forEach( user => {
                const userData = {
                    _id: user.id,
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                    description: user.description,
                    followers: user.followers,
                    following: user.following,
                    profileURL: user.profileURL,
                    notifications: user.notifications,
                    posts: user.posts
                }
            usersObj[user.id]=userData
            })
         res.json(usersObj)
        })
})


router.post('/:username/follow', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    User.findOne({username: req.params.username})
        .then(user => {
            const newNotification = new Notification({
                author: req.user._id,
                type: "FOLLOW",
            })
            user.notifications.push(newNotification);
            user.followers.push(req.user._id);
            return user.save();
        }).then( user =>{
            User.findOne({username: req.user.username})
            .then( currentUser => {
                currentUser.following.push(user._id)
                return currentUser.save()
            } )
            .then( currentUser => {
                const payload = {
                    _id: currentUser._id,
                    username: currentUser.username,
                    email: currentUser.email,
                    description: currentUser.description,
                    name: currentUser.name,
                    lastname: currentUser.lastname,
                    followers: currentUser.followers,
                    following: currentUser.following,
                    profileURL: currentUser.profileURL,
                    notifications: currentUser.notifications,
                    posts: currentUser.posts
                }
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 36000 },
                    (err, token) => {
                        res.json({
                            sucess: true,
                            token: "Bearer " + token,
                            targetUser: user
                        });
                    }
                )
            })
        } )
})
router.post('/:username/unfollow', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            let updatedFollowers = user.followers.filter(id => id.toString() !== req.user._id.toString());
            user.followers = updatedFollowers;
            return user.save();
        }).then( user =>{
            User.findOne({username: req.user.username})
            .then( currentUser => {
                let currentUserUpdatedFollowing = currentUser.following.filter( id => id.toString() !== user._id.toString())
                
                currentUser.following = currentUserUpdatedFollowing;
                return currentUser.save();
            } )
            .then( currentUser => {
                const payload = {
                    _id: currentUser._id,
                    username: currentUser.username,
                    email: currentUser.email,
                    description: currentUser.description,
                    name: currentUser.name,
                    lastname: currentUser.lastname,
                    followers: currentUser.followers,
                    following: currentUser.following,
                    profileURL: currentUser.profileURL,
                    notifications: currentUser.notifications,
                    posts: currentUser.posts,
                }
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 36000 },
                    (err, token) => {
                        res.json({
                            sucess: true,
                            token: "Bearer " + token,
                            targetUser: user
                        });
                    }
                )
            })
        } )
})

module.exports = router;