'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',
  seralize: function () {
    return {
      id: this.get('id'),
      title: this.get('title'),
      release_year: this.get('release_year'),
      object: 'movie'
    };
  }
});
