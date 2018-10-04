const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const routes = require('./routes/routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
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
