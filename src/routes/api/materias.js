'use strict';
var sh = require('../../libs/sequelize-handlers/index');

module.exports = function(app) {
  var Materia = app.src.db.models.materia;

  app.get('/materias', sh.query(Materia));
  app.get('/materias/:id', sh.get(Materia));
  app.post('/materias', sh.create(Materia));
  app.put('/materias/:id', sh.update(Materia));
  app.delete('/materias/:id', sh.remove(Materia));
};
