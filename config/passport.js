const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const User = require('../models/Users');

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtSecret;
//opts.issuer = 'accounts.mysoftware.com';
//opts.audence = 'mysoftware.com';

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log("payload:", jwt_payload);
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) 
        { 
          done(null, user); 
        }
        else 
        { 
          done(null, false); 
        }

      })
      .catch(err => console.log(err)
      )
  }))
}

