const express = require("express");
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../../models/User');

//passport for verifying the token
const passport = require('passport');

//for hashing the password
const bcrypt = require('bcryptjs');

//Install gravatar library & use it for avatar images
const gravatar = require ('gravatar');


//@route1   POST   api/users/register
//@desc     This route registers the new user
//@access   public
router.post('/register', (req, res) => {

//checking mongoDB if that email address already exists, if yes then return error message

    User.findOne({email: req.body.email})
        .then(user => {
            if (user){
                return res.status(400).json({
                    email: 'Email already exists'
                })
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10,(err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });

                });
               
            }
        })
        .catch(err => console.log(err));
});     


//@route2   POST   api/users/login
//@desc     This route allows the users to login / Returning JWT token
//@access   public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(404).json({email: 'User not found'})
        }

        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch){
                    //Payload
                    const payload = {id: user.id, name: user.name, avatar: user.avatar};

                    //sign token
                    jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, 
                    (err, token) => {
                        return res.json({
                            token: 'Bearer ' + token
                        });
                    })
                }
                else {
                    return res.status(404).json({password: 'Password Incorrect'})
                }
            })
    })
});


module.exports = router;