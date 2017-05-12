'use strict';
var send = require('../../send');

module.exports = function(model) {

  function update(req, res, next) {
    res.set('Content-Type','application/json');
    model.update(req.body, getOptions(req))
    .then(function(result) {
      console.log("RESULT UPDATE = ", result);
      if (!result[0]) {
        send.error404(res);
      } else {
        send.success200(res);
      }
    }).catch(function (err) {
      send.error400(res);
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
