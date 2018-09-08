const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
// load user model
const User = require('../../models/Users');

// gravatar

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: "Users works" }));


// @route POST api/users/register
// @desc register a user
// @access Public
router.post('/register', (req, res) => {
  console.log("request is:", req);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        //exists
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', //size
          r: 'pg', //rating
          d: 'mm', //default
        });

        // new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => (console.log('error: ', err)));

          })
        })

      }
    });

});

// @route GET api/users/login
// @desc Login User / returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email: email })
    .then((user) => {
      // check if user is not returned
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // check password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // generate token
            return res.json({ msg: 'Success' });
          } else {
            return res.status(400).json({ msg: 'password incorrect' });
          }
        });
    });

});



module.exports = router;