'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('inscripcion', [{
      //id_inscripcion: 1,
      id_alumno: 1,
      id_materia: 1,
      fecha_inscripcion: new Date('2015-03-25'),
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_inscripcion: 2,
      id_alumno: 1,
      id_materia: 2,
      fecha_inscripcion: new Date('2015-03-26'),
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      //id_inscripcion: 3,
      id_alumno: 2,
      id_materia: 3,
      fecha_inscripcion: new Date('2015-03-27'),
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('inscripcion', null, {});
  }
};
