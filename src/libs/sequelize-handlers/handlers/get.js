'use strict';
var send = require('../../send');

module.exports = function(model) {

  function get(req, res, next) {
    model.findOne(getOptions(req))
    .then(function(result) {
      if (!result) {
        send.error404(res);
      } else {
        send.success200(res, result);
      }
    }).catch(function (err) {
      send.error400(res);
    });
  }

  function getOptions(req) {
    var query = req.query;
    var attributes = query.fields ? query.fields.split(",") : []; // ?fields=nombre,email
    var options = {};
    if (query.fields) options.attributes = attributes;
    options.where = {};
    options.where[model.primaryKeyAttribute] = parseInt(req.params.id);
    return options;
  };

  return get;
};


/*

Mensajes de error:
{
  "error": true,
  "code": 400,
  "status": "Bad Request",
  "data": "Error en la petición"
}


Mensajes de respuesta:
{
  "code": 200,
  "status": "OK",
  "data": {
    "id_alumno": 1,
    "nombre": "Juan",
    "email": "juan@gmail.com",
    "telefono": 11111111,
    "id_usuario": 1,
    "_fecha_creacion": "2017-05-11T17:52:02.000Z",
    "_fecha_modificacion": "2017-05-11T17:52:02.000Z"
  }
}


*/
