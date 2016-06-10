'use strict'

const Factory = require('rosie').Factory;

module.exports = Factory.define('movie')
  .sequence('id')
  .attr('title')
  .attr('release_year');
