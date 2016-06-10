'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Knex       = require('../../../../lib/libraries/knex');
const Movie      = require('../../../../lib/models/movie');

const MovieFactory = require('../../../factories/movie');

const spirited_away = MovieFactory.build({ title: 'Spirited Away', release_year: 2001 });
const hackers       = MovieFactory.build({ title: 'Hackers ', release_year: 1995 });
const bad_boys_1    = MovieFactory.build({ title: 'Bad Boys', release_year: 1983 });
const bad_boys_2    = MovieFactory.build({ title: 'Bad Boys', release_year: 1995 });

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', () => {
      const payload  = { title: 'WALL-E' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
      });
    });

  });

  describe('findById', () => {
    beforeEach(() => {
      return Knex('movies').insert(spirited_away);
    });

    it('finds a movie', () => {
      return Controller.findById(spirited_away.id)
      .then((movie) => {
        expect(movie.get('id')).to.eql(spirited_away.id);
      });
    });

    it('cant find a movie', () => {
      return Controller.findById(3)
      .catch((err) => err)
      .then((err) => {
        expect(err).to.be.instanceOf(Movie.NotFoundError);
      });
    });
  });

  describe('findAll', () => {

    beforeEach(() => {
      return Knex('movies').insert([spirited_away, hackers, bad_boys_1, bad_boys_2]);
    });

    it('finds all movies', () => {
      const payload = {};

      return Controller.findAll(payload)
      .then((movies) => {
        expect(movies.length).to.eql(4);
      });
    });

    it('finds many by title', () => {
      const payload = { title: bad_boys_1.title };

      return Controller.findAll(payload)
      .then((movies) => {
        expect(movies.length).to.eql(2);
      });
    });

    it('finds many by release year', () => {
      const payload = { release_year: hackers.release_year };

      return Controller.findAll(payload)
      .then((movies) => {
        expect(movies.length).to.eql(2);
        expect(movies.at(0).get('release_year')).to.eql(hackers.release_year);
        expect(movies.at(1).get('release_year')).to.eql(hackers.release_year);
      });
    });

    it('orders alphebetically by title', () => {
      const payload = { release_year: hackers.release_year };

      return Controller.findAll(payload)
      .then((movies) => {
        expect(movies.length).to.eql(2);
        expect(movies.at(0).get('title')).to.eql(bad_boys_2.title);
        expect(movies.at(1).get('title')).to.eql(hackers.title);
      });
    });

    it('finds by both title and release_year', () => {
      const payload = { title: bad_boys_1.title, release_year: bad_boys_1.release_year };

      return Controller.findAll(payload)
      .then((movies) => {
        expect(movies.length).to.eql(1);
        expect(movies.at(0).get('release_year')).to.eql(bad_boys_1.release_year);
      });
    });

  });

});
