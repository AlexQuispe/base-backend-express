'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('materia', [{
      id_materia: 1,
      nombre: 'Algoritmos y Programación',
      sigla: 'INF-121',
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      id_materia: 2,
      nombre: 'Assembler',
      sigla: 'INF-153',
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    },{
      id_materia: 3,
      nombre: 'Telemática',
      sigla: 'INF-273',
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('materia', null, {});
  }
};
