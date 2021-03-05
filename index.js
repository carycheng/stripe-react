const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

// a. First try to match routes in our routers here on express
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {

    // b. If the routes did not match then try looking for the content in App.js
    // to see if the request is for any of the bundles files.

    // Express will serve up production assets
    // like our main.js file, or main.css file
    app.use(express.static('client/build'));

    // c. Look for requesting file in the root index.html to see if routes match there.
    // This should be the html div in App.js. Once the route is found it will attempt to
    // load the content from the main.js file

    // Express will serve up the index.html file
    // if it does not recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log('Listening on port: ', PORT);
});