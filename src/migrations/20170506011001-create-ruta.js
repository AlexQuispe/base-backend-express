'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ruta', {
      id_ruta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('ruta');
  }
};
