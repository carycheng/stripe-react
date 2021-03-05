const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    // Interesting that for anonymous purchases where we are not creating a user and
    // attaching a payment method to that user we cannot use a card id and have to use
    // a token id because using a card for source means the need to pass in both a card id
    // and a customer id, the customer id which we do not have in this case.
    app.post(
        '/api/stripe', requireLogin,
        async (req, res) => {
            const charge = await stripe.charges.create({
                amount: 500,
                currency: 'usd',
                description: '$5 for 5 credits',
                source: req.body.id
            });

            req.user.credits += 5;
            const user = await req.user.save();
            
            res.send(user);
        }
    );
};  