module.exports = (app) => {
  const proyectoController = require('../../controllers/client/proyecto.controller')(app)

  app.get('/api/v1/proyectos/', proyectoController.listar)
}
