'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('alumno', [{
      //id_alumno: 1,
      nombre: 'Juan',
      email: 'juan@gmail.com',
      telefono: 22654665,
      id_usuario: 1,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_alumno: 2,
      nombre: 'rosa',
      email: 'rosa@gmail.com',
      telefono: 22984756,
      id_usuario: 2,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_alumno: 3,
      nombre: 'ana',
      email: 'ana@gmail.com',
      telefono: 78657775,
      id_usuario: 3,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('alumno', null, {});
  }
};
