'use strict';
var send = require('../libs/send');
var jwt = require('jwt-simple');

module.exports = function(app) {
  var RolRuta = app.src.db.models.rol_ruta;
  var Ruta = app.src.db.models.ruta;
  var Rol = app.src.db.models.rol;

  app.use('/api', function(req, res, next) {
    if (req.method == 'OPTIONS') {
      next();
    }
    // Tipo de contenido por defecto JSON
    res.set('Content-Type','application/json');
    // Verifica que el token se encuentre en header Authorization
    var token = req.headers.authorization;
    if (!token) {
      return send.error401(res, "Requiere un token");
    }
    // Verifica si el token es válido
    try {
      var tokenDecoded = jwt.decode(token, app.src.config.config.jwtSecret);
    } catch (err) {
      return send.error401(res, "Tóken inválido");
    }
    // Verifica si el token ha expirado
    if (tokenDecoded.exp <= Date.now()) {
      return send.error401(res, "Tóken expirado");
    }

    RolRuta.findAll({
      where: {
        id_rol: tokenDecoded.data.id_rol
      },
      attributes: ['id_rol', 'access_get', 'access_post', 'access_put', 'access_delete'],
      include: [
        {model: Ruta, as: 'ruta', attributes: ['nombre']},
      ]
    })
    .then(function(result) {
      var tieneAcceso = false;
      var id_ruta = 0;
      for (var i = 0; i < result.length; i++) {
        var ruta = result[i].ruta;
        if(req.originalUrl.indexOf(ruta.nombre) >= 0) {
          //Acceso autorizado
          tieneAcceso = true;
          break;
        }
      }

      if (tieneAcceso) {
        req.body.usuario_autenticado = tokenDecoded.data;
        next();
      } else {
        return send.error403(res, "Acceso denegado");
      }

    }).catch(function (err) {
      return send.error401(res, "Error en el servidor");
    });
  });
};
