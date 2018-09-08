const express = require('express');
const router = express.Router();

//this url is relative to the route that was defined to get here, i.e. the app use having '/api/users' to make
// this full url /api/users/test

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Users works" }));

module.exports = router;