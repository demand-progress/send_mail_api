const sendEmail = require('../confirmationEmail.js'); 

const appRouter = (app) => {
  app.get('/', (req, res) => {
    res.send('welcome!');
  });

  app.post('/sendEmail', (req, res) => {
    const { toEmail } = req.body;
    sendEmail(toEmail)
      .then(response => res.send(response))
      .catch(error => console.log(error))
  });
};
module.exports = appRouter;
