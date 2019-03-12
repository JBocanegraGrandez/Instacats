const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const passport = require('passport');

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


// User register route
router.post("/register", (req, res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                return res.status(400).json({email: "Email already taken"})
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash,
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                    });
                })
                newUser.save().then( user => res.send(user)).catch(err => res.send(err));
            }
        } )
});

//User login route

router.post("/login", (req, res) => {
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
                            email: user.email
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

module.exports = router;