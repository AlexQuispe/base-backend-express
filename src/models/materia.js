'use strict';

module.exports = function(sequelize, DataTypes) {
  var materia = sequelize.define('materia', {
    id_materia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    sigla: {
      type: DataTypes.STRING,
    }
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    freezeTableName: true
  });
  return materia;
};
