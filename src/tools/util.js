const crypto = require('crypto')
const path   = require('path')
const fs     = require('fs')

/**
* Devuelve una lista que contiene información de los archivos encontrados.
* Adicionalmente puede ejecutar una función (onFind) cuando encuentra un archivo.
* @param {String}   dirPath                - Directorio de búsqueda.
* @param {String}   ext                    - Extensión del archivo.
* @param {Function} [onFind]               - Función que se ejecuta cuando encuentra el archivo.
* @param {Object}   [options]              - Opciones adicionales de búsqueda
* @param {String[]} [options.ignoredPaths] - Lista de las rutas que serán ignoradas
* @return {Object[]}
* @property {!String} fileName - Nombre del archivo, sin la extensión.
* @property {!String} filePath - Ruta absoluta del archivo.
* @property {!String} dirName  - Nombre del directorio dond se encuentra el archivo.
* @property {!String} dirPath  - Ruta absoluta del directorio donde se encuentra el archivo.
* @property {!String} fileExt  - Extensión del archivo.
* @example
* const result = util.find('/search/path', '.config.js', (fileInfo) => {
*   console.log('FileName = ', fileInfo.fileName)
*   console.log('FilePath = ', fileInfo.filePath)
*   console.log('DirName  = ', fileInfo.dirName)
*   console.log('DirPath  = ', fileInfo.dirPath)
*   console.log('FileExt  = ', fileInfo.fileExt)
* })
* console.log(result) // Muestra una lista de todos los archivos encontrados
*/
exports.find = function find (dirPath, ext, onFind, options = {}) {
  options.ignoredPaths = options.ignoredPaths || []
  const result = []
  function _isIgnored (filePath) {
    for (const i in options.ignoredPaths) {
      if (filePath.startsWith(options.ignoredPaths[i])) { return true }
    }
  }
  function _find (filePath) {
    if (_isIgnored(filePath)) { return }
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

/**
* Devuelve una lista que contiene información de los archivos encontrados.
* Adicionalmente puede ejecutar una función (async onFind) cuando encuentra un archivo.
* @param {String}        dirPath           - Directorio de búsqueda.
* @param {String}        ext               - Extensión del archivo.
* @param {AsyncFunction} onFind            - Función asíncrona que se ejecuta cuando
*                                            encuentra el archivo.
* @param {Object}   [options]              - Opciones adicionales de búsqueda
* @param {String[]} [options.ignoredPaths] - Lista de las rutas que serán ignoradas
* @return {Promise<Object[]>}
* @property {!String} fileName - Nombre del archivo, sin la extensión.
* @property {!String} filePath - Ruta absoluta del archivo.
* @property {!String} dirName  - Nombre del directorio dond se encuentra el archivo.
* @property {!String} dirPath  - Ruta absoluta del directorio donde se encuentra el archivo.
* @property {!String} fileExt  - Extensión del archivo.
* @example
* const result = await util.findAsync('/search/path', '.config.js', async (fileInfo) => {
*   console.log('FileName = ', fileInfo.fileName)
*   console.log('FilePath = ', fileInfo.filePath)
*   console.log('DirName  = ', fileInfo.dirName)
*   console.log('DirPath  = ', fileInfo.dirPath)
*   console.log('FileExt  = ', fileInfo.fileExt)
* })
* console.log(result) // Muestra una lista de todos los archivos encontrados
*/
exports.findAsync = async function findAsync (dirPath, ext, onFind, options = {}) {
  options.ignoredPaths = options.ignoredPaths || []
  const result = []
  function _isIgnored (filePath) {
    for (const i in options.ignoredPaths) {
      if (filePath.startsWith(options.ignoredPaths[i])) { return true }
    }
  }
  async function _find (filePath) {
    if (_isIgnored(filePath)) { return }
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

/**
* Crea un hash md5 a partir de una cadena de texto.
* @param {!String} str - Cadena de texto.
* @return {String}
*/
exports.md5 = (str) => {
  return crypto.createHash('md5').update(str + '').digest('hex')
}
