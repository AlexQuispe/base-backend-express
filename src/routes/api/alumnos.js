'use strict';
var sh = require('../../libs/sequelize-handlers/index');

module.exports = function(app) {
  var Alumno = app.src.db.models.alumno;

  /**
 * @apiDefine admin Rol: ADMIN
 * Solo los usuarios ADMIN pueden acceder a este recurso.
 */

 /**
 * @apiDefine user Rol: USER
 * Solo los usuarios USER pueden acceder a este recurso.
 */

  /**
  * @api {get} /api/alumno Obtener Alumnos
  * @apiName Otener alumnos
  * @apiGroup Alumno
  * @apiPermission admin
  * @apiPermission user
  * @apiVersion 1.0.0
  *
  * @apiSuccess {String} success Resultado de la petición.
  * @apiSuccess {Array} data Objeto que contiene una lista de alumnos.
  *
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 Ok
  * {
  *   "success": "Ok",
  *   "data": [
  *     {
  *       "id_alumno": 1,
  *       "nombre": "Juan",
  *       "email": "juan@gmail.com",
  *       "telefono": 22654665,
  *       "id_usuario": 1,
  *       "_fecha_creacion": "2017-05-12T14:07:00.000Z",
  *       "_fecha_modificacion": "2017-05-12T14:07:00.000Z"
  *     },
  *     {
  *       "id_alumno": 2,
  *       "nombre": "rosa",
  *       "email": "rosa@gmail.com",
  *       "telefono": 22984756,
  *       "id_usuario": 2,
  *       "_fecha_creacion": "2017-05-12T14:07:00.000Z",
  *       "_fecha_modificacion": "2017-05-12T14:07:00.000Z"
  *     },
  *     {
  *       "id_alumno": 3,
  *       "nombre": "ana",
  *       "email": "ana@gmail.com",
  *       "telefono": 78657775,
  *       "id_usuario": 3,
  *       "_fecha_creacion": "2017-05-12T14:07:00.000Z",
  *       "_fecha_modificacion": "2017-05-12T14:07:00.000Z"
  *     }
  *   ]
  * }
  */
  app.get('/api/alumnos', sh.query(Alumno));

  /**
  * @api {get} /api/alumno/:id Obtener un alumno
  * @apiName Otener un alumno
  * @apiGroup Alumno
  * @apiPermission admin
  * @apiPermission user
  * @apiVersion 1.0.0
  *
  * @apiParam {Number} id ID del alumno.
  *
  * @apiSuccess {String} success Resultado de la petición.
  * @apiSuccess {Object} data Objeto que contiene los datos del alumno.
  *
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 Ok
  * {
  *   "success": "Ok",
  *   "data": {
  *      "id_alumno": 1,
  *      "nombre": "Juan",
  *      "email": "juan@gmail.com",
  *      "telefono": 22654665,
  *      "id_usuario": 1,
  *      "_fecha_creacion": "2017-05-12T14:07:00.000Z",
  *      "_fecha_modificacion": "2017-05-12T14:07:00.000Z"
  *    }
  * }
  *
  * @apiErrorExample Error-Response: 400 Bad Request
  * HTTP/1.1 400 Bad Request
  * {
  *   "success": "Fail",
  *   "data": "Error en la petición"
  * }
  *
  * @apiErrorExample Error-Response: 404  Not Found
  * HTTP/1.1 404 Not Found
  * {
  *   "success": "Fail",
  *   "data": "El recurso no existe"
  * }
  */
  app.get('/api/alumnos/:id', sh.get(Alumno));

  /**
  * @api {post} /api/alumno Crear un alumno
  * @apiName Crear un alumno
  * @apiGroup Alumno
  * @apiPermission admin
  * @apiPermission user
  * @apiVersion 1.0.0
  *
  * @apiParam {String} nombre Nombre del alumno.
  * @apiParam {String} email Email del alumno.
  * @apiParam {Number} telefono Telefono del alumno.
  *
  * @apiSuccess {String} success Resultado de la petición.
  * @apiSuccess {Object} data Objeto que contiene los datos del alumno.
  *
  * @apiSuccessExample Success-Response: 201 Created
  * HTTP/1.1 201 Created
  * {
  *   "success": "Ok"
  * }
  *
  * @apiErrorExample Error-Response: 400 Bad Request
  * HTTP/1.1 400 Bad Request
  * {
  *   "success": "Fail",
  *   "data": "Algunos datos no son válidos"
  * }
  */
  app.post('/api/alumnos', sh.create(Alumno));

  /**
  * @api {put} /api/alumno/:id Actualizar un alumno
  * @apiName Actualiza un alumno
  * @apiGroup Alumno
  * @apiPermission admin
  * @apiPermission user
  * @apiVersion 1.0.0
  *
  * @apiParam {Number} id ID del alumno.
  * @apiParam {String} nombre Nombre del alumno.
  * @apiParam {String} email Email del alumno.
  * @apiParam {Number} telefono Telefono del alumno.
  *
  * @apiSuccess {String} success Resultado de la petición.
  *
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 Ok
  * {
  *   "success": "Ok"
  * }
  *
  * @apiErrorExample Error-Response:
  * HTTP/1.1 400 Bad Request
  * {
  *   "success": "Fail",
  *   "data": "Algunos datos no son válidos"
  * }
  *
  * @apiErrorExample Error-Response:
  * HTTP/1.1 404 Not Found
  * {
  *   "success": "Fail",
  *   "data": "El recurso no existe"
  * }
  */
  app.put('/api/alumnos/:id', sh.update(Alumno));

  /**
  * @api {delete} /api/alumno/:id Eliminar un alumno
  * @apiName Elimina un alumno
  * @apiGroup Alumno
  * @apiPermission admin
  * @apiPermission user
  * @apiVersion 1.0.0
  *
  * @apiParam {Number} id ID del alumno.
  *
  * @apiSuccess {String} success Resultado de la petición.
  *
  * @apiSuccessExample Success-Response:
  * HTTP/1.1 200 Ok
  * {
  *   "success": "Ok"
  * }
  *
  * @apiErrorExample Error-Response:
  * HTTP/1.1 400 Bad Request
  * {
  *   "success": "Fail",
  *   "data": "Algunos datos no son válidos"
  * }
  *
  * @apiErrorExample Error-Response:
  * HTTP/1.1 404 Not Found
  * {
  *   "success": "Fail",
  *   "data": "El recurso no existe"
  * }
  */
  app.delete('/api/alumnos/:id', sh.remove(Alumno));
};
