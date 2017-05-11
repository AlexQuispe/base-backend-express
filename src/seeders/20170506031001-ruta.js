'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ruta', [{
      id_ruta: 1,
      nombre: '/api/alumnos',
      descripcion: 'Ruta para administrar los alumnos',
      access_get: true,
      access_post: true,
      access_put: true,
      access_delete: true,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      id_ruta: 2,
      nombre: '/api/materias',
      descripcion: 'Ruta para administrar las materias',
      access_get: true,
      access_post: true,
      access_put: true,
      access_delete: true,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      id_ruta: 3,
      nombre: '/api/inscripciones',
      descripcion: 'Ruta para administrar las inscripciones',
      access_get: true,
      access_post: true,
      access_put: true,
      access_delete: true,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ruta', null, {});
  }
};
