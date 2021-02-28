const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Cookie Session vs Express Session.
// Cookie session is the session: user_id=12345. Stores data directly in cookie
// Express session stores the reference of the session in the cookie: session_id=54321. Stores data in a separate store than the cookie
// There is a 14 kb size limit for cookie session, for express session the size is arbitrarily large.

// Setting user id as cookie in user's browser.
// user_id: '12345'
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Using the user id in the client browser, retrieve user object
// Called on every request
// Retrieves: user_id: '12345' -> 'passport': {user_id: '54321'} -> passes '54321' into deserializeUser
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