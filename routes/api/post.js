const express = require("express");

//We just need the Router from the express & not the entire express so(kind of in-line):
const router = express.Router();

// @route1  GET api/posts
// @desc    Get posts
// @access  Public

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public

// @route   POST api/posts
// @desc    Create post
// @access  Private

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private





module.exports = router;