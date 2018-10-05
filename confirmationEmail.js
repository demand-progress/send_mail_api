const Mailgun = require('mailgun-js');

let mailGunDomainKey;
let mailgunApiKey;

if (!process.env.MAILGUN_API_KEY) {
  const { mailGunDomain, mailgunApi } = require('./config/keys.js');
  mailGunDomainKey = mailGunDomain;
  mailgunApiKey = mailgunApi;
}

const sendEmail = toEmail => new Promise(
  async (resolve, reject) => {
    // sent email to notify of error
    const apiKeyz = process.env.MAILGUN_API_KEY || mailgunApiKey;
    const domainz = process.env.MAILGUN_DOMAIN || mailGunDomainKey;
    const mailgun = new Mailgun({ apiKey: apiKeyz, domain: domainz });

    const data = {
      from: 'progressivepipelineproject@gmail.com',
      to: toEmail,
      subject: 'Progressive Talent Pipeline has received your application',
      text: 'If you have any questions feel free to reach out to us at progressivepipelineproject@gmail.com',
    };

    // Sending the email
    mailgun.messages().send(data, (error, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body.message);
      }
    });
  },
);

module.exports = sendEmail;
