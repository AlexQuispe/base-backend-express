const { createLogger, format, transports } = require('winston')
const path = require('path')

const { File, Console } = transports

// Log files path
const ERROR_LOGS_PATH = path.resolve(__dirname, '../../logs')

// Init Logger
const logger = createLogger({
  level: 'info',
})

/**
 * For production write to all logs with level `info` and below
 * to `combined.log. Write all logs error (and below) to `error.log`.
 * For development, print to the console.
 */
if (process.env.NODE_ENV === 'production') {
  const fileFormat = format.combine(format.timestamp(), format.json())
  const errTransport = new File({
    filename : path.resolve(ERROR_LOGS_PATH, 'error.log'),
    format   : fileFormat,
    level    : 'error',
  })
  const infoTransport = new File({
    filename : path.resolve(ERROR_LOGS_PATH, 'combined.log'),
    format   : fileFormat,
  })
  logger.add(errTransport)
  logger.add(infoTransport)
} else {
  const errorStackFormat = format((info) => {
    if (info.stack) {
      console.log(info.stack)
      return false
    }
    return info
  })
  const consoleTransport = new Console({
    format: format.combine(format.colorize(), format.simple(), errorStackFormat()),
  })
  logger.add(consoleTransport)
}

module.exports = logger
