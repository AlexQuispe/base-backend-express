'use strict';

module.exports = function(sequelize, DataTypes) {
  var inscripcion = sequelize.define('inscripcion', {
    id_inscripcion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_inscripcion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_alumno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alumno',
        key: 'id_alumno'
      }
    },
    id_materia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'materia',
        key: 'id_materia'
      }
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    freezeTableName: true
  });
  return inscripcion;
};
