const express = require("express");

//We just need the Router from the express & not the entire express so(kind of in-line):
const router = express.Router();

//Bring in the User Models
const User = require('../../models/User');

//Test Route
router.get('/test', (req, res) => res.json({
    msg: 'Users api works!'
}));

//@route1   POST   api/users/resister
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
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
});     


module.exports = router;