const express = require('express');
const morgan = require ('morgan');
const store = require('./playstore.js');
const cors = require('cors');

const app = express();

app.use(morgan('dev')).use(cors());

app.get('/apps', (req, res) => {
    //get the paramaters from query
    const { sort, genres } = req.query;
    //use store file for results
    let results = store;

    
  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res
        .status(400)
        .send('sort must be one of rating or app');
    }
  }
  if (sort === 'app') {
    results = store.sort((a, b) => {
      let x = a['App'].toLowerCase();
      let y = b['App'].toLowerCase();

      return x > y ? 1 : x < y ? -1 : 0;
    });
  }
  else if (sort === 'rating') {
    results = results.sort((a, b) => {
      return a['Rating'] < b['Rating'] ? 1 : a['Rating'] > b['Rating'] ? -1 : 0;
    })
  }

  if (genres) {
    if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres.toLowerCase())) {
      return res.status(400).send('Genre must be one of Action, Puzzle, Strategy, Casual, Arcade or Card');
    }
    results = results.filter(app => {
      return app.Genres.toLowerCase() === genres.toLowerCase();
    });
  }


  return res.send(results);

});



module.exports = app;

//user sorts and filters by URL
// http://localhost:8000/apps?genres=arcade (or whichever genre from list above)
//or
//http://localhost:8000/apps?sort=app
//or
//http://localhost:8000/apps?sort=rating