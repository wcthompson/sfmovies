'use strict'

const Movies = require('../../../../lib/server');
const Knex   = require('../../../../lib/libraries/knex');

const MovieFactory = require('../../../factories/movie')

const testMovie1 = MovieFactory.build({ title: 'Spirited Away', release_year: 2001 });
const testMovie2 = MovieFactory.build({ title: 'Shrek', release_year: 2001 });

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('retrieve', () => {

    beforeEach(() => {
      return Knex('movies').insert([testMovie1, testMovie2]);
    });

    it('finds a single movie', () => {
      return Movies.inject({
        url: `/movies/${testMovie1.id}`,
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

    it('finds a list of movies', () => {
      return Movies.inject({
        url: '/movies?release_year=2001',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result).to.have.lengthOf(2);
      });
    });

  });

});
