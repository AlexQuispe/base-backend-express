var sequelizeHandlers = require('sequelize-handlers');

module.exports = app => {
  var alumno = app.src.db.models.alumno;

  app.get('/alumnos', sequelizeHandlers.query(alumno));
  app.get('/alumnos/:id', sequelizeHandlers.get(alumno));
  app.post('/alumnos', sequelizeHandlers.create(alumno));
  app.put('/alumnos/:id', sequelizeHandlers.update(alumno));
  app.delete('/alumnos/:id', sequelizeHandlers.remove(alumno));

  return alumno;
};
