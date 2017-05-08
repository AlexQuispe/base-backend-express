var sequelizeHandlers = require('sequelize-handlers');

module.exports = app => {
  var materia = app.src.db.models.materia;

  app.get('/materias', sequelizeHandlers.query(materia));
  app.get('/materias/:id', sequelizeHandlers.get(materia));
  app.post('/materias', sequelizeHandlers.create(materia));
  app.put('/materias/:id', sequelizeHandlers.update(materia));
  app.delete('/materias/:id', sequelizeHandlers.remove(materia));

  return materia;
};
