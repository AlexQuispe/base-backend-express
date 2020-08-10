const passport      = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy   = require('passport-jwt').Strategy
const ExtractJwt    = require('passport-jwt').ExtractJwt

const util = require('../tools/util')

function init (app) {
  const Usuario = app.db.models.usuario

  passport.serializeUser((usuario, cb) => {
    cb(null, usuario.id)
  })

  passport.deserializeUser((idUsuario, cb) => {
    Usuario.findOne({ where: { id: idUsuario } })
      .then(usuario => { cb(null, JSON.parse(JSON.stringify(usuario))) })
      .catch(err => cb(err))
  })

  passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
    try {
      const usuario = await Usuario.findOne({ where: { username } })
      if (usuario.password !== util.md5(password)) {
        return done(null, false)
      }
      return done(null, JSON.parse(JSON.stringify(usuario)))
    } catch (err) { done(err) }
  }))

  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey    = app.config.AUTH.JWT_SECRET

  passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const userData = jwtPayload
      const usuario = await Usuario.findOne({ where: { id: userData.id } })
      done(null, JSON.parse(JSON.stringify(usuario)))
    } catch (err) { done(err) }
  }))

  passport.autenticar = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.error401()
    }
    return next()
  }
}

module.exports = { init }
