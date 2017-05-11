'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('rol', [{
      id_rol: 1,
      nombre: 'ADMIN',
      descripcion: 'Rol del administrador',
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      id_rol: 2,
      nombre: 'USER',
      descripcion: 'Rol del alumno',
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('rol', null, {});
  }
};
