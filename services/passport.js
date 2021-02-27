const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Setting user id as cookie in user's browser. It might store it in the cookie such as
// '21421235(cookie_id)': 'user_id'
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Using the user id in the client browser, retrieve user object
// Called on every request
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        }
    );
});

/* Three Legged Oauth: Oauth 2.0
 * 1. App will ask client if it is okay they get access to certain information.
 * 2. Once user approves auth code is sent back 
 * 3. App sends auth code to server again and gets back an access token
 */
passport.use(
    new GoogleStrategy(
        // #2
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            // #4
            // Once the third tripe of the three legged oauth flow is completed
            // the callback here is called by passport js.
            User.findOne({ googleId: profile.id }).then(existingUser => {
                if (existingUser) {
                    done(null, existingUser);
                } else {
                    new User({
                        googleId: profile.id
                    }).save().then(user => done(null, user));
                }
            });
        }
    )
);