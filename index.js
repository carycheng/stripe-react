const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

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
            console.log('Access Token: ' + accessToken);
            console.log('Refresh Token: ' + refreshToken);
            console.log('Profile: ', profile);
        }
    )
);

// #1
// This is the first step in the three legged oauth by asking user for permission
// for the third party app to access user information.
app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// #3
// Because this route has the auth code, passport js knows to handle
// this route a little bit differently compared to the first time we
// call passport js authenticate().
app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/login'
    })
);

app.get('/success', (req, res) => {
    res.send({info: 'Success!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log('Listening on port 5000');
});