const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Profile Model
const Profile = require('../../models/Profile');
//User Model
const User = require('../../models/User');
//Validation
const validateProfileInput = require('../../validation/profile');

//@route1   POST   api/profile/create
//@desc     Create & edit user profile
//@access   Private

router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);
        if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const profileFields = {};

    profileFields.user = req.user.id;

    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.website) profileFields.website = req.body.website;

    Profile.findOne({ user: req.user.id})
    .then(profile => {
        if (profile) {
            Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true})
                .then(profile => res.json(profile));
            } else {
              //Register API creates a Profile immediately, so this should never happen
              res.status(500).json({error: 'Profile not found - This should never happen'});
            }
        });
});

//@route2   GET  api/profile
//@desc     Get the current users profile
//@access   Private
// We will be showing the users profile even if he hasn't added the Profile Model Data (0-followers & 0-following)

router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile.findOne({userId: req.user.id})
      // .populate searches by userId and populates the data for that user into profile Object
      .populate('userId', ['name', 'username', 'avatar'])
      .then(profile => {
        if (!profile){

          //Register API creates a Profile immediately, so this should never happen
          res.status(500).json({error: 'Profile not found - This should never happen'});
        }
        else {
          res.json(profile);
        }
      })
      .catch(err => res.status(404).json(err));
  }
)


// @route4  GET api/profile/username/:username
// @desc    Get profile by username
// @access  Private

router.get('/username/:username', (req, res) => {
  const errors = {};

  User.findOne({ username: req.params.username })
    .then(user => {
      if (user) {
        Profile.findOne({userId: user._id})
          .populate('userId', ['name', 'username', 'avatar'])
          .then(profile => {
            if (!profile) {
              errors.noprofile = 'There is no profile for this user';
              return res.status(404).json(errors);
            }
            else {
              return res.json(profile);
            }

          })
          .catch(err => res.status(404).json(err));
        }
      else {
        return res.status(400).json({msg: 'User doesnot exist!'}); 
      }
    })
    .catch(err => res.status(404).json(err));
});

// @route5  DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Profile.findOneAndRemove({ userId: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: true })
        );
      });
    });

module.exports = router;