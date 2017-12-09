const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect',
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return done(err, user);
        });
    }
));

// passport.use(
//     new GoogleStrategy({
//         // options for google strategy
//         clientID: keys.google.clientID,
//         clientSecret: keys.google.clientSecret,
//         callbackURL: '/auth/google/redirect',
//         passReqToCallback: true
//     }, (accessToken, refreshToken, profile, done) => {
//         function(request, accessToken, refreshToken, profile, done) {
//             User.findOrCreate({ googleId: profile.id }, function(err, user) {
//                 return done(err, user);
//             });
//         }
//     });
// );