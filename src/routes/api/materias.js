'use strict';
var sh = require('../../libs/sequelize-handlers/index');

module.exports = function(app) {
  var Materia = app.src.db.models.materia;

  app.get('/api/materias', sh.query(Materia));
  app.get('/api/materias/:id', sh.get(Materia));
  app.post('/api/materias', sh.create(Materia));
  app.put('/api/materias/:id', sh.update(Materia));
  app.delete('/api/materias/:id', sh.remove(Materia));
};
