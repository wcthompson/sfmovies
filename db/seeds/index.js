'use strict';

const Movies = require('./data/movies.json')

exports.seed = function (Knex) {
  return Knex('movies').truncate()
  .then(() => {
    return Knex('movies').insert(Movies);
  });
};
