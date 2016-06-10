'use strict'

const Joi = require('joi');

module.exports = Joi.object().keys({
  title: Joi.string().optional(),
  release_year: Joi.number().integer().optional()
});
