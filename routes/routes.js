const postFccComment = require('../fccComment.js');

const appRouter = (app) => {
  app.get('/', (req, res) => {
    const { difficulty, start, count } = req.query;
    getWord(difficulty, start, count).then((data) => {
      res.status(200).send(data);
    }).catch(((error) => {
      res.send(error);
    }));
  });

  app.post('/ftccomment', (req, res) => {
    postFccComment(req.body)
      .then(answer => res.send(answer))
      .catch(error => console.log(error));
  });
};
module.exports = appRouter;
