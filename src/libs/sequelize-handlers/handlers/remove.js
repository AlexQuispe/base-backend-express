'use strict';
var send = require('../../send');

module.exports = function(model) {

  function remove(req, res, next) {
    model.destroy(getOptions(req))
    .then(function(result) {
      if (!result) {
        send.error404(res);
      } else {
        send.success200(res);
      }
    }).catch(function (err) {
      send.error400(res, "No se puede eliminar");
    });
  }

  function getOptions(req) {
    var options = {};
    options.where = {};
    options.where[model.primaryKeyAttribute] = parseInt(req.params.id);
    return options;
  };

  return remove;
};
