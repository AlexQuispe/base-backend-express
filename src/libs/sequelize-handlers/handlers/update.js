'use strict';
var send = require('../../send');

module.exports = function(model) {

  function update(req, res, next) {
    delete req.body.usuario_autenticado;
    model.update(req.body, getOptions(req))
    .then(function(result) {
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
