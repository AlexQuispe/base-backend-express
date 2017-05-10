'use strict';
var query = require('./handlers/query');
var get = require('./handlers/get');
var create = require('./handlers/create');
var update = require('./handlers/update');
var remove = require('./handlers/remove');

module.exports = {
  query: query,
  get: get,
  create: create,
  update: update,
  remove: remove
};
