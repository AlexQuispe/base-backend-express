var sequelizeHandlers = require('sequelize-handlers');

module.exports = app => {
  var Alumno = app.src.db.models.alumno;

  //app.get('/alumnos', sequelizeHandlers.query(alumno));
  //app.get('/alumnos/:id', sequelizeHandlers.get(alumno));
  //app.post('/alumnos', sequelizeHandlers.create(Alumno));
  //app.put('/alumnos/:id', sequelizeHandlers.update(Alumno));
  //app.delete('/alumnos/:id', sequelizeHandlers.remove(Alumno));

  function getQueryOptions(query) {
    var offset = parseInt(query.offset) || 0; // ?offset=1
    var limit = (parseInt(query.limit) || 50) + offset; // ?limit=10
    var attributes = query.fields ? query.fields.split(",") : []; // ?fields=nombre,email
    var order = query.sort || "id_alumno asc"; // ?sort=email desc
    var where = {}; // ?nombre=carlos
    if(query.nombre) where.nombre = query.nombre;
    if(query.email) where.email = query.email;
    if(query.telefono) where.telefono = query.telefono;
    var options = {};
    options.offset = offset;
    options.limit = limit;
    if (query.fields) options.attributes = attributes;
    if (query.sort) options.order = order;
    if (where != {}) options.where = where;
    return options;
  }

  app.get('/alumnos', function(req, res, next) {
    Alumno.findAll(getQueryOptions(req.query))
    .then(function(result) {
      res.set('Content-Type','application/json');
      res.status(200).json(result);
    }).catch(function (err) {
      res.status(400).json({"error": "Algunos parámetros no son válidos"});
    });
  });

  app.get('/alumnos/:id', function(req, res, next) {
    var queryOptions = getQueryOptions(req.query);
    queryOptions.where.id_alumno = parseInt(req.params.id);
    Alumno.findOne(queryOptions)
    .then(function(result) {
      if (result == null) {
        res.status(404).json({"error":"El recurso solicitado no existe"});
      } else {
        res.set('Content-Type','application/json');
        res.status(200).json(result);
      }
    }).catch(function (err) {
      res.status(400).json({"error": "Algunos parámetros no son válidos"});
    });
  });

  app.post('/alumnos', function(req, res, next) {
    Alumno.build(req.body).save()
    .then(function(result) {
      if (result == null) {
        res.status(404).json({"error":"El recurso solicitado no existe"});
      } else {
        res.set('Content-Type','application/json');
        res.status(201).json(result);
      }
    }).catch(function (err) {
      res.status(400).json({"error": "Algunos parámetros no son válidos"});
    });
  });

  app.put('/alumnos/:id', function(req, res, next) {
    Alumno.update(req.body,{where:{id_alumno:req.params.id}})
    .then(function(result) {
      if (result == null) {
        res.status(404).json({"error":"El recurso solicitado no existe"});
      } else {
        res.set('Content-Type','application/json');
        res.status(200).json(result);
      }
    }).catch(function (err) {
      res.status(400).json({"error": "Algunos parámetros no son válidos"});
    });
  });

  app.delete('/alumnos/:id', function(req, res, next) {
    Alumno.destroy({where:{id_alumno:req.params.id}})
    .then(function(result) {
      if (result == null) {
        res.status(404).json({"error":"El recurso solicitado no existe"});
      } else {
        res.set('Content-Type','application/json');
        res.status(204).json(result);
      }
    }).catch(function (err) {
      res.status(400).json({"error": "No es posible eliminar el recurso"});
    });
  });

  return Alumno;
};
