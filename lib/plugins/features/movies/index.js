'use strict'

const Controller           = require('./controller');
const MovieCreateValidator = require('../../../validators/movies/create');
const MovieListValidator   = require('../../../validators/movies/list');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieCreateValidator
      }
    }
  },

  {
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.findAll(request.query));
      },
      validate: {
        query: MovieListValidator
      }
    }
  },

  {
    method: 'GET',
    path: '/movies/{id}',
    config: {
      handler: (request, reply) => {
        reply(Controller.findById(request.params.id));
      }
    }
  }
  ]);

  next();

};

exports.register.attributes = {
  name: 'movies'
}
