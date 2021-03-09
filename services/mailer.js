const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.from_email = new helper.Email('carychengbackup@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('test/html', content);
        this.recipients = this.formatAddresses(recipients);
    }
}

module.exports = Mailer;