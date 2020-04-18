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



//@route  GET  'api/profile'
//@desc   Get the current users profile
//@access Private
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
);



//@route  GET 'api/profile/username/:username'
//@desc   Get profile by username
//@access Private
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



//@route  GET 'api/profile/followers/userId'
//@desc   GET the list of followers for the current user
//@access Private
router.get('/followers/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({userId: req.params.id})
      .then(profile => {
        if (!profile){
          //Register API creates a Profile immediately, so this should never happen
          res.status(500).json({error: 'Profile not found - This should never happen'});
        }
        else {
          const followers = profile.followers;
          User.find()
          .where('_id')
          .in(followers)
          .select('name username avatar')
          .exec((err, records) => {
            return res.json(records);
          });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);



//@route  GET 'api/profile/following/userId'
//@desc   GET the list of people followed by user whose Id is sent in request params
//        To get that list we find all the profiles whose followers[] conatins the userId sent in params(req.params.id) & then populate the name, username & avatar from userTable
//@access Private
router.get('/following/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({userId: req.params.id})
      .then(profile => {
        if (!profile){
          //Register API creates a Profile immediately, so this should never happen
          res.status(500).json({error: 'Profile not found - This should never happen'});
        }
        else {
          Profile.find({followers: req.params.id})
          .select('userId -_id')
          .populate('userId', ['name', 'username', 'avatar'])
          .exec((err, records) => {
            return res.json(records);
          });
        }
      })
      .catch(err => res.status(404).json(err));
  }
);



//@route  POST   'api/profile/edit'
//@desc   Edit user profile
//@access Private
router.post(
  '/edit',
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

  Profile.findOne({ userId: req.user.id})
  .then(profile => {
      if (profile) {
          Profile.findOneAndUpdate(
              {userId: req.user.id},
              {$set: profileFields},
              {new: true})
              .then(profile => res.json(profile));
          } else {
            //Register API creates a Profile immediately, so this should never happen
            res.status(500).json({error: 'Profile not found - This should never happen'});
          }
      });
});



//@route  POST   'api/profile/follow/:userId'
//@desc   Allows to follow other user
//@access Private
router.post(
  '/follow/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    Profile.findOne({ userId: req.params.id })
      .then(profile => {
        if (
          profile.followers.filter(followUserId => followUserId.equals(req.user.id))
            .length > 0
        ) {
          return res
          .status(400)
          .json({ alreadyliked: 'User already followed this Profile' });
        }
        profile.followers.unshift(req.user.id);
        profile.save().then(profile => res.json(profile));
        }    
      )
      .catch(err => res.status(404).json({ profilenotfound: 'No profile found' }));
  });



//@route  POST   'api/profile/unfollow/:userId'
//@desc   Allows to unfollow other user
//@access Private
router.post(
  '/unfollow/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {   
      Profile.findOne({userId: req.params.id})
        .then(profile => {
          var followedUsersMatching = profile.followers.filter(followUserId => followUserId.equals(req.user.id));

          if (followedUsersMatching.length === 0) {
            return res
              .status(400)
              .json({ alreadyliked: 'Logged in user has not followed this profile' });
          } else {
            // Remove user id from followers array
            for(var i = 0; i < profile.followers.length; i++) { 
              if (profile.followers[i].equals(req.user.id)) {
                profile.followers.splice(i, 1);
              }
            }
            profile.save().then(profile => res.json(profile));
          }
        })
        .catch(err => res.status(404).json({ msg: 'Error while finding Profile' }));
  }
);



//@route  DELETE 'api/profile'
//@desc   Delete user and profile
//@access Private
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