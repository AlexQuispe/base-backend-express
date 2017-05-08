var sequelizeHandlers = require('sequelize-handlers');

module.exports = app => {
  var inscripcion = app.src.db.models.inscripcion;

  app.get('/inscripciones', sequelizeHandlers.query(inscripcion));
  app.get('/inscripciones/:id', sequelizeHandlers.get(inscripcion));
  app.post('/inscripciones', sequelizeHandlers.create(inscripcion));
  app.put('/inscripciones/:id', sequelizeHandlers.update(inscripcion));
  app.delete('/inscripciones/:id', sequelizeHandlers.remove(inscripcion));

  return inscripcion;
};
