module.exports = (app) => {
  const usuarioController = require('../../controllers/admin/usuario.controller')(app)

  app.get('/api/admin/v1/usuarios/', usuarioController.listar)
}
