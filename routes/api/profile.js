const express = require("express");

//We just need the Router from the express & not the entire express so(kind of in-line):
const router = express.Router();

//@route1   POST   api/profile/create
//@desc     Create & edit user profile
//@access   Private

//@route2   GET  api/profile
//@desc     Get the current users profile
//@access   Private

// @route3  GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public

// @route4  GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

// @route5  DELETE api/profile
// @desc    Delete user and profile
// @access  Private


module.exports = router;