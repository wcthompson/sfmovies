'use strict'

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  return new Movie().save(payload)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};

exports.findAll = (query) => {
  return new Movie()
  .query((qb) => {
    if ('title' in query) {
      qb.where('title', query.title);
    }
    if ('release_year' in query) {
      qb.where('release_year', query.release_year);
    }
  })
  .orderBy('title')
  .fetchAll();
};

exports.findById = (query) => {
  return new Movie({ id: query }).fetch({ require: true })
};

