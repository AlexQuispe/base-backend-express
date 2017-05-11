'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('rol_ruta', {
      id_rol_ruta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      access_get: {
        type: Sequelize.BOOLEAN
      },
      access_post: {
        type: Sequelize.BOOLEAN
      },
      access_put: {
        type: Sequelize.BOOLEAN
      },
      access_delete: {
        type: Sequelize.BOOLEAN
      },
      id_rol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rol',
          key: 'id_rol'
        }
      },
      id_ruta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ruta',
          key: 'id_ruta'
        }
      },
      _fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      _fecha_modificacion: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('rol_ruta');
  }
};
