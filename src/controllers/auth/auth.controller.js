const passport = require('passport')
const jwt      = require('jsonwebtoken')

const logger = require('../../tools/logger')

module.exports = (app) => {
  const CONTROLLER = {}

  CONTROLLER.login = async (req, res, next) => {
    try {
      return passport.authenticate('local', { session: false }, (err, usuario) => {
        if (err) {
          logger.error('Login failed', err)
          return res.error400('Login failed')
        }

        req.login(usuario, { session: false }, (err) => {
          if (err) { return res.error500(err) }
          const jwtPayload = {
            id       : usuario.id,
            username : usuario.username,
            nombre   : usuario.nombre,
            rol      : usuario.rol,
          }
          const token = jwt.sign(jwtPayload, app.config.AUTH.JWT_SECRET)
          const DATA = { usuario: jwtPayload, token }
          return res.success200(DATA, 'Login successfully')
        })
      })(req, res)
    } catch (e) { return next(e) }
  }

  return CONTROLLER
}
