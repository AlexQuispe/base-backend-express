'use strict';
var errorResponse = require('../errors');

module.exports = function(model) {

  function update(req, res, next) {
    res.set('Content-Type','application/json');
    model.update(req.body, getOptions(req))
    .then(function(result) {
      if (!result) {
        res.status(404).json(errorResponse.err404);
      } else {
        res.status(200).json(result);
      }
    }).catch(function (err) {
      res.status(400).json(errorResponse.err400);
    });
  }

  function getOptions(req) {
    var options = {};
    options.where = {};
    options.where[model.primaryKeyAttribute] = parseInt(req.params.id);
    return options;
  };

  return update;
};