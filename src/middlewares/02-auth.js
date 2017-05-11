'use strict';
var errorResponse = require('../libs/sequelize-handlers/errors');
var jwt = require('jwt-simple');

module.exports = function(app) {
  var configuracion = app.src.config.config;
  var RolRuta = app.src.db.models.rol_ruta;
  var Ruta = app.src.db.models.ruta;
  var Rol = app.src.db.models.rol;

  app.use('/api', function(req, res, next) {
    if (req.method == 'OPTIONS') {
      next();
    }
    // Verifica que el token se encuentre en header Authorization
    var token = req.headers.authorization;
    if (!token) {
      return res.status(401).json(errorResponse.err401);
    }
    // Verifica si el token es válido
    try {
      var tokenDecoded = jwt.decode(token, configuracion.jwtSecret);
    } catch (err) {
      return res.status(401).json({error:"Token inválido"});
    }
    // Verifica si el token ha expirado
    if (tokenDecoded.exp <= Date.now()) {
      return res.status(401).json({error:"El token de acceso ha expirado"});
    }

    RolRuta.findAll({
      where: {
        id_rol: tokenDecoded.data.id_rol
      },
      attributes: ['id_rol', 'access_get', 'access_post', 'access_put', 'access_delete'],
      include: [
        {model: Ruta, as: 'ruta', attributes: ['id_ruta','nombre']},
      ]
    })
    .then(function(result) {
      var tieneAcceso = false;
      var id_ruta = 0;
      for (var i = 0; i < result.length; i++) {
        var ruta = result[i].ruta;
        if(req.originalUrl.indexOf(ruta.nombre) >= 0) {
          //Acceso autorizado
          id_ruta = ruta.id_ruta;
          tieneAcceso = true;
          break;
        }
      }

      if (tieneAcceso) {
        req.body.usuario_autenticado = tokenDecoded.data;
        next();
      } else {
        return res.status(403).json(errorResponse.err403);
      }

    }).catch(function (err) {
      return res.status(403).json(errorResponse.err403);
    });
  });
};
