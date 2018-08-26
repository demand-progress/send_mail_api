const getWord = require('../getWord.js');

const appRouter = (app) => {
  app.get('/', (req, res) => {
    let { difficulty, start, count } = req.query;
    getWord(difficulty, start, count).then((data) => {
        res.status(200).send(data);
      }  
    ).catch(((error) => {
      res.send(error)
    })) 
  });
};
module.exports = appRouter;
