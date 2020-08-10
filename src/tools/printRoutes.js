const listEndpoints = require('express-list-endpoints')

module.exports = (app) => {
  listEndpoints(app).forEach(route => {
    route.methods.map(method => {
      console.log(`${method.padEnd(7, ' ')} ${route.path}`)
    })
  })
  console.log()
}
