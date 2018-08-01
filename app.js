var express = require("express");
var bodyParser = require("body-parser");
var routes = require("./routes/routes.js");
var app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//     origin: 'http://localhost:8008/demo.html',
//     optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// app.options('*', cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

routes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
