module.exports = (app) => {
  const Proyecto = app.db.models.proyecto
  const CONTROLLER = {}

  CONTROLLER.listar = async (req, res, next) => {
    try {
      const proyectos = await Proyecto.findAll()
      const DATA = JSON.parse(JSON.stringify(proyectos))

      return res.success200(DATA, 'task completed successfully')
    } catch (e) { return next(e) }
  }

  return CONTROLLER
}
