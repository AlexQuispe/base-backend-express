'use strict';
var sh = require('../../libs/sequelize-handlers/index');

module.exports = function(app) {
  var Alumno = app.src.db.models.alumno;

  app.get('/alumnos', sh.query(Alumno));
  app.get('/alumnos/:id', sh.get(Alumno));
  app.post('/alumnos', sh.create(Alumno));
  app.put('/alumnos/:id', sh.update(Alumno));
  app.delete('/alumnos/:id', sh.remove(Alumno));
};
