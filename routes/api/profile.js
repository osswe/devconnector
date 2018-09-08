const express = require('express');
const router = express.Router();

//this url is relative to the route that was defined to get here, i.e. the app use having '/api/users' to make
// this full url /api/users/test

// @route GET api/profile/test
// @desc Tests profile route
// @access Public

router.get('/test', (req, res) => res.json({ msg: "Profile works" }));

module.exports = router;