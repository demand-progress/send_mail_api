const postComment = require('../commentFunc.js')

var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("Welcome to our restful API");
    });
    app.post("/comment", function(req, res) {
        postComment(req.body).then((answer) => res.send(answer))  
      });
  }
  
  module.exports = appRouter;