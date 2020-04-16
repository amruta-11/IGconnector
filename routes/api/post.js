const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../../models/User')
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post')
const Comment = require('../../models/Comment')


//@route  GET 'api/post'
//@desc   Get all users posts
//@access Private
router.get('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        Post.find()
        .populate('userId', ['name', 'username', 'avatar'])
        .populate('comments', ['content', 'userId'])
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  });


//@route  GET 'api/post/username/:username'
//@desc   Get other users posts
//@access Private
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



//@route   POST 'api/post'
//@desc    Create post for current user
//@access  Private
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
        content: req.body.content,
        imageURL: req.body.imageURL,
        likes: [],
        tags: [],
        comments: []
      });
      newPost.save().then(post => res.json(post));
    }
  );


//@route   POST 'api/post/like/:postId'
//@desc    Like post
//@access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {    
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(likedUserId => likedUserId.equals(req.user.id))
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



//@route   POST 'api/post/unlike/:postId'
//@desc    Unlike post
//@access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {   

      Post.findById(req.params.id)
        .then(post => {
          var likedUsersMathcingCurrentUser = post.likes.filter(likedUserId => likedUserId.equals(req.user.id));

          if (likedUsersMathcingCurrentUser.length === 0) {
            return res
              .status(400)
              .json({ alreadyliked: 'User has not liked this post' });
          } else {
            // Remove user id from likes array
            for(var i = 0; i < post.likes.length; i++) { 
              if (post.likes[i].equals(req.user.id)) {
                post.likes.splice(i, 1);
              }
            }
            post.save().then(post => res.json(post));
          }
        })
        .catch(err => res.status(404).json({ msg: 'Error while finding Post' }));
  }
);



//@route   POST api/post/tag/:postId
//@desc    Tag user in post
//@access  Private
router.post(
  '/tag/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
      if (post) {
        User.findOne({username: req.body.username})
        .then(user => {
          if (user) {
            for (i = 0; i < post.tags.length; i++) {
                var taggedUserId = post.tags[i];
                if (taggedUserId.equals(user.id)) {
                  return res
                  .status(400)
                  .json({ msg: 'User is already tagged in the post' });    
                } 
            }
            post.tags.unshift(user._id);
            post.save().then(post => res.json(post));
          } else {
            return res.status(400).json({ msg: 'User to be tagged not found' });
          }
        })
        .catch(err => res.status(404).json({ msg: 'Error while finding user to be tagged.' }));
      } else {
        return res.status(404).json({ msg: 'Could not find the post for which tag is to be added.' });
      }
    })
    .catch(err => res.status(404).json({ msg: 'Error while finding post.' }));
  }
);



//@route   POST 'api/post/untag/:postId'
//@desc    Untag user from post
//@access  Private
router.post(
  '/untag/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Post.findById(req.params.id)
    .then(post => {
      if (post) {
        User.findOne({username: req.body.username})
        .then(user => {
          if (user) {
            if (post.tags.filter(taggedUserId => taggedUserId.equals(user.id))
            .length === 0) {
              return res
              .status(400)
              .json({ msg: 'User is not tagged in the post' });
            } else {
              for(var i = 0; i < post.tags.length; i++) { 
                if (post.tags[i].equals(user.id)) {
                  post.tags.splice(i, 1);
                }
              }
              post.save().then(post => res.json(post));
            }
          } else{
            return res.status(400).json({ msg: 'User to be untagged not found' });
          }
        })
        .catch(err => res.status(404).json({ msg: 'Error while finding user to be untagged.' }));
      } else {
        return res.status(404).json({ msg: 'Could not find the post from which user tag is to be removed.' });
      }
    })
    .catch(err => res.status(404).json({ msg: 'Error while finding post.' }));
  }
);



//@route   POST 'api/post/comment/:postid'
//@desc    Add comment to post
//@access  Private
router.post(
  '/comment/:postid',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Post.findById(req.params.postid)
      .then(post => {        
        const newComment = new Comment ({
          content: req.body.content,
          userId: req.user._id,
          postId: req.params.postid
        });
        newComment.save().then(comment => {
          post.comments.push(comment._id);
          post.save().then(res.json(comment));
        });
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);



//@route   DELETE 'api/post/:postId'
//@desc    Delete post by postId
//@access  Private
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




//@route   DELETE 'api/post/comment/:commentId'
//@desc    Remove comment from post using CommentID
//@access  Private
router.delete(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Comment.findById(req.params.id)
    .then(comment => {
      if (comment.userId.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ notauthorized: 'User not authorized' });
      }
      // Delete
      comment.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ commentnotfound: 'No comment found' })); 
}
);


module.exports = router;