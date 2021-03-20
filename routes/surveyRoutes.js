const _ = require('lodash');
const { Path }= require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { match } = require('assert');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        
        const events = _.chain(req.body)
            .map(({ email, url }) => {
                if (!url) {
                    res.status(400);
                }

                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email: email, surveyId: match.surveyId, surveyId: match.choice }
                }
            })
            .compect()
            .uniqBy('email', 'surveyId')
            .value();

        console.log(events);
        
        res.send({});
    });

    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!');
    });

    // You can pass in an arbitrary amount of functions into this route
    // (middlewares) until you get to a function that sends back a response.
    // This is how express terminates a request, when it sees a function that
    // does something like res.send(data) to close the request chain
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            
            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};