'use strict';
var errorResponse = require('../libs/sequelize-handlers/errors');
var jwt = require('jwt-simple');

module.exports = function(app) {
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
      var tokenDecoded = jwt.decode(token, app.src.config.config.jwtSecret);
    } catch (err) {
      return res.status(401).json({error:"Token inválido"});
    }
    // Verifica si el token ha expirado
    if (tokenDecoded.exp <= Date.now()) {
      return res.status(401).json({error:"El token de acceso ha expirado"});
    }

    //var rutaConAcceso = "/api/alumnos";
    //console.log("Accediendo a ", req.originalUrl);

    // Verifica si tiene acceso a esa ruta
    /*if(req.originalUrl.indexOf(rutaConAcceso) < 0) {
      return res.status(403).json(errorResponse.err403);
    }*/

    // Usuario Autenticado y Con acceso a esta ruta
    // Guarda los datos del usuario en el body de la peticion
    req.body.usuario_autenticado = tokenDecoded.usuario;

    next();
  });
};
