'use strict';
var sh = require('../../libs/sequelize-handlers/index');

module.exports = function(app) {
  var Inscripcion = app.src.db.models.inscripcion;

  app.get('/inscripciones', sh.query(Inscripcion));
  app.get('/inscripciones/:id', sh.get(Inscripcion));
  app.post('/inscripciones', sh.create(Inscripcion));
  app.put('/inscripciones/:id', sh.update(Inscripcion));
  app.delete('/inscripciones/:id', sh.remove(Inscripcion));
};
