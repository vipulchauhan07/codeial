const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new startegy for google login
passport.use(new googleStrategy({
    clientID: '1068172412840-hllb7g5orvc71q3d16iqr3gvmmklf7pj.apps.googleusercontent.com',
    clientSecret: 'vf1H4TO-tmfT_idr6V9ndUdg',
    callbackURL: 'http://localhost:8000/users/auth/google/callback'
},

    function (accessToken, refreshToken, profile, done) {
        // find the user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user) {
            if(err){console.log('error in google strategy-passport', err); return;}

            console.log(profile);

            if(user) {
                // if found, set this user a req.user
                return done(null, user);
            }else {
                // if not found, create the user and set it as req.user
                User.create({
                     name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating user google strategy-passport', err); return;}
                    return done(null, user);
                });
            }
        });
    }

));

module.exports = passport;