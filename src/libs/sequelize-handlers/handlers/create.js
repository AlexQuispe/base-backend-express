'use strict';
var send = require('../../send');

module.exports = function(model) {

  function create(req, res, next) {
    model.build(req.body).save().then(function(result) {
      if (!result) {
        console.log("No hay resultados");
        send.error404(res);
      } else {
        send.success201(res, result);
      }
    }).catch(function (err) {
      console.log(err);
      send.error400(res);
    });
  }

  return create;
};
