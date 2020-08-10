const express    = require('express')
const bodyParser = require('body-parser')
const helmet     = require('helmet')
const cors       = require('cors')
const path       = require('path')
const passport   = require('passport')
const uuid       = require('uuid/v4')
const morgan     = require('morgan')

const { Response } = require('response-handler')
const { Database } = require('database-handler')

const config      = require('./config/app.config')
const util        = require('./tools/util')
const printRoutes = require('./tools/printRoutes')
const logger      = require('./tools/logger')

const { errors } = require('response-handler')
const { BadRequest, InternalServer, NotFound } = errors

const app = express()

const db = new Database(config.DATABASE)
db.loadModels(path.resolve(__dirname, 'models'))

app.config = config
app.db     = db

// Set request ID for logs
app.use((req, res, next) => {
  req.id = uuid()
  return next()
})

// Set response handler
const successFormat = (result) => {
  const RESULT = {
    message: result.message,
  }
  if (typeof result.data !== 'undefined') { RESULT.data = result.data }
  if (typeof result.metadata !== 'undefined') { RESULT.metadata = result.metadata }
  return RESULT
}
const errorFormat = (result) => {
  const RESULT = {
    message : result.message,
    errors  : result.errors,
  }
  if (typeof result.errors !== 'undefined') {
    RESULT.errors = result.errors.map(err => { if (process.env.NODE_ENV === 'production') delete err.dev; return err })
  }
  return RESULT
}
app.use(Response.success({ format: successFormat }))
app.use(Response.error({ format: errorFormat }))

// Set options hanlder
app.use((req, res, next) => {
  if (req.method.toLowerCase() === 'options') { return res.success200() }
  return next()
})

// Set request parse to json
app.use(bodyParser.json())

// Set security options
app.use(cors({
  origin            : '*',
  methods           : 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  preflightContinue : true,
  allowedHeaders    : 'Authorization,Content-Type,Content-Length',
}))
app.use(helmet())

// Set public folder
app.use('/public', express.static(app.config.PATH.public))

// Show request logs
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Service to see the service status
app.get('/status', (req, res) => {
  return res.success200(undefined, `Service running in ${config.SERVER.env} mode`)
})

// Set auth module
require('./authentication/passport').init(app)
app.use(passport.initialize())

// Protege las rutas admin
app.use('/api/admin', passport.authenticate('jwt', { session: false }))

// Load all routes
const routesPath = path.resolve(__dirname, 'routes')
util.find(routesPath, '.route.js', ({ filePath }) => { require(filePath)(app) })

// Route error handler
app.use((req, res, next) => next(NotFound.create(`Ruta no definida. ${req.method} ${req.originalUrl}`)))

// Set error handler
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    err = BadRequest.create('Error de sintaxis, posiblemente en el formato JSON.')
  }

  if (err && (err.name !== 'ResponseHandlerError')) {
    err = InternalServer.create(err)
  }

  logger.error('', err)
  return res.error(err)
})

printRoutes(app)

// Start service
app.listen(config.SERVER.port)
logger.info(`App running on port ${config.SERVER.port}`)

module.exports = app
