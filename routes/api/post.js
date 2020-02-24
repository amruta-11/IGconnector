const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User')
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post')

//Tag Validation Function - Do not use this function it returns empty userIds array
function validateTags(data) {
    let tagErrors = {};
    let isTagsValid = true;

    if (data.tags.length === 0) {
        return { tagErrors, isTagsValid };
    }
    userIds = [];
    for (i = 0; i < data.tags.length; i++) {
        // get username from tags array corresponding to current i
        currentuser = data.tags[i];
        // findOne user by that username
        User.findOne({username: currentuser})
        .then(user => {
            if (!user) {
                tagErrors.tags = 'Invalid tag ' + currentuser;
                isTagsValid = false;
            } else {
                userIds.push(user._id);
            }
        })
        .catch(err => console.log(err));
    }
    return { tagErrors, isTagsValid };
}

// @route  GET api/posts
// @desc    Get current users posts
// @access  Private
router.get('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Post.find({userId: user._id})
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  });

// @route   GET api/posts/username/:username
// @desc    Get other users posts
// @access  Private

router.get('/username/:username',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        User.findOne({username: req.params.username})
        .then(user => {
            if (user) {
                Post.find({userId: user._id})
                .sort({ date: -1 })
                .then(post => {
                    if (post) {    
                        return res.json(post);
                    } else {
                        return res.json()
                    }
                })
                .catch(err => res.status(404).json(err));
            } else {
                return res.status(400).json({msg: 'Username doesnot exist!'});
            }
        })    
        .catch(err => res.status(404).json({ nousernamefound: 'Error while getting user for this Username'}));
  });


// @route   POST api/post
// @desc    Create post for current user
// @access  Private

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validatePostInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      
      const newPost = new Post({
        userId: req.user._id,
        content: req.body.text,
        imageURL: req.body.imageURL,
        likes: [],
        tags: [],
        comments: []
      });
      newPost.save().then(post => res.json(post));
    }
  );

// @route   DELETE api/post/:postId
// @desc    Delete post by postId
// @access  Private
router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.userId.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' })); 
    }
  );

// @route   POST api/posts/like/:postId
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {    
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(likedUserId => likedUserId.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift(req.user.id);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   POST api/posts/unlike/:postId
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {   

      Post.findById(req.params.id)
        .then(post => {
          var likedUsersMathcingCurrentUser = post.likes.filter(likedUserId => likedUserId.toString() === req.user.id);

          if (likedUsersMathcingCurrentUser.length === 0) {
            return res
              .status(400)
              .json({ alreadyliked: 'User has not liked this post' });
          } else {
            // Remove user id from likes array
            for(var i = 0; i < post.likes.length; i++) { 
              if (post.likes[i] === req.user.id) {
                post.likes.splice(i, 1);
              }
            }
            post.save().then(post => res.json(post));
          }
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   POST api/posts/comment/:postId
// @desc    Add comment to post
// @access  Private

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private




module.exports = router;