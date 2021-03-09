const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

module.exports = class mailer extends helper.Mail {

}