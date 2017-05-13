'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rol_ruta', [{
      //id_rol_ruta: 1,
      access_get: true,
      access_post: true,
      access_put: true,
      access_delete: true,
      id_rol: 1,
      id_ruta: 1,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_rol_ruta: 2,
      access_get: true,
      access_post: true,
      access_put: true,
      access_delete: true,
      id_rol: 1,
      id_ruta: 2,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_rol_ruta: 3,
      access_get: true,
      access_post: true,
      access_put: true,
      access_delete: true,
      id_rol: 1,
      id_ruta: 3,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_rol_ruta: 4,
      access_get: true,
      access_post: true,
      access_put: true,
      access_delete: true,
      id_rol: 2,
      id_ruta: 1,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_rol_ruta: 5,
      access_get: true,
      access_post: true,
      access_put: true,
      access_delete: true,
      id_rol: 2,
      id_ruta: 2,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('rol_ruta', null, {});
  }
};
