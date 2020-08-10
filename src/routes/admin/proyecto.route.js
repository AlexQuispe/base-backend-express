module.exports = (app) => {
  const proyectoController = require('../../controllers/admin/proyecto.controller')(app)

  app.get('/api/admin/v1/proyectos/', proyectoController.listar)
}
