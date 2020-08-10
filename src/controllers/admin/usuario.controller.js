module.exports = (app) => {
  const Usuario = app.db.models.usuario
  const CONTROLLER = {}

  CONTROLLER.listar = async (req, res, next) => {
    try {
      const usuarios = await Usuario.findAll()
      const DATA = JSON.parse(JSON.stringify(usuarios))

      return res.success200(DATA, 'task completed successfully')
    } catch (e) { return next(e) }
  }

  return CONTROLLER
}
