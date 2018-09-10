const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = require('../models/Users');

let opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtSecret;
opts.issuer = 'accounts.mysoftware.com';
opts.audence = 'mysoftware.com';

