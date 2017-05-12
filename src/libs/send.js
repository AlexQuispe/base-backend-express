'use strict';

module.exports = {
  success200: function(res, data) {
    var jsonData = data ? {success: "Ok", data: data} : {success: "Ok"};
    res.status(200).json(jsonData);
  },
  success201: function(res, data) {
    var jsonData = data ? {success: "Ok", data: data} : {success: "Ok"};
    res.status(201).json(jsonData);
  },
  success204: function(res) {
    res.status(204).json({success: "Ok"});
  },
  error400: function(res, data) {
    res.status(400).json({success: "Fail", data: data || "Error en la petición"});
  },
  error401: function(res, data) {
    res.status(401).json({success: "Fail", data: data || "Requiere autenticación"});
  },
  error403: function(res, data) {
    res.status(403).json({success: "Fail", data: data || "Acceso denegado"});
  },
  error404: function(res, data) {
    res.status(404).json({success: "Fail", data: data || "El recurso no existe"});
  },
  error500: function(res, data) {
    res.status(500).json({success: "Fail", data: data || "Error del servidor"});
  }
};
