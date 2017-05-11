'use strict';
var errorResponse = require('../../libs/sequelize-handlers/errors');
var jwt = require('jwt-simple');
var crypto = require('crypto');

module.exports = function(app) {
  var usuario = app.src.db.models.usuario;

  app.post('/auth/login', function(req, res, next) {
    var body = req.body;
    if(!body.hasOwnProperty('usuario') || !body.hasOwnProperty('contrasena')) {
      return res.status(400).json(errorResponse.err400);
    }
    var user = body.usuario;
    var pass = crypto.createHash("md5").update(body.contrasena).digest("hex");
    usuario.findOne({where:{usuario:user,contrasena:pass}})
    .then(function(usuario) {
      if (!usuario) {
        return res.status(200).json({error:"Usuario y/o contraseña incorrecta"});
      }
      var data = {
        token: generateToken(usuario),
        usuario: usuario
      }
      res.status(200).json(data);
    }).catch(function (err) {
      res.status(400).json(errorResponse.err400);
    });
  });

  function generateToken(data) {
    // Convierte un número en base 36, luego obtiene los 10 primeros caracteres
    // despues del punto decimal
    var tokenId = Math.random().toString(36).substr(2, 10) + "";
    var issuedAt = Date.now();            // tiempo actual en milisegundos
    var expire = issuedAt + 86400000;     // 1 dia = 86400 segundos = 86400000 milisegundos
    var token = {
      iat: issuedAt,         // Issued at: Tiempo en que se generó el token
      jti: tokenId,          // Json Token Id: Identificador único para el token
      exp: expire,           // Tiempo en que el token expirará
      data: data
    };
    var tokenEncrypted = jwt.encode(token, app.src.config.config.jwtSecret);
    return tokenEncrypted;
  }

};
