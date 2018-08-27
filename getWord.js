const axios = require('axios');

const getWord = (difficulty, start, count) => new Promise((resolve, reject) => {
  axios.get('http://app.linkedin-reach.io/words', {
    params: {
      difficulty: 1,
      start: 1,
      count: 1
    }
  })
    .then((response) => {
      resolve(response.data)
    })
    .catch((error) => {
      reject(error);
    });
});

module.exports = getWord;
