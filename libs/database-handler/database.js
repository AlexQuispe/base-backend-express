const SeedCreator = require('seed-creator')
const Sequelize   = require('sequelize')
const path        = require('path')
const fs          = require('fs')
const _           = require('lodash')

class Database {
  /**
   * @param {!Object} dbconfig - Configuración de sequelize
   * @param {!Object} options  - Opciones
   */
  constructor (dbconfig) {
    this.dbconfig = dbconfig

    this.sequelize = _createSequelize(dbconfig)
    this.Sequelize = null
    this.models = {}
  }

  /**
   * Carga los modelos
   * @param {!String} [modelsPath]      - Ruta de la carpeta models
   * @param {String}  [modelsExt='.js'] - Extensión del archivo model
   */
  loadModels (modelsPath, modelsExt = '.js') {
    const db = this
    db.models = _loadModels(db.sequelize, modelsPath, modelsExt)
  }

  async createDatabase () {
    const db = this
    const DATABASE = db.dbconfig.database
    let sequelizeROOT
    try {
      sequelizeROOT = _createRootInstance(db.dbconfig)
      await sequelizeROOT.authenticate()
      await sequelizeROOT.query(`CREATE DATABASE ${DATABASE}`)
      console.log('CREATE', `DATABASE ${DATABASE} ... ok`)
    } catch (e) {
      const DIALECT = db.dbconfig.params.dialect
      const DATABASE_ALREADY_EXIST = (
        (DIALECT === 'postgres' && e.parent.code   === '42P04')               ||
        (DIALECT === 'mysql'    && e.parent.code   === 'ER_DB_CREATE_EXISTS') ||
        (DIALECT === 'mssql'    && e.parent.number === 1801)                  ||
        (DIALECT === 'sqlite'   && e.parent.code   === 'SQLITE_ERROR')
      )
      if (e.name === 'SequelizeDatabaseError' && DATABASE_ALREADY_EXIST) {
        console.log('CREATE', `DATABASE ${DATABASE} ... (Ya existe) ok`)
      } else {
        console.log('CREATE', `DATABASE ${DATABASE} ... x`)
        throw e
      }
    } finally {
      await sequelizeROOT.close()
    }
  }

  async dropDatabase () {
    const db = this
    const DATABASE = db.dbconfig.database
    let sequelizeROOT
    try {
      sequelizeROOT = _createRootInstance(db.dbconfig)
      await sequelizeROOT.authenticate()
      await sequelizeROOT.query(`DROP DATABASE ${DATABASE}`)
      console.log('DROP', `DATABASE ${DATABASE} ... ok`)
    } catch (e) {
      const DIALECT = db.dbconfig.params.dialect
      const DATABASE_DOES_NOT_EXISTS = (
        (DIALECT === 'postgres' && e.parent.code   === '3D000')             ||
        (DIALECT === 'mysql'    && e.parent.code   === 'ER_DB_DROP_EXISTS') ||
        (DIALECT === 'mssql'    && e.parent.number === 3701)                ||
        (DIALECT === 'sqlite'   && e.parent.code   === 'SQLITE_ERROR')
      )
      if (e.name === 'SequelizeDatabaseError' && DATABASE_DOES_NOT_EXISTS) {
        console.log('DROP', `DATABASE ${DATABASE} ... (No existe) ok`)
      } else {
        console.log('DROP', `DATABASE ${DATABASE} ... x`)
        throw e
      }
    } finally {
      await sequelizeROOT.close()
    }
  }

  async createTables () {
    const db = this
    const loaded = []
    async function _sync (MODEL) {
      if (MODEL.associations) {
        for (const i in MODEL.associations) {
          const ASSOCIATION = MODEL.associations[i]
          if (ASSOCIATION.associationType === 'BelongsTo') {
            if (!loaded.includes(ASSOCIATION.target.name)) {
              await _sync(ASSOCIATION.target)
            }
          }
        }
      }
      await _createTable(MODEL, db)
      loaded.push(MODEL.name)
    }
    for (const key in db.models) {
      if (!loaded.includes(key)) {
        await _sync(db.models[key])
      }
    }
  }

  async dropTables () {
    const db = this
    const loaded = []
    async function _sync (MODEL) {
      if (MODEL.associations) {
        for (const i in MODEL.associations) {
          const ASSOCIATION = MODEL.associations[i]
          if (ASSOCIATION.associationType === 'BelongsTo') {
            if (!loaded.includes(ASSOCIATION.target.name)) {
              await _sync(ASSOCIATION.target)
            }
          }
        }
      }
      await _dropTable(MODEL, db)
      loaded.push(MODEL.name)
    }
    for (const key in db.models) {
      if (!loaded.includes(key)) {
        await _sync(db.models[key])
      }
    }
  }

  async runSeeders (seedersPath, seedersExt = '.js') {
    const db = this
    const loaded     = []
    await db.sequelize.transaction(async (t) => {
      async function _seed (modelName, filePath) {
        const model = db.models[modelName]
        if (model.associations) {
          for (const i in model.associations) {
            if (model.associations[i].associationType === 'BelongsTo') {
              if (!loaded.includes(model.associations[i].target.name)) {
                await findAsync(seedersPath, seedersExt, async ({ fileName, filePath }) => {
                  if (fileName === model.associations[i].target.name) {
                    await _seed(fileName, filePath)
                  }
                })
              }
            }
          }
        }
        loaded.push(modelName)
        await _createSeed(model, t, filePath)
      }

      await findAsync(seedersPath, seedersExt, async ({ fileName, filePath }) => {
        if (!loaded.includes(fileName)) {
          await _seed(fileName, filePath)
        }
      })
    })
  }

  async closeConnection () {
    return this.sequelize.close()
  }
}

module.exports = Database

function _createSequelize (dbconfig) {
  try {
    return new Sequelize(
      dbconfig.database,
      dbconfig.username,
      dbconfig.password,
      dbconfig.params,
    )
  } catch (err) {
    if (err.name === 'SequelizeConnectionError') {
      console.log('No se pudo conectar con la base de datos.')
      process.exit(1)
    }
    throw err
  }
}

function _loadModels (sequelize, modelsPath, modelsExt) {
  const models = {}
  find(modelsPath, modelsExt, ({ fileName, filePath }) => {
    models[fileName] = sequelize.import(filePath)
  })
  Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) { models[key].associate(models) }
    _updateForeignKeys(models, models[key])
  })
  return models
}

function _updateForeignKeys (models, MODEL) {
  Object.keys(MODEL.rawAttributes).forEach(fieldName => {
    const FIELD = MODEL.rawAttributes[fieldName]
    if (FIELD.references) {
      const F_TARGET = FIELD.targetKey
      const F_MODEL = FIELD.references.model
      let F_MODEL_INSTANCE
      if (typeof F_MODEL === 'string') {
        F_MODEL_INSTANCE = models[F_MODEL]
      } else {
        const F_TABLE  = FIELD.references.model.tableName
        F_MODEL_INSTANCE = models[F_TABLE]
      }
      FIELD.validate = F_MODEL_INSTANCE.rawAttributes[F_TARGET].validate
      FIELD.comment  = FIELD.comment || F_MODEL_INSTANCE.rawAttributes[F_TARGET].comment
      FIELD.example  = FIELD.example || F_MODEL_INSTANCE.rawAttributes[F_TARGET].example
    }
  })
}

function _createRootInstance (dbconfig) {
  const DIALECT = dbconfig.params.dialect
  let database = null
  switch (DIALECT) {
    case 'postgres' : database = 'postgres'; break
    case 'mysql'    : database = null;       break
    case 'mssql'    : database = 'master';   break
    case 'sqlite'   : database = 'database'; break
    default: database = null
  }
  const username = dbconfig.username
  const password = dbconfig.password
  const params   = _.cloneDeep(dbconfig.params)
  return new Sequelize(database, username, password, params)
}

async function _createTable (MODEL, db) {
  const MAX          = 10
  const schema       = MODEL.options.schema ? `${MODEL.options.schema}.` : ''
  const tableNameLog = `${_.padEnd(`${schema}${MODEL.name} `, MAX, '.')}`
  try {
    if (await _existTable(MODEL, db)) {
      console.log('CREATE', `TABLE ${tableNameLog} (Ya existe) ok`)
    } else {
      await MODEL.sync({ force: true })
      console.log('CREATE', `TABLE ${tableNameLog} ok`)
    }
  } catch (e) {
    console.log('CREATE', `TABLE ${tableNameLog} x\n`)
    throw e
  }
}

async function _dropTable (MODEL, db) {
  const MAX          = 10
  const schema       = MODEL.options.schema ? `${MODEL.options.schema}.` : ''
  const tableNameLog = `${_.padEnd(`${schema}${MODEL.name} `, MAX, '.')}`
  try {
    if (!await _existTable(MODEL, db)) {
      console.log('DROP', `TABLE ${tableNameLog} (No existe) ok`)
    } else {
      await MODEL.drop({ force: true })
      console.log('DROP', `TABLE ${tableNameLog} ok`)
    }
  } catch (e) {
    console.log('DROP', `TABLE ${tableNameLog} x\n`)
    throw e
  }
}

async function _existTable (MODEL, db) {
  try {
    const schema = MODEL.options.schema ? `${MODEL.options.schema}.` : ''
    await db.sequelize.query(`SELECT 1 FROM ${schema}${MODEL.name}`)
    return true
  } catch (e) {
    const DIALECT = db.dbconfig.params.dialect
    const TABLE_DOES_NOT_EXISTS = (
      (DIALECT === 'postgres' && e.parent.code   === '42P01')            || // ok
      (DIALECT === 'mysql'    && e.parent.code   === 'ER_NO_SUCH_TABLE') || // ok
      (DIALECT === 'mssql'    && e.parent.number === 208)                ||
      (DIALECT === 'sqlite'   && e.parent.code   === 'SQLITE_ERROR')
    )
    if (e.name === 'SequelizeDatabaseError' && TABLE_DOES_NOT_EXISTS) {
      return false
    }
    throw e
  }
}

async function _createSeed (MODEL, t, filePath) {
  const MAX         = 10
  const DATA        = await loadFile(filePath)
  const fileNameLog = _.padEnd(`${MODEL.name}`, MAX, '.')
  try {
    const result    = await SeedCreator.create(MODEL, DATA, { transaction: t })
    const resultMsg = result.entries !== 1 ? `Se insertaron ${result.entries} registros` : `Se insertó ${result.entries} registro`
    console.log('[resultado]', `${fileNameLog} (${resultMsg} en ${result.elapsedTime} seg.) ok\n`)
  } catch (e) {
    console.log('[resultado]', `${fileNameLog} x\n`)
    throw e
  }
}

function find (dirPath, ext, onFind) {
  const result = []
  function _find (filePath) {
    if (fs.statSync(filePath).isDirectory()) {
      fs.readdirSync(filePath).forEach((fileName) => {
        _find(path.resolve(filePath, fileName))
      })
    } else {
      if (filePath.endsWith(ext)) {
        const dirPath  = path.dirname(filePath)
        const fileName = filePath.split(path.sep).pop().replace(ext, '')
        const dirName  = dirPath.split(path.sep).pop()
        const fileExt  = ext
        const fileInfo = { filePath, dirPath, fileName, dirName, fileExt }
        if (onFind) { onFind(fileInfo) }
        result.push(fileInfo)
      }
    }
  }
  _find(dirPath)
  return result
}

async function findAsync (dirPath, ext, onFind) {
  const result = []
  async function _find (filePath) {
    if (fs.statSync(filePath).isDirectory()) {
      const directories = fs.readdirSync(filePath)
      for (const i in directories) {
        await _find(path.resolve(filePath, directories[i]))
      }
    } else {
      if (filePath.endsWith(ext)) {
        const dirPath  = path.dirname(filePath)
        const fileName = filePath.split(path.sep).pop().replace(ext, '')
        const dirName  = dirPath.split(path.sep).pop()
        const fileExt  = ext
        const fileInfo = { filePath, dirPath, fileName, dirName, fileExt }
        if (onFind) { await onFind(fileInfo) }
        result.push(fileInfo)
      }
    }
  }
  await _find(dirPath)
  return result
}

async function loadFile (filePath) {
  let content = {}
  try {
    if (fs.existsSync(filePath) && !(fs.statSync(filePath).isDirectory())) {
      content = require(filePath)
    }
    if (typeof content === 'function') {
      content = await content()
    }
  } catch (e) {
    console.log('[archivo]', `${filePath} x\n`)
    throw e
  }
  return content
}
