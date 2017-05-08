var sequelizeHandlers = require('sequelize-handlers');

module.exports = app => {
  var Alumno = app.src.db.models.alumno;

  //app.get('/alumnos', sequelizeHandlers.query(alumno));
  //app.get('/alumnos/:id', sequelizeHandlers.get(alumno));
  //app.post('/alumnos', sequelizeHandlers.create(Alumno));
  //app.put('/alumnos/:id', sequelizeHandlers.update(Alumno));
  //app.delete('/alumnos/:id', sequelizeHandlers.remove(Alumno));

  app.get('/alumnos', function(req, res, next) {
    Alumno.findAll()
    .then(function(result) {
      res.set('Content-Type','application/json');
      res.status(200).json(result);
    });
  });

  app.get('/alumnos/:id', function(req, res, next) {
    Alumno.findById(req.params.id)
    .then(function(result) {
      if (result == null) {
        res.status(404).json({});
      } else {
        res.set('Content-Type','application/json');
        res.status(200).json(result);
      }
    });
  });

  app.post('/alumnos', function(req, res, next) {
    var body = req.body;
    Alumno.build(body)
    .save()
    .then(function(result) {
      res.set('Content-Type','application/json');
      res.status(201).json(result);
    });
  });

  app.put('/alumnos/:id', function(req, res, next) {
    Alumno.update(req.body,{where:{id_alumno:req.params.id}})
    .then(function(result) {
      res.set('Content-Type','application/json');
      res.status(200).json(result);
    });
  });

  app.delete('/alumnos/:id', function(req, res, next) {
    Alumno.destroy({where:{id_alumno:req.params.id}})
    .then(function(result) {
      res.set('Content-Type','application/json');
      res.status(204).json({});
    });
  });

  return Alumno;
};
