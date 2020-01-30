const express = require("express");

//We just need the Router from the express & not the entire express so(kind of in-line):
const router = express.Router();

router.get('/test', (req, res) => res.json({
    msg: 'Profile api works!'
}));

module.exports = router;