const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    // You can pass in an arbitrary amount of functions into this route
    // (middlewares) until you get to a function that sends back a response.
    // This is how express terminates a request, when it sees a function that
    // does something like res.send(data) to close the request chain
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, subject, body, recipients } = req.body

        const survey = new Survey({
            title: title,
            body: body,
            subject: subject,
            recipients: recipients.split(',').map(email => { return {email: email.trim()}}),
            _user: req.user.id,
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));
        mailer.send();
    });
};