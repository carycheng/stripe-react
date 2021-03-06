const passport = require('passport');

module.exports = (app) => {
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
    // This also exchanges the auth code for a token
    app.get(
        '/auth/google/callback',
        passport.authenticate('google', {
            scope: 'https://www.googleapis.com/auth/plus.login',
            successRedirect: '/surveys',
            failureRedirect: '/'
        })
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}