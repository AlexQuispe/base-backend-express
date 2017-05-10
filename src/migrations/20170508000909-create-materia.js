'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('materia', {
      id_materia: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      sigla: {
        type: Sequelize.STRING
      },
      _fecha_creacion: {
        allowNull: false,
        type: Sequelize.DATE
      },
      _fecha_modificacion: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('materia');
  }
};
