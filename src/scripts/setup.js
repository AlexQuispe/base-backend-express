const path = require('path')

const config = require('../config/app.config')

const { Database } = require('database-handler')

async function init () {
  const DB = new Database(config.DATABASE)
  DB.loadModels(path.resolve(__dirname, '../models'))

  await DB.dropDatabase()
  await DB.createDatabase()
  await DB.createTables()

  await DB.runSeeders(path.resolve(__dirname, '../seeders'))

  await DB.closeConnection()
}

init()
  .then(() => { console.log('Base de datos creado exitosamente. :)') })
  .catch(error => { console.log('Ocurrió un error inesperado. :(\n', error) })
