module.exports = (app) => {
  const authController = require('../../controllers/auth/auth.controller')(app)

  app.post('/auth/login', authController.login)
}
