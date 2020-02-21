const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('userTable');
const keys = require ('../config/keys');

// Create an object of StrategyOptions class to later pass to Startegy constructor
const opts = {};

// Extract the token from header, update the value in the opts objects
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// Get secret from keys config file, update the value in the opts objects
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};