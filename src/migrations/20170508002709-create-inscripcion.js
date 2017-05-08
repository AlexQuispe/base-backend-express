'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('inscripcion', {
      id_inscripcion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_inscripcion: {
        type: Sequelize.DATE
      },
      id_alumno: {
        type: Sequelize.INTEGER,
        references: {
            model: 'alumno',
            key: 'id_alumno'
        }
      },
      id_materia: {
        type: Sequelize.INTEGER,
        references: {
            model: 'materia',
            key: 'id_materia'
        }
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
    return queryInterface.dropTable('inscripcion');
  }
};
