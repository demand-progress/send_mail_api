const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const routes = require('./routes/routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let whitelist = ['https://nomobilemegamerger.com', 'http://localhost:8008', 'https://script.google.com/a/demandprogress.org/macros/d/MXrCPMs2Zg5YspN2jGy7A8VnFY-KFaGkg/edit?uiv=2&mid=ACjPJvHfRddN5yxf7EjoXz2pai3GtVnYRhCkX1dWX3gg4dGLqTcZIAxMMmQyVXQyAnknWKnqloFCTLzrJwIbqX1uqVJ8tvUbJkXigttfCr1Kt6RYZr9mHDyHFhh2tJ3pBQw2asEzewCalg'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.options('*', cors());

routes(app);

const port = process.env.PORT || 8008;

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
