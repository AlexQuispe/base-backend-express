'use strict';
var sh = require('../../libs/sequelize-handlers/index');

module.exports = function(app) {
  var Alumno = app.src.db.models.alumno;

  app.get('/api/alumnos', sh.query(Alumno));
  app.get('/api/alumnos/:id', sh.get(Alumno));
  app.post('/api/alumnos', sh.create(Alumno));
  app.put('/api/alumnos/:id', sh.update(Alumno));
  app.delete('/api/alumnos/:id', sh.remove(Alumno));
};
