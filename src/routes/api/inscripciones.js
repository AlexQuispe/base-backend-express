'use strict';
var sh = require('../../libs/sequelize-handlers/index');

module.exports = function(app) {
  var Inscripcion = app.src.db.models.inscripcion;

  app.get('/api/inscripciones', sh.query(Inscripcion));
  app.get('/api/inscripciones/:id', sh.get(Inscripcion));
  app.post('/api/inscripciones', sh.create(Inscripcion));
  app.put('/api/inscripciones/:id', sh.update(Inscripcion));
  app.delete('/api/inscripciones/:id', sh.remove(Inscripcion));
};
