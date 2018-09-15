const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
// load user model
const User = require('../../models/Users');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get('/test', (req, res) =>{
  
  res.json(req._parsedUrl);
});


// @route POST api/users/register
// @desc register a user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log("request is:", req);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        //exists
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
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
  const { errors, isValid } = validateLoginInput(req.body);

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email: email })
    .then((user) => {
      // check if user is not returned
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }

      // check password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // create payload to sign
            const payload = {
              name: user.name,
              id: user.id,
              avatar: user.avatar,
              email: user.email,
            };

            // sign token
            jwt.sign(
              payload,
              keys.jwtSecret,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              }
            );
          } else {
            errors.password = 'Password incorrect'
            res.status(400).json(errors);
          }
        });
    });

});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
});


module.exports = router;