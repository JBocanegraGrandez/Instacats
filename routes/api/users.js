const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const User = require('../../models/User');
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
    console.log(req.user);
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
                                id: user.id,
                                username: user.username,
                                email: user.email
                            }
                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                { expiresIn: 3600 },
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
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            name: user.name,
                            lastname: user.lastname,
                            description: user.description
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            { expiresIn: 3600},
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
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ noUserFound: 'No User found with matching ID' }))
})

module.exports = router;