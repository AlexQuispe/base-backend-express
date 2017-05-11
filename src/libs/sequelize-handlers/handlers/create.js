'use strict';
var errorResponse = require('../errors');

module.exports = function(model) {

  function create(req, res, next) {
    res.set('Content-Type','application/json');
    model.build(req.body).save().then(function(result) {
      if (!result) {
        res.status(404).json(errorResponse.err404);
      } else {
        res.status(201).json(result);
      }
    }).catch(function (err) {
      res.status(400).json(errorResponse.err400);
    });
  }

  return create;
};
